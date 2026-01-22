"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface EditContextType {
  isEditMode: boolean;
  setEditMode: (mode: boolean) => void;
  isDirty: boolean;
  setDirty: (dirty: boolean) => void;
  isDev: boolean;
  // 編集データ管理
  pendingChanges: Record<string, unknown>;
  setPendingChange: (file: string, data: unknown) => void;
  clearPendingChanges: () => void;
  // 保存機能
  saveChanges: (file: string) => Promise<boolean>;
  isSaving: boolean;
}

const EditContext = createContext<EditContextType | undefined>(undefined);

export function EditProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setEditMode] = useState(false);
  const [isDirty, setDirty] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Record<string, unknown>>({});
  const [isSaving, setIsSaving] = useState(false);

  // 開発環境かどうか（クライアント側で判定）
  const isDev = process.env.NODE_ENV === "development";

  const setPendingChange = useCallback((file: string, data: unknown) => {
    setPendingChanges((prev) => ({ ...prev, [file]: data }));
    setDirty(true);
  }, []);

  const clearPendingChanges = useCallback(() => {
    setPendingChanges({});
    setDirty(false);
  }, []);

  const saveChanges = useCallback(async (file: string): Promise<boolean> => {
    if (!isDev) {
      console.warn("Save is disabled in production");
      return false;
    }

    const data = pendingChanges[file];
    if (!data) {
      console.warn(`No pending changes for ${file}`);
      return false;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`/api/data/${file}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Save failed:", error);
        return false;
      }

      // 成功したらpendingChangesから削除
      setPendingChanges((prev) => {
        const next = { ...prev };
        delete next[file];
        return next;
      });

      // すべて保存済みならdirtyをfalseに
      if (Object.keys(pendingChanges).length <= 1) {
        setDirty(false);
      }

      return true;
    } catch (error) {
      console.error("Save error:", error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [isDev, pendingChanges]);

  return (
    <EditContext.Provider
      value={{
        isEditMode,
        setEditMode,
        isDirty,
        setDirty,
        isDev,
        pendingChanges,
        setPendingChange,
        clearPendingChanges,
        saveChanges,
        isSaving,
      }}
    >
      {children}
    </EditContext.Provider>
  );
}

export function useEdit() {
  const context = useContext(EditContext);
  if (context === undefined) {
    throw new Error("useEdit must be used within an EditProvider");
  }
  return context;
}
