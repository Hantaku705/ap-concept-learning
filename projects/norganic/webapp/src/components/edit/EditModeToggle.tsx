"use client";

import { useEdit } from "@/contexts/EditContext";

export function EditModeToggle() {
  const { isEditMode, setEditMode, isDirty, isDev } = useEdit();

  // 本番環境では非表示
  if (!isDev) return null;

  return (
    <div className="flex items-center gap-2">
      {isDirty && (
        <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
          未保存の変更
        </span>
      )}
      <button
        onClick={() => setEditMode(!isEditMode)}
        className={`
          px-3 py-1.5 text-sm font-medium rounded-md transition-colors
          ${
            isEditMode
              ? "bg-pink-600 text-white hover:bg-pink-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }
        `}
      >
        {isEditMode ? "編集中" : "編集モード"}
      </button>
    </div>
  );
}
