import axios from "axios";
import { API_BASE_URL } from "../api/authClient";

/**
 * Hits the backend health-check endpoint to wake up Render and verify the server is online.
 * Checks both `/api/v1/health` and root `/health` so it works seamlessly with all deployments.
 */
export async function pingBackendHealth() {
  const normalizedBase = API_BASE_URL.replace(/\/+$/, "");
  const rootOrigin = normalizedBase.replace(/\/api\/v1$/i, "");

  const endpoints = [
    `${rootOrigin}/health`,
    `${normalizedBase}/health`,
  ];

  // If running locally and local backend is also up, include localhost health check
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1") &&
    !rootOrigin.includes("localhost")
  ) {
    endpoints.push("http://localhost:8000/health");
  }

  for (const url of endpoints) {
    try {
      const response = await axios.get(url, {
        timeout: 15000,
        headers: { Accept: "application/json" },
        params: { _t: Date.now() },
      });
      if (response.status >= 200 && response.status < 300) {
        return true;
      }
    } catch {
      // Try next endpoint
    }
  }

  return false;
}

/**
 * Repeatedly pings the Render backend health endpoint until the server starts and responds.
 */
export function waitForBackendHealth({ onAttempt, intervalMs = 2000 } = {}) {
  let cancelled = false;
  let timeoutId = null;

  const promise = new Promise((resolve) => {
    let attempt = 0;

    const check = async () => {
      if (cancelled) return;
      attempt += 1;
      onAttempt?.(attempt);

      const isHealthy = await pingBackendHealth();
      if (cancelled) return;

      if (isHealthy) {
        resolve(true);
      } else {
        timeoutId = setTimeout(check, intervalMs);
      }
    };

    check();
  });

  const cancel = () => {
    cancelled = true;
    if (timeoutId) clearTimeout(timeoutId);
  };

  return { promise, cancel };
}
