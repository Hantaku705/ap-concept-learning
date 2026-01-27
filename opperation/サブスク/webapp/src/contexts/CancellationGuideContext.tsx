"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { GeneratedCancellationGuide } from '@/app/api/cancellation-guide/route';
import { useAuth } from './AuthContext';

interface CancellationGuideContextType {
  cachedGuides: Record<string, GeneratedCancellationGuide>;
  loadingServices: Set<string>;
  fetchGuide: (serviceName: string) => Promise<GeneratedCancellationGuide | null>;
  getGuide: (serviceName: string) => GeneratedCancellationGuide | undefined;
  isLoading: (serviceName: string) => boolean;
}

const CancellationGuideContext = createContext<CancellationGuideContextType | null>(null);

const LEGACY_STORAGE_KEY = 'cached_cancellation_guides';
const getStorageKey = (email: string) => `cancellation_guides_${email}`;

export function CancellationGuideProvider({ children }: { children: ReactNode }) {
  const [cachedGuides, setCachedGuides] = useState<Record<string, GeneratedCancellationGuide>>({});
  const [loadingServices, setLoadingServices] = useState<Set<string>>(new Set());
  const [isInitialized, setIsInitialized] = useState(false);

  const { userEmail, isLoading: authLoading } = useAuth();

  // LocalStorageから復元（userEmail確定後）
  useEffect(() => {
    // 認証ローディング中は待機
    if (authLoading) return;

    // ユーザー未ログイン時はリセット
    if (!userEmail) {
      setCachedGuides({});
      setIsInitialized(true);
      return;
    }

    const storageKey = getStorageKey(userEmail);

    // 旧キーからのマイグレーション（初回のみ）
    const legacyData = localStorage.getItem(LEGACY_STORAGE_KEY);
    const newData = localStorage.getItem(storageKey);

    if (legacyData && !newData) {
      try {
        localStorage.setItem(storageKey, legacyData);
        localStorage.removeItem(LEGACY_STORAGE_KEY);
        console.log(`Migrated cancellation guides to user-specific key: ${storageKey}`);
        setCachedGuides(JSON.parse(legacyData));
      } catch (error) {
        console.error('Failed to migrate legacy guides:', error);
      }
    } else {
      // 新キーからデータ読み込み
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          setCachedGuides(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load cached guides:', error);
      }
    }

    setIsInitialized(true);
  }, [userEmail, authLoading]);

  // LocalStorageに保存（userEmailがある場合のみ）
  useEffect(() => {
    if (isInitialized && userEmail && Object.keys(cachedGuides).length > 0) {
      try {
        const storageKey = getStorageKey(userEmail);
        localStorage.setItem(storageKey, JSON.stringify(cachedGuides));
      } catch (error) {
        console.error('Failed to save cached guides:', error);
      }
    }
  }, [cachedGuides, userEmail, isInitialized]);

  const fetchGuide = useCallback(async (serviceName: string): Promise<GeneratedCancellationGuide | null> => {
    // 既にキャッシュにある場合はそれを返す
    if (cachedGuides[serviceName]) {
      return cachedGuides[serviceName];
    }

    // ローディング中の場合はnull
    if (loadingServices.has(serviceName)) {
      return null;
    }

    // ローディング開始
    setLoadingServices(prev => new Set(prev).add(serviceName));

    try {
      const response = await fetch('/api/cancellation-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceName }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '取得に失敗しました');
      }

      const { guide } = await response.json();

      // キャッシュに保存
      setCachedGuides(prev => ({
        ...prev,
        [serviceName]: guide,
      }));

      return guide;
    } catch (error) {
      console.error('Failed to fetch guide:', error);
      throw error;
    } finally {
      setLoadingServices(prev => {
        const next = new Set(prev);
        next.delete(serviceName);
        return next;
      });
    }
  }, [cachedGuides, loadingServices]);

  const getGuide = useCallback((serviceName: string): GeneratedCancellationGuide | undefined => {
    return cachedGuides[serviceName];
  }, [cachedGuides]);

  const isLoading = useCallback((serviceName: string): boolean => {
    return loadingServices.has(serviceName);
  }, [loadingServices]);

  return (
    <CancellationGuideContext.Provider
      value={{
        cachedGuides,
        loadingServices,
        fetchGuide,
        getGuide,
        isLoading,
      }}
    >
      {children}
    </CancellationGuideContext.Provider>
  );
}

export function useCancellationGuide() {
  const context = useContext(CancellationGuideContext);
  if (!context) {
    throw new Error('useCancellationGuide must be used within CancellationGuideProvider');
  }
  return context;
}
