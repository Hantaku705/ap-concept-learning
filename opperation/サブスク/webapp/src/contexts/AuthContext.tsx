"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AuthState, AuthTokens } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: () => void;
  logout: () => void;
  setTokens: (tokens: AuthTokens, email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'subscription_tracker_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    tokens: null,
    userEmail: null,
    error: null,
  });

  // 初期化時にLocalStorageから読み込み
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { tokens, userEmail } = JSON.parse(stored);
        if (tokens && tokens.expiresAt > Date.now()) {
          setState({
            isAuthenticated: true,
            isLoading: false,
            tokens,
            userEmail,
            error: null,
          });
          return;
        }
      } catch (e) {
        console.error('Failed to parse auth from storage', e);
      }
    }
    setState(prev => ({ ...prev, isLoading: false }));
  }, []);

  const login = useCallback(() => {
    window.location.href = '/api/auth/login';
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      isAuthenticated: false,
      isLoading: false,
      tokens: null,
      userEmail: null,
      error: null,
    });
  }, []);

  const setTokens = useCallback((tokens: AuthTokens, email: string) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ tokens, userEmail: email }));
    setState({
      isAuthenticated: true,
      isLoading: false,
      tokens,
      userEmail: email,
      error: null,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, setTokens }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
