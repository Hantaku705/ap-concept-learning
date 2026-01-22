"use client";

import { useState, useEffect } from "react";
import {
  conceptMeta,
  mainConcept as initialMainConcept,
  usageCopy as initialUsageCopy,
  evaluation14 as initialEvaluation14,
  reframingFormula as initialReframingFormula,
  whyThisWorks as initialWhyThisWorks,
  rejectedCandidates as initialRejectedCandidates,
  improvements as initialImprovements,
} from "@/data/concept-data";
import { useEdit } from "@/contexts/EditContext";
import { EditableText, SaveButton } from "@/components/edit";

// データ型定義
type MainConcept = typeof initialMainConcept;
type UsageCopy = typeof initialUsageCopy;
type Evaluation14 = typeof initialEvaluation14;
type ReframingFormula = typeof initialReframingFormula;
type WhyThisWorks = typeof initialWhyThisWorks;
type RejectedCandidates = typeof initialRejectedCandidates;
type Improvements = typeof initialImprovements;

export default function ConceptContent() {
  const { isEditMode, setDirty } = useEdit();

  // ローカル編集状態
  const [mainConcept, setMainConcept] = useState<MainConcept>(initialMainConcept);
  const [usageCopy, setUsageCopy] = useState<UsageCopy>(initialUsageCopy);
  const [evaluation14, setEvaluation14] = useState<Evaluation14>(initialEvaluation14);
  const [reframingFormula, setReframingFormula] = useState<ReframingFormula>(initialReframingFormula);
  const [whyThisWorks, setWhyThisWorks] = useState<WhyThisWorks>(initialWhyThisWorks);
  const [rejectedCandidates, setRejectedCandidates] = useState<RejectedCandidates>(initialRejectedCandidates);
  const [improvements, setImprovements] = useState<Improvements>(initialImprovements);

  // 保存用データを構築
  const getSaveData = () => ({
    conceptMeta,
    mainConcept,
    usageCopy,
    evaluation14,
    reframingFormula,
    whyThisWorks,
    rejectedCandidates,
    improvements,
  });

  // mainConcept更新ヘルパー
  const updateMainConcept = <K extends keyof MainConcept>(key: K, value: MainConcept[K]) => {
    setMainConcept((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  // usageCopy更新ヘルパー
  const updateUsageCopy = (index: number, field: "usage" | "copy", value: string) => {
    setUsageCopy((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
    setDirty(true);
  };

  // evaluation14更新ヘルパー
  const updateEvaluation14 = (index: number, field: "item" | "score" | "reason", value: string) => {
    setEvaluation14((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
    setDirty(true);
  };

  return (
    <div className="space-y-8">
      {/* Main Concept Hero */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-8 text-white">
        <div className="text-center">
          <p className="text-pink-100 text-sm mb-2">メインコンセプト</p>
          {isEditMode ? (
            <input
              type="text"
              value={mainConcept.title}
              onChange={(e) => updateMainConcept("title", e.target.value)}
              className="text-4xl md:text-5xl font-bold mb-4 bg-white/20 rounded px-4 py-2 text-center w-full max-w-lg text-white placeholder-pink-200"
              placeholder="メインコンセプトを入力"
            />
          ) : (
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{mainConcept.title}</h1>
          )}
          <p className="text-pink-100 text-lg">{mainConcept.characters}文字でシンプルに</p>
        </div>
      </div>

      {/* Concept System */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">コンセプト体系</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-pink-50 rounded-lg p-4">
            <p className="text-sm text-pink-600 font-medium mb-1">サブコピー（感情喚起）</p>
            {isEditMode ? (
              <input
                type="text"
                value={mainConcept.subCopyEmotion}
                onChange={(e) => updateMainConcept("subCopyEmotion", e.target.value)}
                className="text-xl font-bold text-gray-900 bg-white rounded px-2 py-1 w-full border border-pink-200"
              />
            ) : (
              <p className="text-xl font-bold text-gray-900">{mainConcept.subCopyEmotion}</p>
            )}
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-sm text-amber-600 font-medium mb-1">サブコピー（エビデンス）</p>
            {isEditMode ? (
              <input
                type="text"
                value={mainConcept.subCopyEvidence}
                onChange={(e) => updateMainConcept("subCopyEvidence", e.target.value)}
                className="text-xl font-bold text-gray-900 bg-white rounded px-2 py-1 w-full border border-amber-200"
              />
            ) : (
              <p className="text-xl font-bold text-gray-900">{mainConcept.subCopyEvidence}</p>
            )}
          </div>
          <div className="bg-sky-50 rounded-lg p-4">
            <p className="text-sm text-sky-600 font-medium mb-1">ハッシュタグ</p>
            <div className="flex flex-wrap gap-2">
              {mainConcept.hashtags.map((tag, i) =>
                isEditMode ? (
                  <input
                    key={i}
                    type="text"
                    value={tag}
                    onChange={(e) => {
                      const newHashtags = [...mainConcept.hashtags];
                      newHashtags[i] = e.target.value;
                      updateMainConcept("hashtags", newHashtags);
                    }}
                    className="text-sky-700 font-medium bg-white rounded px-2 py-1 border border-sky-200"
                  />
                ) : (
                  <span key={tag} className="text-sky-700 font-medium">
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4">
            <p className="text-sm text-emerald-600 font-medium mb-1">RTB（信じる理由）</p>
            <div className="flex flex-wrap gap-2">
              {mainConcept.rtb.map((item, i) =>
                isEditMode ? (
                  <input
                    key={i}
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newRtb = [...mainConcept.rtb];
                      newRtb[i] = e.target.value;
                      updateMainConcept("rtb", newRtb);
                    }}
                    className="px-2 py-1 bg-white text-emerald-700 rounded text-sm border border-emerald-200"
                  />
                ) : (
                  <span key={item} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-sm">
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Usage Copy */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">用途別展開</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">用途</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">コピー</th>
              </tr>
            </thead>
            <tbody>
              {usageCopy.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={item.usage}
                        onChange={(e) => updateUsageCopy(index, "usage", e.target.value)}
                        className="w-full bg-pink-50 rounded px-2 py-1 border border-pink-200"
                      />
                    ) : (
                      item.usage
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={item.copy}
                        onChange={(e) => updateUsageCopy(index, "copy", e.target.value)}
                        className="w-full bg-pink-50 rounded px-2 py-1 border border-pink-200"
                      />
                    ) : (
                      item.copy
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 14 Evaluation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">14項目評価</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {evaluation14.map((item, index) => (
            <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-pink-100 text-pink-600 rounded-full text-sm font-bold">
                {item.id}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {isEditMode ? (
                    <>
                      <input
                        type="text"
                        value={item.item}
                        onChange={(e) => updateEvaluation14(index, "item", e.target.value)}
                        className="font-medium text-gray-900 bg-white rounded px-2 py-0.5 border border-gray-200 flex-1"
                      />
                      <input
                        type="text"
                        value={item.score}
                        onChange={(e) => updateEvaluation14(index, "score", e.target.value)}
                        className="w-12 text-center bg-white rounded px-1 py-0.5 border border-gray-200"
                      />
                    </>
                  ) : (
                    <>
                      <span className="font-medium text-gray-900">{item.item}</span>
                      <span className="text-lg">{item.score}</span>
                    </>
                  )}
                </div>
                {isEditMode ? (
                  <input
                    type="text"
                    value={item.reason}
                    onChange={(e) => updateEvaluation14(index, "reason", e.target.value)}
                    className="w-full text-sm text-gray-600 mt-0.5 bg-white rounded px-2 py-0.5 border border-gray-200"
                  />
                ) : (
                  <p className="text-sm text-gray-600 mt-0.5">{item.reason}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reframing Formula */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">リフレーミング公式</h2>
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
          <div className="space-y-3 text-center">
            <p className="text-gray-700">
              <span className="font-bold text-pink-600">（{reframingFormula.existing}）</span>
              を
              <span className="font-bold text-rose-600">（{reframingFormula.newPerspective}）</span>
              という新視点で捉え直し、
            </p>
            <p className="text-gray-700">
              <span className="font-bold text-amber-600">（{reframingFormula.insight}）</span>
              インサイトに応える、
            </p>
            <p className="text-gray-700">
              <span className="font-bold text-emerald-600">（{reframingFormula.result}）</span>
              という{reframingFormula.feature}
            </p>
          </div>
        </div>
      </div>

      {/* Why This Works */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Why This Works</h2>
        <div className="space-y-3">
          {whyThisWorks.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-full text-sm font-bold">
                {index + 1}
              </span>
              <div>
                <span className="font-medium text-gray-900">{item.point}</span>
                <span className="text-gray-500 mx-2">-</span>
                <span className="text-gray-600">{item.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rejected Candidates & Improvements */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">元の候補の問題点</h2>
          <div className="space-y-3">
            {rejectedCandidates.map((item, index) => (
              <div key={index} className="p-3 bg-red-50 rounded-lg">
                <p className="font-medium text-gray-900 line-through">{item.candidate}</p>
                <p className="text-sm text-red-600 mt-1">{item.problem}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">改善ポイント</h2>
          <div className="space-y-3">
            {improvements.map((item, index) => (
              <div key={index} className="p-3 bg-emerald-50 rounded-lg">
                <p className="font-medium text-emerald-700">{item.point}</p>
                <p className="text-sm text-gray-600 mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isEditMode && (
        <div className="sticky bottom-4 flex justify-center">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 px-6 py-3">
            <SaveButton file="concept" data={getSaveData()} />
          </div>
        </div>
      )}
    </div>
  );
}
