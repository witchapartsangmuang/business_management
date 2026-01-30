'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Props = {
  profileHref?: string;         // default: /account
  onLogout?: () => void | Promise<void>;
};

export default function UserMenuDropdown({
  profileHref = '/account',
  onLogout,
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // click outside to close
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await onLogout?.();
    } finally {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      {/* icon button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100"
        aria-haspopup="menu"
        aria-expanded={open}
        title="User menu"
      >
        {/* เปลี่ยนเป็น icon ของคุณได้ */}
        <span className="text-lg">👤</span>
      </button>

      {/* dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-lg border bg-white shadow-lg">
          <Link
            href={profileHref}
            className="block px-4 py-2 text-sm hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}