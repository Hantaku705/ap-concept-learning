"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { TabNavigation } from '@/components/layout/TabNavigation';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { SubscriptionsContent } from '@/components/subscriptions/SubscriptionsContent';
import { ScannerContent } from '@/components/scanner/ScannerContent';
import { AiAssistantContent } from '@/components/ai/AiAssistantContent';
import { SettingsContent } from '@/components/settings/SettingsContent';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && <DashboardContent />}
        {activeTab === 'subscriptions' && <SubscriptionsContent />}
        {activeTab === 'scanner' && <ScannerContent />}
        {activeTab === 'ai' && <AiAssistantContent />}
        {activeTab === 'settings' && <SettingsContent />}
      </main>
    </div>
  );
}
