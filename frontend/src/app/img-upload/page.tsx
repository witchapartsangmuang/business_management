'use client';

import IconPencil from "@/components/icons/icon-pen";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";

type UserInfo = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  approver: string;
  organizationalUnit: string;
  avatarUrl?: string;
};

export default function AccountPage() {
  const initialUrl = "/default-profile-avatar.webp";

  // ===== Axios instance (รวมในไฟล์เดียว) =====
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
    withCredentials: true, // ถ้าใช้ cookie session
    headers: { Accept: "application/json" },
  });

  // ===== Upload + Preview states =====
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  // avatarUrl = รูปที่บันทึกแล้ว/โหลดจาก server (ตอนนี้เริ่มจาก default)
  const [avatarUrl, setAvatarUrl] = useState<string>(initialUrl);

  // ===== Save states =====
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // ===== Change Password Modal States =====
  const [isPwModalOpen, setIsPwModalOpen] = useState(false);
  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [pwError, setPwError] = useState<string | null>(null);

  // ===== Preview URL =====
  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

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

    // แนะนำ: allowlist แบบเจาะจง
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
    if (!ALLOWED_TYPES.includes(f.type)) {
      setError("รองรับเฉพาะ JPG, PNG, WEBP เท่านั้น");
      e.target.value = "";
      return;
    }

    if (f.size > 5 * 1024 * 1024) {
      setError("ไฟล์ใหญ่เกิน 5MB");
      e.target.value = "";
      return;
    }

    setFile(f); // ✅ แสดง preview ทันที
  };

  // รูปที่แสดง: ถ้ามี preview ใช้ preview ไม่งั้นใช้รูปที่ save แล้ว
  const displayUrl = previewUrl ?? avatarUrl;

  // ===== User Info =====
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: "",
    name: "",
    email: "",
    phone: "",
    position: "",
    approver: "",
    organizationalUnit: "",
    avatarUrl: initialUrl,
  });

  // ===== API Functions (รวมในไฟล์เดียว) =====
  const uploadAvatar = async (uploadFile: File) => {
    const form = new FormData();
    form.append("file", uploadFile);

    // อย่าตั้ง Content-Type เอง ให้ axios ทำ boundary ให้
    const res = await api.post<{ url: string }>("/api/account/avatar", form);
    return res.data; // { url }
  };

  const updateAccount = async (payload: UserInfo) => {
    const res = await api.put("/api/account", payload);
    return res.data;
  };

  // ===== Save Handler =====
  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      let uploadedUrl: string | undefined;

      // 1) upload รูปก่อน (ถ้ามีไฟล์ใหม่)
      if (file) {
        const { url } = await uploadAvatar(file);
        uploadedUrl = url;

        // set รูปจริงที่ save แล้ว
        setAvatarUrl(url);

        // ล้างไฟล์เลือก
        setFile(null);
        if (inputRef.current) inputRef.current.value = "";
      }

      // 2) update ข้อมูล user (แนบ avatarUrl ถ้ามีอัปโหลดใหม่)
      await updateAccount({
        ...userInfo,
        avatarUrl: uploadedUrl ?? userInfo.avatarUrl ?? avatarUrl,
      });

      // อัปเดต state userInfo.avatarUrl ให้ตรง
      if (uploadedUrl) {
        setUserInfo((prev) => ({ ...prev, avatarUrl: uploadedUrl }));
      }

      // (optional) success feedback
      // alert("Saved!");
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setSaveError(err.response?.data?.message || err.message);
      } else {
        setSaveError("Save failed");
      }
    } finally {
      setIsSaving(false);
    }
  };

  // ===== Change Password Handlers (ยังไม่ยิง API) =====
  const openPwModal = () => {
    setPwError(null);
    setPwForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
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

    console.log("Change password payload:", pwForm);
    closePwModal();
  };

  return (
    <div className="bg-white max-w-[840px] mt-6 mx-auto p-6 rounded-md shadow-md">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
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

          {error && <div className="text-xs text-red-600 mt-2">{error}</div>}
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
            onChange={(e) =>
              setUserInfo({ ...userInfo, position: e.target.value })
            }
          />
        </div>

        <div className="col-span-6 mt-3 px-3">
          <label className="form-label">Approver</label>
          <select
            className="form-select"
            value={userInfo.approver}
            onChange={(e) =>
              setUserInfo({ ...userInfo, approver: e.target.value })
            }
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
            onChange={(e) =>
              setUserInfo({ ...userInfo, organizationalUnit: e.target.value })
            }
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

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      {saveError && (
        <div className="mt-2 text-sm text-red-600 px-3">{saveError}</div>
      )}

      {/* ===== Change Password Modal ===== */}
      {isPwModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black/50" onClick={closePwModal} />

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

              {pwError && <div className="text-sm text-red-600">{pwError}</div>}

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