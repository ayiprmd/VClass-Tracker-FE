import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  syncVClass as apiSyncVClass,
  getDashboardData as apiGetDashboardData,
  logoutVClass as apiLogoutVClass,
  allowSessionPersist,
  blockSessionPersist,
} from '../services/api';
import { deadlinesData as defaultDeadlines } from '../data dummy/deadlines';
import { coursesData as defaultCourses } from '../data dummy/courses';

const AuthContext = createContext();

const STORAGE_KEYS = [
  'lms_user',
  'lms_deadlines',
  'lms_courses',
  'lms_stats',
  'lms_last_sync',
];

// Helper to adjust dummy years to current year
const adjustDummyYears = (data) => {
  if (!Array.isArray(data)) return data;
  const currentYear = new Date().getFullYear();
  return data.map(item => {
    if (item.deadline) {
      return {
        ...item,
        deadline: item.deadline.replace('2024', currentYear.toString())
      };
    }
    return item;
  });
};

// Normalize API deadlines (snake_case) to camelCase expected by components
const normalizeDeadlines = (data) => {
  if (!Array.isArray(data)) return [];
  return data.map(item => ({
    id: item.id,
    title: item.title,
    course: item.course,
    courseCode: item.course_code || item.courseCode || null,
    courseId: item.course_id || item.courseId || null,
    type: item.type,
    deadline: item.deadline_display || item.deadline,
    deadlineIso: item.deadline_iso || item.deadlineIso,
    timeLeft: item.time_left || item.timeLeft,
    urgency: item.urgency,
    progress: item.progress !== undefined ? item.progress : 0,
    vclassUrl: item.vclass_url || item.vclassUrl || 'https://v-class.gunadarma.ac.id',
  }));
};

// Normalize API courses to camelCase with themes and icons
const normalizeCourses = (data) => {
  if (!Array.isArray(data)) return [];
  const themeColors = ['primary', 'secondary', 'tertiary', 'slate'];
  const icons = ['data_object', 'architecture', 'calculate', 'translate', 'school'];
  return data.map((item, idx) => ({
    id: item.id,
    name: item.name,
    code: item.code || `MKS-${item.id.replace('course-', '')}`,
    instructor: item.instructor || 'Dosen Pengampu',
    activeDeadlines: item.active_deadlines !== undefined ? item.active_deadlines : (item.activeDeadlines || 0),
    progress: item.progress !== undefined ? item.progress : 50,
    url: item.url || 'https://v-class.gunadarma.ac.id',
    lastUpdated: item.last_updated || item.lastUpdated || 'Baru saja',
    themeColor: item.themeColor || themeColors[idx % themeColors.length],
    icon: item.icon || icons[idx % icons.length]
  }));
};

