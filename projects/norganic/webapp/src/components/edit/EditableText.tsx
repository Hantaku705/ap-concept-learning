"use client";

import { useEdit } from "@/contexts/EditContext";
import { useState, useEffect } from "react";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}

export function EditableText({
  value,
  onChange,
  className = "",
  multiline = false,
  placeholder = "入力してください",
}: EditableTextProps) {
  const { isEditMode } = useEdit();
  const [localValue, setLocalValue] = useState(value);

  // 外部からvalueが変更された場合に同期
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange(newValue);
  };

  if (!isEditMode) {
    return <span className={className}>{value || "-"}</span>;
  }

  if (multiline) {
    return (
      <textarea
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full px-2 py-1 text-sm border border-pink-300 rounded
          focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
          bg-pink-50 resize-none
          ${className}
        `}
        rows={3}
      />
    );
  }

  return (
    <input
      type="text"
      value={localValue}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={placeholder}
      className={`
        px-2 py-1 text-sm border border-pink-300 rounded
        focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
        bg-pink-50
        ${className}
      `}
    />
  );
}
