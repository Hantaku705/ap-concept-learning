"use client";

import { useState } from "react";
import {
  strategyMeta,
  targets as initialTargets,
  attackStrategy as initialAttackStrategy,
  messaging as initialMessaging,
  messageHierarchy as initialMessageHierarchy,
  tactics as initialTactics,
  phases as initialPhases,
  tkoData,
  spReasons,
  tlRejectReasons,
  fqCalculation,
  kpis,
  timeline,
} from "@/data/strategy-data";
import { useEdit } from "@/contexts/EditContext";
import { SaveButton } from "@/components/edit";

type Targets = typeof initialTargets;
type Messaging = typeof initialMessaging;
type Tactics = typeof initialTactics;
type Phases = typeof initialPhases;

export default function StrategyContent() {
  const { isEditMode, setDirty } = useEdit();

  // ローカル編集状態
  const [targets, setTargets] = useState<Targets>(initialTargets);
  const [attackStrategy, setAttackStrategy] = useState(initialAttackStrategy);
  const [messaging, setMessaging] = useState<Messaging>(initialMessaging);
  const [messageHierarchy, setMessageHierarchy] = useState(initialMessageHierarchy);
  const [tactics, setTactics] = useState<Tactics>(initialTactics);
  const [phases, setPhases] = useState<Phases>(initialPhases);

  // 保存用データ
  const getSaveData = () => ({
    strategyMeta,
    targets,
    attackStrategy,
    messaging,
    messageHierarchy,
    tactics,
    phases,
    tkoData,
    spReasons,
    tlRejectReasons,
    fqCalculation,
    kpis,
    timeline,
  });

  // ターゲット更新
  const updateTarget = (index: number, field: keyof Targets[number], value: string) => {
    setTargets((prev) => prev.map((t, i) => (i === index ? { ...t, [field]: value } : t)));
    setDirty(true);
  };

  // メッセージング更新
  const updateMessaging = <K extends keyof Messaging>(key: K, value: Messaging[K]) => {
    setMessaging((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  return (
    <div className="space-y-8">
      {/* Who Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center bg-pink-100 text-pink-600 rounded-full text-sm font-bold">W</span>
          Who（誰に）
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {targets.map((target, index) => (
            <div
              key={target.id}
              className={`p-4 rounded-lg border-2 ${
                target.priority === "primary"
                  ? "border-pink-300 bg-pink-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                  target.priority === "primary"
                    ? "bg-pink-200 text-pink-700"
                    : "bg-gray-200 text-gray-700"
                }`}>
                  {target.priority === "primary" ? "①メイン" : "②サブ"}
                </span>
                {isEditMode ? (
                  <input
                    type="text"
                    value={target.name}
                    onChange={(e) => updateTarget(index, "name", e.target.value)}
                    className="font-bold text-gray-900 bg-white rounded px-2 py-0.5 border border-gray-200 flex-1"
                  />
                ) : (
                  <span className="font-bold text-gray-900">{target.name}</span>
                )}
              </div>
              {isEditMode ? (
                <input
                  type="text"
                  value={target.attribute}
                  onChange={(e) => updateTarget(index, "attribute", e.target.value)}
                  className="text-sm text-gray-600 mb-2 w-full bg-white rounded px-2 py-1 border border-gray-200"
                />
              ) : (
                <p className="text-sm text-gray-600 mb-2">{target.attribute}</p>
              )}
              <div className="bg-white rounded p-2 mb-2">
                <p className="text-sm text-gray-500">インサイト</p>
                {isEditMode ? (
                  <input
                    type="text"
                    value={target.insight}
                    onChange={(e) => updateTarget(index, "insight", e.target.value)}
                    className="text-sm font-medium text-gray-900 w-full bg-gray-50 rounded px-2 py-1 border border-gray-200"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-900">「{target.insight}」</p>
                )}
              </div>
              <div className="bg-white rounded p-2">
                <p className="text-sm text-gray-500">購入動機</p>
                {isEditMode ? (
                  <input
                    type="text"
                    value={target.motivation}
                    onChange={(e) => updateTarget(index, "motivation", e.target.value)}
                    className="text-sm font-medium text-gray-900 w-full bg-gray-50 rounded px-2 py-1 border border-gray-200"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-900">{target.motivation}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">攻め方</p>
          <ol className="space-y-1">
            {attackStrategy.map((strategy, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-pink-500 font-bold">{index + 1}.</span>
                {isEditMode ? (
                  <input
                    type="text"
                    value={strategy}
                    onChange={(e) => {
                      const newStrategy = [...attackStrategy];
                      newStrategy[index] = e.target.value;
                      setAttackStrategy(newStrategy);
                      setDirty(true);
                    }}
                    className="flex-1 bg-white rounded px-2 py-0.5 border border-gray-200"
                  />
                ) : (
                  strategy
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* What Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center bg-amber-100 text-amber-600 rounded-full text-sm font-bold">W</span>
          What（何を）
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-pink-50 rounded-lg p-4">
            <p className="text-sm text-pink-600 font-medium mb-1">メインコンセプト</p>
            {isEditMode ? (
              <input
                type="text"
                value={messaging.mainConcept}
                onChange={(e) => updateMessaging("mainConcept", e.target.value)}
                className="text-2xl font-bold text-gray-900 w-full bg-white rounded px-2 py-1 border border-pink-200"
              />
            ) : (
              <p className="text-2xl font-bold text-gray-900">{messaging.mainConcept}</p>
            )}
          </div>
          <div className="bg-rose-50 rounded-lg p-4">
            <p className="text-sm text-rose-600 font-medium mb-1">感情喚起</p>
            {isEditMode ? (
              <input
                type="text"
                value={messaging.emotionCopy}
                onChange={(e) => updateMessaging("emotionCopy", e.target.value)}
                className="text-2xl font-bold text-gray-900 w-full bg-white rounded px-2 py-1 border border-rose-200"
              />
            ) : (
              <p className="text-2xl font-bold text-gray-900">{messaging.emotionCopy}</p>
            )}
          </div>
          <div className="bg-emerald-50 rounded-lg p-4">
            <p className="text-sm text-emerald-600 font-medium mb-1">RTB（信じる理由）</p>
            <div className="flex flex-wrap gap-2">
              {messaging.rtb.map((item, i) =>
                isEditMode ? (
                  <input
                    key={i}
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newRtb = [...messaging.rtb];
                      newRtb[i] = e.target.value;
                      updateMessaging("rtb", newRtb);
                    }}
                    className="px-2 py-1 bg-white text-emerald-700 rounded text-sm border border-emerald-200"
                  />
                ) : (
                  <span key={item} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-sm">{item}</span>
                )
              )}
            </div>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-sm text-amber-600 font-medium mb-1">時流</p>
            {isEditMode ? (
              <input
                type="text"
                value={messaging.trend}
                onChange={(e) => updateMessaging("trend", e.target.value)}
                className="text-sm font-medium text-gray-900 w-full bg-white rounded px-2 py-1 border border-amber-200"
              />
            ) : (
              <p className="text-sm font-medium text-gray-900">{messaging.trend}</p>
            )}
          </div>
        </div>

        {/* Message Hierarchy */}
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">メッセージ階層</p>
          <div className="flex flex-wrap gap-2">
            {messageHierarchy.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-xs text-gray-500">{item.stage}</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={item.message}
                      onChange={(e) => {
                        const newHierarchy = [...messageHierarchy];
                        newHierarchy[index] = { ...item, message: e.target.value };
                        setMessageHierarchy(newHierarchy);
                        setDirty(true);
                      }}
                      className="text-sm font-medium text-gray-900 w-full bg-gray-50 rounded px-1 py-0.5 border border-gray-200"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-900">「{item.message}」</p>
                  )}
                </div>
                {index < messageHierarchy.length - 1 && (
                  <span className="mx-2 text-gray-400">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 flex items-center justify-center bg-sky-100 text-sky-600 rounded-full text-sm font-bold">H</span>
          How（どうやって）
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">優先度</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">目的</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">施策</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">役割</th>
              </tr>
            </thead>
            <tbody>
              {tactics.map((tactic, index) => (
                <tr key={tactic.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      tactic.priority === 1 ? "bg-pink-100 text-pink-700" :
                      tactic.priority === 2 ? "bg-amber-100 text-amber-700" :
                      tactic.priority === 3 ? "bg-sky-100 text-sky-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {tactic.priority}位
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={tactic.purpose}
                        onChange={(e) => {
                          const newTactics = [...tactics];
                          newTactics[index] = { ...tactic, purpose: e.target.value };
                          setTactics(newTactics);
                          setDirty(true);
                        }}
                        className="w-full bg-gray-50 rounded px-2 py-0.5 border border-gray-200"
                      />
                    ) : (
                      tactic.purpose
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={tactic.name}
                        onChange={(e) => {
                          const newTactics = [...tactics];
                          newTactics[index] = { ...tactic, name: e.target.value };
                          setTactics(newTactics);
                          setDirty(true);
                        }}
                        className="w-full bg-gray-50 rounded px-2 py-0.5 border border-gray-200"
                      />
                    ) : (
                      tactic.name
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={tactic.role}
                        onChange={(e) => {
                          const newTactics = [...tactics];
                          newTactics[index] = { ...tactic, role: e.target.value };
                          setTactics(newTactics);
                          setDirty(true);
                        }}
                        className="w-full bg-gray-50 rounded px-2 py-0.5 border border-gray-200"
                      />
                    ) : (
                      tactic.role
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Phase Strategy */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">期間別戦略</h2>
        <div className="space-y-4">
          {phases.map((phase, phaseIndex) => (
            <div
              key={phase.id}
              className={`p-4 rounded-lg border ${
                phase.id === 1 || phase.id === 5
                  ? "border-pink-200 bg-pink-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    phase.id === 1 || phase.id === 5
                      ? "bg-pink-200 text-pink-700"
                      : "bg-gray-200 text-gray-700"
                  }`}>
                    {phase.period}
                  </span>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={phase.name}
                      onChange={(e) => {
                        const newPhases = [...phases];
                        newPhases[phaseIndex] = { ...phase, name: e.target.value };
                        setPhases(newPhases);
                        setDirty(true);
                      }}
                      className="font-bold text-gray-900 bg-white rounded px-2 py-0.5 border border-gray-200"
                    />
                  ) : (
                    <span className="font-bold text-gray-900">{phase.name}</span>
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">目的</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={phase.purpose}
                      onChange={(e) => {
                        const newPhases = [...phases];
                        newPhases[phaseIndex] = { ...phase, purpose: e.target.value };
                        setPhases(newPhases);
                        setDirty(true);
                      }}
                      className="w-full text-gray-900 bg-white rounded px-2 py-0.5 border border-gray-200"
                    />
                  ) : (
                    <p className="text-gray-900">{phase.purpose}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 mb-1">戦略</p>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={phase.strategy}
                      onChange={(e) => {
                        const newPhases = [...phases];
                        newPhases[phaseIndex] = { ...phase, strategy: e.target.value };
                        setPhases(newPhases);
                        setDirty(true);
                      }}
                      className="w-full text-gray-900 bg-white rounded px-2 py-0.5 border border-gray-200"
                    />
                  ) : (
                    <p className="text-gray-900">{phase.strategy}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500 mb-1">施策</p>
                  <div className="flex flex-wrap gap-1">
                    {phase.tactics.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white rounded text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              {phase.kpi.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-gray-500 text-xs mb-1">KPI</p>
                  <div className="flex flex-wrap gap-1">
                    {phase.kpi.map((kpi, i) => (
                      <span key={i} className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs">{kpi}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      {isEditMode && (
        <div className="sticky bottom-4 flex justify-center">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 px-6 py-3">
            <SaveButton file="strategy" data={getSaveData()} />
          </div>
        </div>
      )}
    </div>
  );
}
