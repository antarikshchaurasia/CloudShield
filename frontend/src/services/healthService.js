import { apiClient } from './api';

export const getApiBaseUrl = () => {
  const configured = import.meta.env.VITE_API_URL;
  return configured ? configured.replace(/\/+$/, '') : '';
};

async function probeEndpoint(path) {
  const startedAt = performance.now();
  try {
    const response = await apiClient.get(path, { timeout: 4000 });
    const latencyMs = Math.round(performance.now() - startedAt);
    return { ok: true, data: response.data, latencyMs, error: null };
  } catch (err) {
    const latencyMs = Math.round(performance.now() - startedAt);
    const message =
      err?.response?.data?.detail ||
      err?.message ||
      'Unable to reach FastAPI gateway';
    return { ok: false, data: null, latencyMs, error: message };
  }
}

export const fetchBackendHealth = () => probeEndpoint('/api/health');

export const fetchBackendVersion = () => probeEndpoint('/api/version');
