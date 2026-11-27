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
