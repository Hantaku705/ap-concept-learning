"use client";

import { useSubscriptions } from '@/contexts/SubscriptionContext';
import { KPICards } from './KPICards';
import { CategoryPieChart } from './CategoryPieChart';
import { UpcomingRenewals } from './UpcomingRenewals';

export function DashboardContent() {
  const { subscriptions, isLoading } = useSubscriptions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">まだサブスクリプションが登録されていません</p>
        <p className="text-gray-400 mt-2">「スキャン」タブからGmailをスキャンするか、手動で追加してください</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <KPICards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryPieChart />
        <UpcomingRenewals />
      </div>
    </div>
  );
}
