from jose import jwt
from backend.app.core.config import settings
from backend.app.core.security import get_password_hash, verify_password, create_access_token


def test_password_hashing_and_jwt_issuance():
    hashed = get_password_hash("Admin@123")
    assert hashed != "Admin@123"
    assert verify_password("Admin@123", hashed) is True
    assert verify_password("WrongPass", hashed) is False

    token = create_access_token({"sub": "admin@test.local", "role": "admin"})
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    assert payload["sub"] == "admin@test.local"
    assert payload["role"] == "admin"
    assert "exp" in payload


def test_health_and_unauthenticated_blocking(client):
    res_health = client.get("/api/health")
    assert res_health.status_code == 200
    assert res_health.json()["status"] == "healthy"

    res_ver = client.get("/api/version")
    assert res_ver.status_code == 200

    assert client.get("/api/auth/me").status_code == 401
    assert client.get("/api/resources").status_code == 401


def test_login_flow(client):
    res = client.post("/api/auth/login", json={
        "email": "admin@test.local",
        "password": "Admin@123"
    })
    assert res.status_code == 200
    data = res.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["email"] == "admin@test.local"
    assert "password_hash" not in data["user"]

    res_bad = client.post("/api/auth/login", json={
        "email": "admin@test.local",
        "password": "WrongPassword"
    })
    assert res_bad.status_code == 401


def test_read_current_user_me(client, operator_headers):
    res = client.get("/api/auth/me", headers=operator_headers)
    assert res.status_code == 200
    assert res.json()["email"] == "operator@test.local"
    assert res.json()["role"] == "operator"


def test_registration_flow(client):
    res = client.post("/api/auth/register", json={
        "email": "freshuser@test.local",
        "password": "SecretPassword123",
        "role": "operator"
    })
    assert res.status_code == 200
    data = res.json()
    assert data["email"] == "freshuser@test.local"
    assert data["role"] == "operator"

    res_dup = client.post("/api/auth/register", json={
        "email": "freshuser@test.local",
        "password": "SecretPassword123",
        "role": "operator"
    })
    assert res_dup.status_code == 400
    assert "already registered" in res_dup.json()["detail"]

    res_login = client.post("/api/auth/login", json={
        "email": "freshuser@test.local",
        "password": "SecretPassword123"
    })
    assert res_login.status_code == 200
    assert "access_token" in res_login.json()


def test_rbac_admin_vs_operator_on_resources(client, admin_headers, operator_headers):
    res_list = client.get("/api/resources", headers=operator_headers)
    assert res_list.status_code == 200
    assert len(res_list.json()) >= 2

    # Operator cannot create resources (403 Forbidden)
    res_op_create = client.post("/api/resources", json={
        "name": "unauthorized-svc",
        "resource_type": "application"
    }, headers=operator_headers)
    assert res_op_create.status_code == 403
    assert "Administrative privileges required" in res_op_create.json()["detail"]

    # Admin can create resources
    res_admin_create = client.post("/api/resources", json={
        "name": "prod-gateway",
        "resource_type": "application",
        "endpoint_or_path": "http://localhost:8080",
        "status": "healthy"
    }, headers=admin_headers)
    assert res_admin_create.status_code == 200
    assert res_admin_create.json()["name"] == "prod-gateway"
