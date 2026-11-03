import { useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    return loadFromStorage(key, initialValue);
  });

  useEffect(() => {
    saveToStorage(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
