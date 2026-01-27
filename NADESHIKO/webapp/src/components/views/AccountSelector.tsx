'use client';

import { useState, useRef, useEffect } from 'react';

interface AccountSelectorProps {
  accounts: string[];
  selectedAccounts: string[];
  onSelectionChange: (accounts: string[]) => void;
  maxSelection?: number;
  mode: 'single' | 'multi';
  showAllOption?: boolean;  // 「全員」オプション表示
  isAllSelected?: boolean;  // 「全員」が選択されているか
  onAllSelect?: () => void; // 「全員」選択時のコールバック
}

export default function AccountSelector({
  accounts,
  selectedAccounts,
  onSelectionChange,
  maxSelection = 10,
  mode,
  showAllOption = false,
  isAllSelected = false,
  onAllSelect,
}: AccountSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (account: string) => {
    if (mode === 'single') {
      onSelectionChange([account]);
      setIsOpen(false);
    } else {
      // 「全員」選択中に個別アカウントをクリック → 全員解除してそのアカウントを選択
      if (isAllSelected) {
        onSelectionChange([account]);
        return;
      }
      if (selectedAccounts.includes(account)) {
        onSelectionChange(selectedAccounts.filter(a => a !== account));
      } else if (selectedAccounts.length < maxSelection) {
        onSelectionChange([...selectedAccounts, account]);
      }
    }
  };

  const handleAllSelect = () => {
    if (onAllSelect) {
      onAllSelect();
    }
  };

  // 「全員」を解除する（クリックで解除可能に）
  const handleAllDeselect = () => {
    onSelectionChange([]);
  };

  const label = isAllSelected
    ? '全員'
    : selectedAccounts.length === 0
      ? 'アカウントを選択'
      : selectedAccounts.length === 1
        ? selectedAccounts[0]
        : `${selectedAccounts.length}件選択中`;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border rounded-lg px-3 py-2 text-sm bg-white min-w-[180px] text-left flex items-center justify-between gap-2"
      >
        <span className="truncate">{label}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-64 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {/* 「全員」オプション（比較モードのみ） */}
          {showAllOption && mode === 'multi' && (
            <>
              <label
                className={`flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 ${isAllSelected ? 'bg-blue-50' : ''}`}
                onClick={isAllSelected ? handleAllDeselect : handleAllSelect}
              >
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={isAllSelected ? handleAllDeselect : handleAllSelect}
                  className="rounded border-gray-300 text-blue-500"
                />
                <span className={`text-sm font-medium ${isAllSelected ? 'text-blue-700' : 'text-gray-700'}`}>全員</span>
              </label>
            </>
          )}
          {accounts.map((account) => (
            <label
              key={account}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type={mode === 'single' ? 'radio' : 'checkbox'}
                checked={!isAllSelected && selectedAccounts.includes(account)}
                onChange={() => handleToggle(account)}
                disabled={mode === 'multi' && !isAllSelected && !selectedAccounts.includes(account) && selectedAccounts.length >= maxSelection}
                className="rounded border-gray-300 text-blue-500"
              />
              <span className="text-sm truncate">{account}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
