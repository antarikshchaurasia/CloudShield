const DEFAULT_TIMEOUT_MS = 4000;

export const getApiBaseUrl = () => {
  const configured = import.meta.env.VITE_API_URL;
  if (!configured) {
    return '';
  }
  return configured.replace(/\/+$/, '');
};

async function fetchJsonWithTimeout(path, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = performance.now();

  try {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    const latencyMs = Math.round(performance.now() - startedAt);
    if (!response.ok) {
      return {
        ok: false,
        data: null,
        latencyMs,
        error: `HTTP ${response.status} ${response.statusText}`,
      };
    }
    const data = await response.json();
    return { ok: true, data, latencyMs, error: null };
  } catch (err) {
    const latencyMs = Math.round(performance.now() - startedAt);
    const message =
      err?.name === 'AbortError'
        ? 'Request timed out waiting for FastAPI gateway'
        : err?.message || 'Unable to reach FastAPI gateway';
    return { ok: false, data: null, latencyMs, error: message };
  } finally {
    clearTimeout(timer);
  }
}

export const fetchBackendHealth = () => fetchJsonWithTimeout('/api/health');

export const fetchBackendVersion = () => fetchJsonWithTimeout('/api/version');
