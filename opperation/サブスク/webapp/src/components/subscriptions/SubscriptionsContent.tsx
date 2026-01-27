"use client";

import { useState } from 'react';
import { useSubscriptions } from '@/contexts/SubscriptionContext';
import { SubscriptionTable } from './SubscriptionTable';
import { SubscriptionForm } from './SubscriptionForm';
import { Subscription, ServiceCategory, categoryLabels } from '@/types/subscription';

export function SubscriptionsContent() {
  const { subscriptions, isLoading, deleteSubscription, updateSubscription, addSubscription } = useSubscriptions();
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'cancelled'>('all');
  const [categoryFilter, setCategoryFilter] = useState<ServiceCategory | 'all'>('all');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const filteredSubscriptions = subscriptions.filter((sub) => {
    if (filter === 'active' && sub.status !== 'active') return false;
    if (filter === 'cancelled' && sub.status !== 'cancelled') return false;
    if (categoryFilter !== 'all' && sub.category !== categoryFilter) return false;
    return true;
  });

  const categories = [...new Set(subscriptions.map((s) => s.category))];

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
  };

  const handleDelete = (id: string) => {
    const sub = subscriptions.find(s => s.id === id);
    if (sub && confirm(`${sub.serviceName}を削除しますか？`)) {
      deleteSubscription(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* フィルターとアクション */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'cancelled')}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">すべて</option>
            <option value="active">契約中</option>
            <option value="cancelled">解約済み</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as ServiceCategory | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">全カテゴリ</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {categoryLabels[cat]}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          + 手動で追加
        </button>
      </div>

      {/* 追加フォーム */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">サブスクリプションを追加</h3>
          <SubscriptionForm
            onSubmit={(data) => {
              addSubscription(data);
              setShowAddForm(false);
            }}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {/* 編集フォームモーダル */}
      {editingSubscription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-lg font-semibold mb-4">{editingSubscription.serviceName} を編集</h3>
            <SubscriptionForm
              subscription={editingSubscription}
              onSubmit={(data) => {
                updateSubscription(editingSubscription.id, data);
                setEditingSubscription(null);
              }}
              onCancel={() => setEditingSubscription(null)}
            />
          </div>
        </div>
      )}

      {/* サブスク一覧テーブル */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <SubscriptionTable
          subscriptions={filteredSubscriptions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
