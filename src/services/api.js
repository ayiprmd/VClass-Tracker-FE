const API_BASE_URL = "https://vclass-tracker-be-production.up.railway.app/api";

/** When false, API responses must not re-hydrate localStorage after logout. */
let sessionPersistAllowed = true;

export function allowSessionPersist() {
  sessionPersistAllowed = true;
}

export function blockSessionPersist() {
  sessionPersistAllowed = false;
}

function persistSessionData(data) {
  if (!sessionPersistAllowed || !data) return;
  if (data.user) localStorage.setItem('lms_user', JSON.stringify(data.user));
  if (data.deadlines) localStorage.setItem('lms_deadlines', JSON.stringify(data.deadlines));
  if (data.courses) localStorage.setItem('lms_courses', JSON.stringify(data.courses));
  if (data.stats) localStorage.setItem('lms_stats', JSON.stringify(data.stats));
}

/**
 * Sends student credentials to backend for stateless VClass scraping.
 * @param {string} username - NPM
 * @param {string} password - VClass password
 */
export async function syncVClass(username, password) {
  try {
    allowSessionPersist();
    const response = await fetch(`${API_BASE_URL}/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Gagal melakukan sinkronisasi dengan VClass.');
    }

    persistSessionData(data);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Fetches dashboard data using browser session cookies.
 */
export async function getDashboardData() {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard-data`, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Gagal mengambil data dari VClass.');
    }

    persistSessionData(data);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Log out of VClass by clearing browser cookies and session.
 */
export async function logoutVClass() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Checks backend health status.
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}


/**
 * Fetches course contents and topics from VClass.
 * @param {string} courseId 
 */
export async function getCourseContents(courseId) {
  try {
    const response = await fetch(`${API_BASE_URL}/course/${courseId}/contents`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Gagal mengambil konten mata kuliah.");
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

