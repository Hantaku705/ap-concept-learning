"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Subscription, ServiceCategory } from '@/types/subscription';
import { useAuth } from './AuthContext';

interface ScanStats {
  scannedEmails: number;
  detectedServices: number;
  newSubscriptions: number;
  updatedSubscriptions: number;
}

interface SubscriptionContextType {
  subscriptions: Subscription[];
  isLoading: boolean;
  isScanning: boolean;
  scanProgress: { current: number; total: number } | null;
  lastScanAt: string | null;
  lastScanStats: ScanStats | null;

  // 操作
  addSubscription: (sub: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSubscription: (id: string, updates: Partial<Subscription>) => void;
  deleteSubscription: (id: string) => void;
  scanEmails: (periodDays?: number) => Promise<void>;

  // 集計
  getTotalMonthlyAmount: () => number;
  getByCategory: () => Record<ServiceCategory, Subscription[]>;
  getUpcomingRenewals: (days: number) => Subscription[];
  getActiveSubscriptions: () => Subscription[];
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const LEGACY_STORAGE_KEY = 'subscription_tracker_data';
const getStorageKey = (email: string) => `subscription_data_${email}`;

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState<{ current: number; total: number } | null>(null);
  const [lastScanAt, setLastScanAt] = useState<string | null>(null);
  const [lastScanStats, setLastScanStats] = useState<ScanStats | null>(null);

  const { tokens, userEmail, isLoading: authLoading } = useAuth();

  // LocalStorageから読み込み（userEmail確定後）
  useEffect(() => {
    // 認証ローディング中は待機
    if (authLoading) return;

    // ユーザー未ログイン時はリセット
    if (!userEmail) {
      setSubscriptions([]);
      setLastScanAt(null);
      setIsLoading(false);
      return;
    }

    const storageKey = getStorageKey(userEmail);

    // 旧キーからのマイグレーション（初回のみ）
    const legacyData = localStorage.getItem(LEGACY_STORAGE_KEY);
    const newData = localStorage.getItem(storageKey);

    if (legacyData && !newData) {
      // 旧データがあり、新キーにデータがない場合は移行
      try {
        const parsed = JSON.parse(legacyData);
        localStorage.setItem(storageKey, legacyData);
        localStorage.removeItem(LEGACY_STORAGE_KEY);
        console.log(`Migrated subscription data to user-specific key: ${storageKey}`);
        setSubscriptions(parsed.subscriptions || []);
        setLastScanAt(parsed.lastScanAt || null);
      } catch (e) {
        console.error('Failed to migrate legacy data', e);
      }
    } else {
      // 新キーからデータ読み込み
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          const { subscriptions: subs, lastScanAt: scanAt } = JSON.parse(stored);
          setSubscriptions(subs || []);
          setLastScanAt(scanAt || null);
        } catch (e) {
          console.error('Failed to parse subscriptions from storage', e);
        }
      }
    }

    setIsLoading(false);
  }, [userEmail, authLoading]);

  // 保存（userEmailがある場合のみ）
  useEffect(() => {
    if (!isLoading && userEmail) {
      const storageKey = getStorageKey(userEmail);
      localStorage.setItem(storageKey, JSON.stringify({ subscriptions, lastScanAt }));
    }
  }, [subscriptions, lastScanAt, isLoading, userEmail]);

  const addSubscription = useCallback((sub: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newSub: Subscription = {
      ...sub,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setSubscriptions(prev => [...prev, newSub]);
  }, []);

  const updateSubscription = useCallback((id: string, updates: Partial<Subscription>) => {
    setSubscriptions(prev => prev.map(sub =>
      sub.id === id
        ? { ...sub, ...updates, updatedAt: new Date().toISOString() }
        : sub
    ));
  }, []);

  const deleteSubscription = useCallback((id: string) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
  }, []);

  const scanEmails = useCallback(async (periodDays?: number) => {
    if (!tokens?.accessToken) return;

    setIsScanning(true);
    setScanProgress({ current: 0, total: 0 });

    try {
      const response = await fetch('/api/gmail/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken: tokens.accessToken,
          existingSubscriptions: subscriptions,
          periodDays,
        }),
      });

      if (!response.ok) throw new Error('Scan failed');

      const data = await response.json();
      setSubscriptions(data.subscriptions);
      setLastScanAt(new Date().toISOString());
      setLastScanStats(data.stats);
    } catch (error) {
      console.error('Scan error:', error);
    } finally {
      setIsScanning(false);
      setScanProgress(null);
    }
  }, [tokens, subscriptions]);

  const getTotalMonthlyAmount = useCallback((): number => {
    return subscriptions
      .filter(s => s.status === 'active')
      .reduce((sum, s) => {
        if (s.billingCycle === 'yearly') return sum + s.amount / 12;
        if (s.billingCycle === 'quarterly') return sum + s.amount / 3;
        if (s.billingCycle === 'weekly') return sum + s.amount * 4;
        return sum + s.amount;
      }, 0);
  }, [subscriptions]);

  const getByCategory = useCallback((): Record<ServiceCategory, Subscription[]> => {
    const result = {} as Record<ServiceCategory, Subscription[]>;
    subscriptions
      .filter(s => s.status === 'active')
      .forEach(sub => {
        if (!result[sub.category]) result[sub.category] = [];
        result[sub.category].push(sub);
      });
    return result;
  }, [subscriptions]);

  const getUpcomingRenewals = useCallback((days: number): Subscription[] => {
    const now = new Date();
    const future = new Date();
    future.setDate(future.getDate() + days);

    return subscriptions
      .filter(s => s.status === 'active')
      .filter(s => {
        const nextDate = new Date(s.nextBillingDate);
        return nextDate >= now && nextDate <= future;
      })
      .sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime());
  }, [subscriptions]);

  const getActiveSubscriptions = useCallback((): Subscription[] => {
    return subscriptions.filter(s => s.status === 'active');
  }, [subscriptions]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        isLoading,
        isScanning,
        scanProgress,
        lastScanAt,
        lastScanStats,
        addSubscription,
        updateSubscription,
        deleteSubscription,
        scanEmails,
        getTotalMonthlyAmount,
        getByCategory,
        getUpcomingRenewals,
        getActiveSubscriptions,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptions() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscriptions must be used within a SubscriptionProvider');
  }
  return context;
}
