'use client';

import IconPencil from "@/components/icons/icon-pen";
import { useEffect, useMemo, useRef, useState } from 'react'

type userInfo = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  approver: string;
  organizationalUnit: string;
}

export default function ProfilePage() {
  const initialUrl = "/default-profile-avatar.webp";

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ===== Change Password Modal States =====
  const [isPwModalOpen, setIsPwModalOpen] = useState(false);
  const [pwForm, setPwForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [pwError, setPwError] = useState<string | null>(null);

  // สร้าง preview url
  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  // cleanup memory
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const openPicker = () => inputRef.current?.click();

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const f = e.target.files?.[0];
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      setError("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
      e.target.value = "";
      return;
    }

    if (f.size > 5 * 1024 * 1024) {
      setError("ไฟล์ใหญ่เกิน 5MB");
      e.target.value = "";
      return;
    }

    setFile(f); // ✅ แค่ set state → รูปเปลี่ยน
  };

  const displayUrl = previewUrl ?? initialUrl;

  const [userInfo, setUserInfo] = useState<userInfo>({
    id: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    approver: '',
    organizationalUnit: ''
  });

  // ===== Change Password Handlers =====
  const openPwModal = () => {
    setPwError(null);
    setPwForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    setIsPwModalOpen(true);
  };

  const closePwModal = () => {
    setIsPwModalOpen(false);
    setPwError(null);
  };

  const submitChangePassword = (e?: React.FormEvent) => {
    e?.preventDefault();
    setPwError(null);

    const { currentPassword, newPassword, confirmNewPassword } = pwForm;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPwError("กรุณากรอกข้อมูลให้ครบทั้ง 3 ช่อง");
      return;
    }
    if (newPassword.length < 8) {
      setPwError("รหัสใหม่ต้องมีอย่างน้อย 8 ตัวอักษร");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPwError("ยืนยันรหัสใหม่ไม่ตรงกัน");
      return;
    }

    // ✅ ยังไม่ยิง API (ตามที่ต้องการ) — แค่แสดงผล/ปิดโมดัล
    // คุณสามารถเอา pwForm ไปยิง API ทีหลังได้
    console.log("Change password payload:", pwForm);

    closePwModal();
  };

  return (
    <div className="bg-white max-w-[840px] mt-6 mx-auto p-6 rounded-md shadow-md">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onPickFile}
      />

      <div className="grid grid-cols-12">
        <div className="col-span-6 mt-3 px-3">
          <div
            className="group relative w-32 h-32 cursor-pointer overflow-hidden rounded-full"
            onClick={openPicker}
            title="คลิกเพื่อเปลี่ยนรูป"
          >
            <img
              src={displayUrl}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border border-gray-300 bg-gray-200"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <IconPencil className="h-6 w-6 text-white opacity-80" />
            </div>
          </div>

          {error && (
            <div className="text-xs text-red-600 mt-2">{error}</div>
          )}
        </div>

        <div className="col-span-6 mt-3 px-3">
          <label className="form-label">My Description</label>
          <textarea className="form-input" rows={3}></textarea>
        </div>

        <div className="col-span-6 mt-3 px-3">
          <label className="form-label">Employee Code</label>
          <input
            type="text"
            className="form-input"
            value={userInfo.id}
            onChange={(e) => setUserInfo({ ...userInfo, id: e.target.value })}
          />
        </div>

        <div className="col-span-6 mt-3 px-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-input"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        </div>

        <div className="col-span-6 mt-3 px-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-input"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        </div>

        <div className="col-span-6 mt-3 px-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            className="form-input"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
        </div>

        <div className="col-span-6 mt-3 px-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-input"
            value={userInfo.phone}
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
          />
        </div>

        <div className="col-span-6 mt-3 px-3">
          <label className="form-label">Position</label>
          <input
            type="text"
            className="form-input"
            value={userInfo.position}
            onChange={(e) => setUserInfo({ ...userInfo, position: e.target.value })}
          />
        </div>

        <div className="col-span-6 mt-3 px-3">
          <label className="form-label">Approver</label>
          <select
            className="form-select"
            value={userInfo.approver}
            onChange={(e) => setUserInfo({ ...userInfo, approver: e.target.value })}
          >
            <option>Mr. A</option>
            <option>Mr. B</option>
          </select>
        </div>

        <div className="col-span-6 mt-3 px-3">
          <label className="form-label">Organizational Unit</label>
          <select
            className="form-select"
            value={userInfo.organizationalUnit}
            onChange={(e) => setUserInfo({ ...userInfo, organizationalUnit: e.target.value })}
          >
            <option>Mr. A</option>
            <option>Mr. B</option>
          </select>
        </div>

        <div className="col-span-6 mt-3 px-3">
          <button
            type="button"
            onClick={openPwModal}
            className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            เปลี่ยนรหัสผ่าน
          </button>
        </div>
      </div>

      <div className="flex justify-between rounded bg-white mt-6 px-3">
        <button className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
          Back
        </button>
        <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Save
        </button>
      </div>

      {/* ===== Change Password Modal ===== */}
      {isPwModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closePwModal}
          />

          {/* Modal Card */}
          <div className="relative z-10 w-[92%] max-w-md rounded-xl bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">เปลี่ยนรหัสผ่าน</h3>
              <button
                type="button"
                onClick={closePwModal}
                className="rounded-md px-2 py-1 text-gray-600 hover:bg-gray-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={submitChangePassword} className="mt-4 space-y-3">
              <div>
                <label className="form-label">รหัสปัจจุบัน</label>
                <input
                  type="password"
                  className="form-input"
                  value={pwForm.currentPassword}
                  onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
                  autoFocus
                />
              </div>

              <div>
                <label className="form-label">รหัสใหม่</label>
                <input
                  type="password"
                  className="form-input"
                  value={pwForm.newPassword}
                  onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">ยืนยันรหัสใหม่</label>
                <input
                  type="password"
                  className="form-input"
                  value={pwForm.confirmNewPassword}
                  onChange={(e) => setPwForm({ ...pwForm, confirmNewPassword: e.target.value })}
                />
              </div>

              {pwError && (
                <div className="text-sm text-red-600">{pwError}</div>
              )}

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closePwModal}
                  className="px-3 py-2 rounded-md border hover:bg-gray-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                >
                  ยืนยันเปลี่ยนรหัส
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}