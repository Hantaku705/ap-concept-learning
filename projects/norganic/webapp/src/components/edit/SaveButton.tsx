"use client";

import { useEdit } from "@/contexts/EditContext";
import { useState } from "react";

interface SaveButtonProps {
  file: string;
  data: Record<string, unknown>;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function SaveButton({ file, data, onSuccess, onError }: SaveButtonProps) {
  const { isEditMode, isDev, isSaving } = useEdit();
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // 編集モードでない場合、または本番環境では非表示
  if (!isEditMode || !isDev) return null;

  const handleSave = async () => {
    setStatus("saving");
    setErrorMessage("");

    try {
      const response = await fetch(`/api/data/${file}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "保存に失敗しました");
      }

      setStatus("success");
      onSuccess?.();

      // 成功後にページをリロードして最新データを反映
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "保存に失敗しました";
      setStatus("error");
      setErrorMessage(message);
      onError?.(message);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleSave}
        disabled={status === "saving" || isSaving}
        className={`
          px-4 py-2 text-sm font-medium rounded-md transition-colors
          ${
            status === "saving" || isSaving
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-pink-600 text-white hover:bg-pink-700"
          }
        `}
      >
        {status === "saving" || isSaving ? "保存中..." : "保存"}
      </button>

      {status === "success" && (
        <span className="text-sm text-green-600">
          保存しました（リロード中...）
        </span>
      )}

      {status === "error" && (
        <span className="text-sm text-red-600">{errorMessage}</span>
      )}
    </div>
  );
}
