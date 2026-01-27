"use client";

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscriptions } from '@/contexts/SubscriptionContext';
import { Subscription } from '@/types/subscription';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  invoices?: DetectedInvoice[];
}

interface DetectedInvoice {
  serviceName: string;
  amount: number;
  date: string;
  subscription: Partial<Subscription>;
}

export function AiAssistantContent() {
  const { tokens, isAuthenticated } = useAuth();
  const { addSubscription, subscriptions } = useSubscriptions();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [addedInvoices, setAddedInvoices] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.metaKey || e.ctrlKey) {
        // Cmd+Enter or Ctrl+Enter: Insert newline
        e.preventDefault();
        const textarea = textareaRef.current;
        if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const newValue = input.slice(0, start) + '\n' + input.slice(end);
          setInput(newValue);
          // Set cursor position after the newline
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + 1;
          }, 0);
        }
      } else {
        // Enter only: Submit
        e.preventDefault();
        if (input.trim() && !isLoading) {
          handleSubmit(e as unknown as React.FormEvent);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          accessToken: tokens?.accessToken,
          history: messages.slice(-10),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.message,
            invoices: data.invoices,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `エラー: ${data.error || '不明なエラー'}`,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'ネットワークエラーが発生しました。',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSubscription = (invoice: DetectedInvoice) => {
    const key = `${invoice.serviceName}-${invoice.date}`;
    if (addedInvoices.has(key)) return;

    const exists = subscriptions.some(
      (s) => s.serviceName.toLowerCase() === invoice.serviceName.toLowerCase()
    );

    if (exists) {
      alert(`${invoice.serviceName} は既にサブスク一覧に存在します`);
      return;
    }

    addSubscription(invoice.subscription as Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>);
    setAddedInvoices((prev) => new Set(prev).add(key));
  };

  const handleAddAll = (invoices: DetectedInvoice[]) => {
    let addedCount = 0;
    let skippedCount = 0;

    for (const invoice of invoices) {
      const key = `${invoice.serviceName}-${invoice.date}`;
      if (addedInvoices.has(key)) continue;

      const exists = subscriptions.some(
        (s) => s.serviceName.toLowerCase() === invoice.serviceName.toLowerCase()
      );

      if (exists) {
        skippedCount++;
        continue;
      }

      addSubscription(invoice.subscription as Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>);
      setAddedInvoices((prev) => new Set(prev).add(key));
      addedCount++;
    }

    if (addedCount > 0 || skippedCount > 0) {
      alert(`${addedCount}件追加しました${skippedCount > 0 ? `（${skippedCount}件は既存のため除外）` : ''}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h3 className="text-lg font-semibold mb-2">Gmail認証が必要です</h3>
        <p className="text-gray-500 mb-4">
          AIアシスタントを利用するには、スキャンタブでGmail連携を行ってください。
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[600px]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span>🤖</span>
          AIアシスタント
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          「1月の請求書来てる？」「先月のNetflixの請求」など質問してください
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <div className="text-4xl mb-4">💬</div>
            <p>請求書に関する質問をしてみましょう</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['1月の請求書来てる？', '先月の請求書一覧', 'Netflixの請求いつ来た？'].map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>

              {/* Invoice Cards */}
              {msg.invoices && msg.invoices.length > 0 && (
                <div className="mt-4 space-y-2">
                  {msg.invoices.map((inv, i) => {
                    const key = `${inv.serviceName}-${inv.date}`;
                    const isAdded = addedInvoices.has(key);
                    const exists = subscriptions.some(
                      (s) => s.serviceName.toLowerCase() === inv.serviceName.toLowerCase()
                    );

                    return (
                      <div
                        key={i}
                        className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium text-gray-900">{inv.serviceName}</div>
                          <div className="text-sm text-gray-500">
                            ¥{inv.amount.toLocaleString()} - {new Date(inv.date).toLocaleDateString('ja-JP')}
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddSubscription(inv)}
                          disabled={isAdded || exists}
                          className={`px-3 py-1 text-sm rounded ${
                            isAdded
                              ? 'bg-green-100 text-green-700 cursor-not-allowed'
                              : exists
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {isAdded ? '追加済み' : exists ? '既存' : '追加'}
                        </button>
                      </div>
                    );
                  })}

                  <button
                    onClick={() => handleAddAll(msg.invoices!)}
                    className="w-full mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                  >
                    全てサブスク一覧に追加
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-3 text-gray-600">
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                検索中...
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="px-6 py-4 border-t border-gray-200">
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="請求書について質問...（Enter: 送信 / Cmd+Enter: 改行）"
            rows={1}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[42px] max-h-[120px]"
            disabled={isLoading}
            style={{ height: 'auto', overflow: 'hidden' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 120) + 'px';
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed h-[42px]"
          >
            送信
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1">Enter: 送信 / Cmd+Enter: 改行</p>
      </form>
    </div>
  );
}
