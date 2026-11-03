import { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS, DEMO_PASSWORD } from '../data/seedData';
import { STORAGE_KEYS, loadFromStorage, saveToStorage, removeFromStorage } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    return loadFromStorage(STORAGE_KEYS.USERS, INITIAL_USERS);
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return loadFromStorage(STORAGE_KEYS.CURRENT_USER, null);
  });

  // Ensure users are always initialized in storage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.USERS, users);
  }, [users]);

  // Sync current user with storage
  useEffect(() => {
    if (currentUser) {
      saveToStorage(STORAGE_KEYS.CURRENT_USER, currentUser);
    } else {
      removeFromStorage(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail) {
      return { success: false, message: 'Please enter your email address.' };
    }
    if (!cleanPassword) {
      return { success: false, message: 'Please enter your password.' };
    }

    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!found) {
      return { success: false, message: 'Account not found. Please check your email or select a demo account.' };
    }

    if (cleanPassword !== DEMO_PASSWORD) {
      return { success: false, message: 'Invalid password. Hint: Demo password is "demo123".' };
    }

    setCurrentUser(found);
    return { success: true, user: found };
  };

  const quickLogin = (userEmail) => {
    const found = users.find((u) => u.email.toLowerCase() === userEmail.toLowerCase());
    if (found) {
      setCurrentUser(found);
      return { success: true, user: found };
    }
    return { success: false, message: 'Demo account not found.' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const isAdmin = currentUser?.role === 'admin';
  const isStudent = currentUser?.role === 'student';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        students: users.filter((u) => u.role === 'student'),
        admins: users.filter((u) => u.role === 'admin'),
        isAdmin,
        isStudent,
        login,
        quickLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
