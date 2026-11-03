/**
 * Safe localStorage wrapper with error handling and fallback
 */

export const STORAGE_KEYS = {
  CURRENT_USER: 'joineazy_current_user',
  ASSIGNMENTS: 'joineazy_assignments',
  USERS: 'joineazy_users',
  THEME: 'joineazy_theme',
};

export const loadFromStorage = (key, fallbackValue) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallbackValue;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallbackValue;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
    return false;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`Error removing ${key} from localStorage:`, err);
  }
};
