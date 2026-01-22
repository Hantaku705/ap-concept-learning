"use client";

import { useEdit } from "@/contexts/EditContext";
import { useState, useEffect } from "react";

interface EditableNumberProps {
  value: number;
  onChange: (value: number) => void;
  formatter?: (value: number) => string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export function EditableNumber({
  value,
  onChange,
  formatter,
  className = "",
  min,
  max,
  step = 1,
  unit,
}: EditableNumberProps) {
  const { isEditMode } = useEdit();
  const [localValue, setLocalValue] = useState(value);

  // 外部からvalueが変更された場合に同期
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue: number) => {
    setLocalValue(newValue);
    onChange(newValue);
  };

  // フォーマット済み表示
  const displayValue = formatter ? formatter(value) : value.toLocaleString();

  if (!isEditMode) {
    return (
      <span className={className}>
        {displayValue}
        {unit && <span className="ml-1 text-gray-500">{unit}</span>}
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-1">
      <input
        type="number"
        value={localValue}
        onChange={(e) => handleChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className={`
          w-24 px-2 py-1 text-sm border border-pink-300 rounded
          focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
          bg-pink-50 text-right
          ${className}
        `}
      />
      {unit && <span className="text-sm text-gray-500">{unit}</span>}
    </div>
  );
}

// 予算用フォーマッター
export function formatBudgetDisplay(amount: number): string {
  if (amount === 0) return "-";
  const man = amount / 10000;
  if (man >= 10000) {
    return `${(man / 10000).toFixed(1)}億円`;
  }
  return `${man.toLocaleString()}万円`;
}

// Imp用フォーマッター
export function formatImpDisplay(imp: number): string {
  if (imp === 0) return "-";
  if (imp >= 1000000000) {
    return `${(imp / 1000000000).toFixed(1)}B`;
  }
  if (imp >= 1000000) {
    return `${(imp / 1000000).toFixed(2)}M`;
  }
  if (imp >= 1000) {
    return `${(imp / 1000).toFixed(0)}K`;
  }
  return imp.toString();
}
