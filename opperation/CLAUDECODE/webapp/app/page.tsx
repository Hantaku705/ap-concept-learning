'use client';

import { useState } from 'react';
import { useProgress } from './hooks/useProgress';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MissionBanner } from './components/sections/MissionBanner';
import { KeyTermsTab } from './components/tabs/KeyTermsTab';
import { GettingStartedTab } from './components/tabs/GettingStartedTab';
import { StarterKitTab } from './components/tabs/StarterKitTab';
import { ExploreTab } from './components/tabs/ExploreTab';
import { PracticeTab } from './components/tabs/PracticeTab';
import { CustomizeTab } from './components/tabs/CustomizeTab';
import { ReferenceTab } from './components/tabs/ReferenceTab';
import { levelGoals, levels, type LevelType } from './data/onboarding-data';

function getDefaultTab(level: LevelType): string {
  const l = levels.find((lv) => lv.id === level);
  return l?.tabs[0] ?? 'mission-beginner';
}

export default function Home() {
  const [selectedLevel, setSelectedLevel] = useState<LevelType>('beginner');
  const [activeTab, setActiveTab] = useState(getDefaultTab('beginner'));
  const { progress: checkedItems, updateProgress } = useProgress();

  const handleLevelChange = (level: LevelType) => {
    setSelectedLevel(level);
    setActiveTab(getDefaultTab(level));
  };

  const handleToggleCheck = (level: LevelType, idx: number) => {
    const key = `${level}-${idx}`;
    updateProgress(key, !checkedItems[key]);
  };

  const levelComplete = Object.fromEntries(
    levelGoals.map((g) => [
      g.level,
      g.missions.every((_, i) => checkedItems[`${g.level}-${i}`]),
    ]),
  ) as Record<LevelType, boolean>;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header
        selectedLevel={selectedLevel}
        onLevelChange={handleLevelChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        levelComplete={levelComplete}
      />

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Mission tabs (all levels) */}
        {activeTab.startsWith('mission-') && (
          <MissionBanner
            selectedLevel={selectedLevel}
            checkedItems={checkedItems}
            onToggleCheck={handleToggleCheck}
            onTabChange={setActiveTab}
          />
        )}

        {/* Lv.1: Key Terms / Getting Started / Starter Kit */}
        {activeTab === 'key-terms' && <KeyTermsTab />}
        {activeTab === 'getting-started' && <GettingStartedTab />}
        {activeTab === 'starter-kit' && <StarterKitTab />}

        {/* Lv.2: Features / Examples / Architecture / Compare / Skills */}
        {activeTab === 'features' && <ExploreTab selectedLevel={selectedLevel} defaultSection="features" />}
        {activeTab === 'architecture' && <ExploreTab selectedLevel={selectedLevel} defaultSection="architecture" />}
        {activeTab === 'examples' && <PracticeTab selectedLevel={selectedLevel} showSection="examples" />}
        {activeTab === 'compare' && <CustomizeTab selectedLevel={selectedLevel} showSection="compare" />}
        {activeTab === 'skills' && <CustomizeTab selectedLevel={selectedLevel} showSection="skills" />}

        {/* Lv.3: Build / Tips */}
        {activeTab === 'build' && <PracticeTab selectedLevel={selectedLevel} showSection="build" />}
        {activeTab === 'tips' && <CustomizeTab selectedLevel={selectedLevel} showSection="tips" />}
      </main>

      <Footer />
    </div>
  );
}
