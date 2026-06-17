import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types/auth';
import { useToast } from './ToastContext';
import {
  getStoredUsers,
  saveStoredUsers,
  hashPassword,
  isValidEmail,
  isValidPassword,
  toPublicUser,
} from '../lib/auth';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  register: (data: RegisterData) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: Pick<User, 'firstName' | 'lastName'>) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const SESSION_KEY = 'shopix-session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const persistSession = useCallback((nextUser: User | null) => {
    if (nextUser) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
    setUser(nextUser);
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    const normalized = email.trim().toLowerCase();
    const account = getStoredUsers().find(u => u.email === normalized);

    if (!account || account.passwordHash !== hashPassword(password)) {
      toast.error('Email or password is incorrect', 3500);
      return false;
    }

    const sessionUser = toPublicUser(account);
    persistSession(sessionUser);
    toast.success(`Signed in as ${sessionUser.firstName}`, 3000);
    return true;
  }, [persistSession, toast]);

  const register = useCallback((data: RegisterData): { success: boolean; error?: string } => {
    const firstName = data.firstName.trim();
    const lastName = data.lastName.trim();
    const email = data.email.trim().toLowerCase();

    if (!firstName || !lastName) {
      return { success: false, error: 'Enter your first and last name' };
    }
    if (!isValidEmail(email)) {
      return { success: false, error: 'Enter a valid email address' };
    }
    if (!isValidPassword(data.password)) {
      return { success: false, error: 'Password must be at least 8 characters' };
    }

    const users = getStoredUsers();
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'An account with this email already exists' };
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      firstName,
      lastName,
      passwordHash: hashPassword(data.password),
      createdAt: new Date().toISOString(),
    };

    saveStoredUsers([...users, newUser]);
    const sessionUser = toPublicUser(newUser);
    persistSession(sessionUser);
    toast.success('Account created', 3000);
    return { success: true };
  }, [persistSession, toast]);

  const logout = useCallback(() => {
    persistSession(null);
    toast.info('Signed out');
  }, [persistSession, toast]);

  const updateProfile = useCallback((data: Pick<User, 'firstName' | 'lastName'>): boolean => {
    if (!user) return false;

    const firstName = data.firstName.trim();
    const lastName = data.lastName.trim();
    if (!firstName || !lastName) return false;

    const users = getStoredUsers().map(u =>
      u.id === user.id ? { ...u, firstName, lastName } : u
    );
    saveStoredUsers(users);

    const updated = { ...user, firstName, lastName };
    persistSession(updated);
    toast.success('Profile updated', 3000);
    return true;
  }, [user, persistSession, toast]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
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
