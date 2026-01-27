'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/app/contexts/AuthContext'

const STORAGE_KEY = 'cc-onboarding-checks'

export function useProgress() {
  const { user, loading: authLoading } = useAuth()
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return

    const loadProgress = async () => {
      // まずlocalStorageから読み込み（即時表示用）
      const localData = localStorage.getItem(STORAGE_KEY)
      const localProgress: Record<string, boolean> = localData ? JSON.parse(localData) : {}

      if (!user) {
        // 匿名ユーザー: localStorageのみ使用
        setProgress(localProgress)
        setLoading(false)
        return
      }

      // ログインユーザー: マイグレーションチェック
      const migrationKey = `${STORAGE_KEY}-migrated-${user.id}`
      const hasMigrated = localStorage.getItem(migrationKey)

      try {
        if (!hasMigrated && Object.keys(localProgress).length > 0) {
          // 初回ログイン + 既存localStorageデータあり → マイグレーション
          const res = await fetch('/api/progress/migrate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ localProgress }),
          })
          const { progress: cloudProgress } = await res.json()
          setProgress(cloudProgress || {})
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudProgress || {}))
          localStorage.setItem(migrationKey, 'true')
        } else {
          // クラウドから取得
          const res = await fetch('/api/progress')
          if (res.ok) {
            const { progress: cloudProgress } = await res.json()
            setProgress(cloudProgress || {})
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudProgress || {}))
          } else {
            // API エラー時はlocalStorageにフォールバック
            setProgress(localProgress)
          }
        }
      } catch (error) {
        // ネットワークエラー時はlocalStorageにフォールバック
        console.error('Failed to load progress from cloud:', error)
        setProgress(localProgress)
      }

      setLoading(false)
    }

    loadProgress()
  }, [user, authLoading])

  const updateProgress = useCallback(
    async (key: string, value: boolean) => {
      const newProgress = { ...progress, [key]: value }
      setProgress(newProgress)

      // 常にlocalStorageを先に更新（楽観的更新）
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress))

      // ログインユーザーのみクラウドに同期
      if (user) {
        try {
          await fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ progress: newProgress }),
          })
        } catch (error) {
          console.error('Failed to sync progress to cloud:', error)
          // エラーでもlocalStorageには保存済みなので問題なし
        }
      }
    },
    [progress, user]
  )

  return { progress, updateProgress, loading }
}
