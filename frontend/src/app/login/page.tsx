"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Login ไม่สำเร็จ");
      return;
    }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-8">

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-slate-800">เข้าสู่ระบบ</h1>
          <p className="text-sm text-slate-500">กรุณากรอกอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="form-label">อีเมล</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="form-input"
              placeholder="you@example.com"
            />
          </div>

          {/* Password + Eye Icon */}
          <div className="space-y-1 relative">
            <label htmlFor="password" className="form-label">รหัสผ่าน</label>

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="form-input pr-10"
              placeholder="กรอกรหัสผ่าน"
            />

            {/* Eye toggle button */}
            <button
              type="button"
              className="absolute right-3 top-[34px] text-slate-500 hover:text-slate-700"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                // 👁‍🗨 icon ปิดตา
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 3l18 18M10.477 10.477A3 3 0 0113.5 13.5M6.52 6.52A9.993 
                        9.993 0 002.458 12c1.274 4.057 5.065 7 9.542 7a9.96 
                        9.96 0 005.657-1.843M17.48 17.48A9.993 9.993 
                        0 0021.542 12c-.614-1.956-1.816-3.63-3.333-4.857" />
                </svg>

              ) : (
                // 👁 icon เปิดตา
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 
                        4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>

          {/* Error */}
          {error && <p className="text-xs text-red-600">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>

        </form>
      </div>
    </div>
  );
}