function clearStoredSession() {
  STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [deadlines, setDeadlines] = useState(() => normalizeDeadlines(adjustDummyYears(defaultDeadlines)));
  const [courses, setCourses] = useState(() => normalizeCourses(defaultCourses));
  const [stats, setStats] = useState(null);
  const [isGuest, setIsGuest] = useState(true);
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle' | 'syncing' | 'success' | 'error'
  const [syncError, setSyncError] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // Bumps on every logout so in-flight refresh/login cannot restore the old session.
  const sessionEpochRef = useRef(0);
  const isAuthenticatedRef = useRef(false);

  const logoutLocal = useCallback(() => {
    sessionEpochRef.current += 1;
    isAuthenticatedRef.current = false;
    blockSessionPersist();
    clearStoredSession();

    setUser(null);
    setIsGuest(true);
    setDeadlines(normalizeDeadlines(adjustDummyYears(defaultDeadlines)));
    setCourses(normalizeCourses(defaultCourses));
    setStats(null);
    setSyncStatus('idle');
    setSyncError(null);
    setLastSyncTime(null);
  }, []);

  // Function to refresh dashboard data using stored session cookies
  const refreshDashboardData = useCallback(async () => {
    if (!isAuthenticatedRef.current) {
      return { success: false, error: 'Sesi tidak aktif.' };
    }

    const epoch = sessionEpochRef.current;
    setSyncStatus('syncing');
    setSyncError(null);

    const result = await apiGetDashboardData();

    // Ignore stale responses after logout / newer session change
    if (epoch !== sessionEpochRef.current || !isAuthenticatedRef.current) {
      return { success: false, error: 'Sesi sudah diakhiri.' };
    }

    if (result.success) {
      const { user: userData, deadlines: deadlineData, courses: courseData, stats: statData } = result.data;

      setUser(userData);
      setIsGuest(false);
      setDeadlines(normalizeDeadlines(deadlineData));
      // Jangan fallback ke data demo setelah login — tampilkan hasil sync apa adanya
      setCourses(normalizeCourses(Array.isArray(courseData) ? courseData : []));
      setStats(statData);
      setSyncStatus('success');
      const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      setLastSyncTime(nowStr);
      localStorage.setItem('lms_last_sync', nowStr);

      return { success: true };
    }

    setSyncStatus('error');
    setSyncError(result.error);
    if (
      result.error.includes('kadaluarsa') ||
      result.error.includes('belum aktif') ||
      result.error.includes('Unauthorized') ||
      result.error.includes('401')
    ) {
      logoutLocal();
    }
    return { success: false, error: result.error };
  }, [logoutLocal]);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('lms_user');
      const storedDeadlines = localStorage.getItem('lms_deadlines');
      const storedCourses = localStorage.getItem('lms_courses');
      const storedStats = localStorage.getItem('lms_stats');
      const storedTime = localStorage.getItem('lms_last_sync');

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        isAuthenticatedRef.current = true;
        allowSessionPersist();
        setUser(parsedUser);
        setIsGuest(false);

        if (storedDeadlines) {
          const parsedDeadlines = JSON.parse(storedDeadlines);
          if (Array.isArray(parsedDeadlines)) {
            setDeadlines(normalizeDeadlines(parsedDeadlines));
          }
        }

        if (storedCourses) {
          const parsedCourses = JSON.parse(storedCourses);
          if (Array.isArray(parsedCourses) && parsedCourses.length > 0) {
            setCourses(normalizeCourses(parsedCourses));
          }
        }

        if (storedStats) {
          setStats(JSON.parse(storedStats));
        }

        if (storedTime) {
          setLastSyncTime(storedTime);
        }

        // Hapus auto-refresh di useEffect agar tidak memicu scrape terus-menerus
        const epochAtStart = sessionEpochRef.current;
      }
    } catch (e) {
      console.error('Error loading session from localStorage:', e);
      logoutLocal();
    }
  }, [logoutLocal]);

  // Re-validate session when browser restores page from bfcache / undo / back-forward
  useEffect(() => {
    const revalidateSession = () => {
      const storedUser = localStorage.getItem('lms_user');
      if (!storedUser && isAuthenticatedRef.current) {
        logoutLocal();
      }
    };

    const onPageShow = (event) => {
      if (event.persisted) {
        revalidateSession();
      }
    };

    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('popstate', revalidateSession);
    window.addEventListener('storage', revalidateSession);

    return () => {
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('popstate', revalidateSession);
      window.removeEventListener('storage', revalidateSession);
    };
  }, [logoutLocal]);

  const loginAndSync = async (username, password) => {
    const epoch = sessionEpochRef.current;
    setSyncStatus('syncing');
    setSyncError(null);
    allowSessionPersist();

    const result = await apiSyncVClass(username, password);

    if (epoch !== sessionEpochRef.current) {
      return { success: false, error: 'Sesi sudah diakhiri.' };
    }

    if (result.success) {
      const { user: userData, deadlines: deadlineData, courses: courseData, stats: statData } = result.data;

      isAuthenticatedRef.current = true;
      setUser(userData);
      setIsGuest(false);
      setDeadlines(normalizeDeadlines(deadlineData));
      // Jangan fallback ke data demo setelah login — tampilkan hasil sync apa adanya
      setCourses(normalizeCourses(Array.isArray(courseData) ? courseData : []));
      setStats(statData);
      setSyncStatus('success');
      const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      setLastSyncTime(nowStr);
      localStorage.setItem('lms_last_sync', nowStr);

      return { success: true, message: result.data.message };
    }

    setSyncStatus('error');
    setSyncError(result.error);
    return { success: false, error: result.error };
  };

  const logout = async () => {
    // Clear local session immediately so UI + back/undo cannot restore auth state
    logoutLocal();
    // Best-effort clear of HttpOnly cookies; do not block UI
    try {
      await apiLogoutVClass();
    } catch {
      // ignore network errors — local session already cleared
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        deadlines,
        courses,
        stats,
        isGuest,
        syncStatus,
        syncError,
        lastSyncTime,
        loginAndSync,
        logout,
        refreshDashboardData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
