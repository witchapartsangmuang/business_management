'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type LangCode =
  | 'th' | 'en' | 'zh' | 'ja' | 'ko'
  | 'vi' | 'id' | 'ms' | 'lo' | 'km'
  | 'my' | 'fr' | 'de' | 'es' | 'pt'
  | 'ru' | 'ar' | 'hi' | 'it' | 'nl';

type LangItem = {
  code: LangCode;
  label: string;
  flag: string; // emoji
};

const LANGS: LangItem[] = [
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },

  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', label: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'lo', label: 'ລາວ', flag: '🇱🇦' },
  { code: 'km', label: 'ខ្មែរ', flag: '🇰🇭' },
  { code: 'my', label: 'မြန်မာ', flag: '🇲🇲' },

  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },

  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
];

export default function LanguageSwitcher20() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<LangCode>('th');
  const [q, setQ] = useState('');

  const wrapRef = useRef<HTMLDivElement | null>(null);

  // load saved
  useEffect(() => {
    const saved = window.localStorage.getItem('lang') as LangCode | null;
    if (saved && LANGS.some((l) => l.code === saved)) setLang(saved);
  }, []);

  // click outside to close
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const current = useMemo(() => LANGS.find((l) => l.code === lang)!, [lang]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return LANGS;
    return LANGS.filter((l) => l.label.toLowerCase().includes(s) || l.code.includes(s));
  }, [q]);

  const selectLang = (code: LangCode) => {
    setLang(code);
    window.localStorage.setItem('lang', code);
    setOpen(false);
    setQ('');

    // TODO: ถ้าใช้ i18n จริง ให้เปลี่ยน locale ตรงนี้
    // router.replace(pathname, { locale: code })
  };

  return (
    <div ref={wrapRef} className="relative">
      {/* Button (ไอคอนธงบน topbar) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
        aria-haspopup="menu"
        aria-expanded={open}
        title="Change language"
      >
        <span className="text-lg leading-none">{current.flag}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-lg border bg-white shadow-lg">
          {/* Search */}
          <div className="p-2 border-b">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search language..."
              className="w-full rounded-md border px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* List */}
          <div className="max-h-64 overflow-auto py-1">
            {filtered.map((l) => {
              const active = l.code === lang;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => selectLang(l.code)}
                  className={[
                    'flex w-full items-center gap-3 px-3 py-2 text-left text-sm',
                    'hover:bg-gray-50',
                    active ? 'bg-gray-50 font-medium' : '',
                  ].join(' ')}
                  role="menuitem"
                >
                  <span className="text-base leading-none">{l.flag}</span>
                  <span className="truncate">{l.label}</span>
                  <span className="ml-auto text-xs text-gray-400">{l.code}</span>
                </button>
              );
            })}

            {filtered.length === 0 && (
              <div className="px-3 py-3 text-sm text-gray-500">No results</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}