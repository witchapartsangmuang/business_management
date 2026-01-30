'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type NotificationItem = {
  id: string;
  title: string;        // ข้อความหลัก (ชื่อ/หัวข้อ)
  description?: string; // ข้อความรอง
  timeAgo: string;      // เช่น "1 วัน", "5 วัน"
  avatarText?: string;  // ใช้แทนรูป (ตัวอย่าง) หรือจะใส่ avatarUrl ก็ได้
  avatarUrl?: string;   // ถ้ามีภาพจริง
  isUnread: boolean;
  group: 'new' | 'earlier';
};

const MOCK_NOTIS: NotificationItem[] = [
  {
    id: '1',
    title: 'เมื่อวานนี้เป็นวันเกิดของ Nopphadon Phanwong',
    timeAgo: '1 วัน',
    isUnread: true,
    group: 'new',
    avatarText: 'NP',
  },
  {
    id: '2',
    title: 'KMITL: “ด่วน รับสมัครครู Part time ...”',
    description: 'ประกาศรับสมัครหรืออาจมีลิงก์รายละเอียด',
    timeAgo: '5 วัน',
    isUnread: true,
    group: 'earlier',
    avatarText: 'KM',
  },
  {
    id: '3',
    title: 'Make Wannafly แสดงความคิดเห็นต่อโพสต์ของ Petch Bannasorn',
    timeAgo: '1 สัปดาห์',
    isUnread: false,
    group: 'earlier',
    avatarText: 'MW',
  },
  {
    id: '4',
    title: 'ประกาศเพจของคุณได้รับการกำหนดเป็นธุรกิจ',
    description: 'Wisdom Platform',
    timeAgo: '3 สัปดาห์',
    isUnread: true,
    group: 'earlier',
    avatarText: 'WP',
  },
];

function Avatar({ item }: { item: NotificationItem }) {
  if (item.avatarUrl) {
    return (
      // ใช้ <img> เพื่อให้เป็นไฟล์เดียวจบ (ไม่ต้อง next/image)
      <img
        src={item.avatarUrl}
        alt="avatar"
        className="h-11 w-11 rounded-full object-cover"
      />
    );
  }
  return (
    <div className="h-11 w-11 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
      {item.avatarText ?? '•'}
    </div>
  );
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'all' | 'unread'>('all');
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // click outside close
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const data = useMemo(() => {
    if (tab === 'unread') return MOCK_NOTIS.filter((n) => n.isUnread);
    return MOCK_NOTIS;
  }, [tab]);

  const unreadCount = useMemo(
    () => MOCK_NOTIS.filter((n) => n.isUnread).length,
    []
  );

  const newItems = data.filter((n) => n.group === 'new');
  const earlierItems = data.filter((n) => n.group === 'earlier');

  return (
    <div ref={wrapRef} className="relative">
      {/* Bell button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
        aria-haspopup="menu"
        aria-expanded={open}
        title="Notifications"
      >
        <span className="text-lg">🔔</span>

        {/* unread badge */}
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[11px] leading-[18px] text-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 mt-2 w-[360px] rounded-2xl border bg-white shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-4">
            <div className="text-xl font-bold text-gray-900">การแจ้งเตือน</div>
            <button
              type="button"
              className="h-9 w-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600"
              title="More"
            >
              …
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 px-4 py-3">
            <button
              type="button"
              onClick={() => setTab('all')}
              className={[
                'rounded-full px-3 py-1 text-sm font-medium',
                tab === 'all' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700',
              ].join(' ')}
            >
              ทั้งหมด
            </button>
            <button
              type="button"
              onClick={() => setTab('unread')}
              className={[
                'rounded-full px-3 py-1 text-sm font-medium',
                tab === 'unread' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700',
              ].join(' ')}
            >
              ยังไม่ได้อ่าน
            </button>
          </div>

          {/* List */}
          <div className="max-h-[520px] overflow-auto pb-3">
            {/* New section */}
            <div className="flex items-center justify-between px-4 pt-2">
              <div className="text-sm font-semibold text-gray-900">ใหม่</div>
              <button className="text-sm font-medium text-blue-600 hover:underline" type="button">
                ดูทั้งหมด
              </button>
            </div>

            {newItems.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">ไม่มีรายการใหม่</div>
            ) : (
              <div className="mt-2">
                {newItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="w-full px-3 py-2 hover:bg-gray-50"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar item={item} />
                      <div className="flex-1 text-left">
                        <div className="text-sm text-gray-900 leading-snug">
                          {item.title}
                        </div>
                        {item.description && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            {item.description}
                          </div>
                        )}
                        <div className="text-xs text-blue-600 mt-1">
                          {item.timeAgo}
                        </div>
                      </div>
                      {/* blue dot */}
                      <div className="flex items-center">
                        {item.isUnread && (
                          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Earlier section */}
            <div className="px-4 pt-3">
              <div className="text-sm font-semibold text-gray-900">ก่อนหน้านี้</div>
            </div>

            {earlierItems.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">ไม่มีรายการก่อนหน้านี้</div>
            ) : (
              <div className="mt-2">
                {earlierItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="w-full px-3 py-2 hover:bg-gray-50"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar item={item} />
                      <div className="flex-1 text-left">
                        <div className="text-sm text-gray-900 leading-snug">
                          {item.title}
                        </div>
                        {item.description && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            {item.description}
                          </div>
                        )}
                        <div className="text-xs text-blue-600 mt-1">
                          {item.timeAgo}
                        </div>
                      </div>
                      <div className="flex items-center">
                        {item.isUnread && (
                          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Footer button */}
            <div className="px-4 pt-3">
              <button
                type="button"
                className="w-full rounded-lg bg-gray-100 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-200"
              >
                ดูการแจ้งเตือนก่อนหน้า
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}