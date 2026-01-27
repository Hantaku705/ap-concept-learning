"use client";

import { useState } from 'react';
import { Subscription, ServiceCategory, categoryLabels, BillingCycle } from '@/types/subscription';

interface SubscriptionFormProps {
  subscription?: Subscription;
  onSubmit: (data: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function SubscriptionForm({ subscription, onSubmit, onCancel }: SubscriptionFormProps) {
  const [serviceName, setServiceName] = useState(subscription?.serviceName || '');
  const [category, setCategory] = useState<ServiceCategory>(subscription?.category || 'other');
  const [amount, setAmount] = useState(subscription?.amount?.toString() || '');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(subscription?.billingCycle || 'monthly');
  const [nextBillingDate, setNextBillingDate] = useState(
    subscription?.nextBillingDate || new Date().toISOString().split('T')[0]
  );
  const [cancellationUrl, setCancellationUrl] = useState(subscription?.cancellationUrl || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceName || !amount) {
      alert('サービス名と金額は必須です');
      return;
    }

    onSubmit({
      serviceName,
      category,
      amount: parseInt(amount, 10),
      currency: 'JPY',
      billingCycle,
      nextBillingDate,
      startDate: subscription?.startDate || new Date().toISOString().split('T')[0],
      status: 'active',
      source: 'manual',
      cancellationUrl: cancellationUrl || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            サービス名 *
          </label>
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Netflix"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            カテゴリ
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ServiceCategory)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            金額（円） *
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            請求サイクル
          </label>
          <select
            value={billingCycle}
            onChange={(e) => setBillingCycle(e.target.value as BillingCycle)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="monthly">月額</option>
            <option value="yearly">年額</option>
            <option value="quarterly">四半期</option>
            <option value="weekly">週額</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            次回請求日
          </label>
          <input
            type="date"
            value={nextBillingDate}
            onChange={(e) => setNextBillingDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            解約ページURL
          </label>
          <input
            type="url"
            value={cancellationUrl}
            onChange={(e) => setCancellationUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          保存
        </button>
      </div>
    </form>
  );
}
