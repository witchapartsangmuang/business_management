"use client";

import { useState } from "react";

type Member = {
  name: string;
  email: string;
  file: File | null;
};

type MemberError = {
  name?: string;
  email?: string;
};

export default function Register() {
  const [members, setMembers] = useState<Member[]>([
    { name: "", email: "", file: null },
  ]);

  const [errors, setErrors] = useState<MemberError[]>([]);

  // ===== handle text change =====
  const handleChange = (
    index: number,
    field: keyof Omit<Member, "file">,
    value: string
  ) => {
    setMembers((prev) =>
      prev.map((m, i) =>
        i === index ? { ...m, [field]: value } : m
      )
    );

    // ล้าง error ของ field นั้น เมื่อแก้ไข
    setErrors((prev) =>
      prev.map((err, i) =>
        i === index ? { ...err, [field]: "" } : err
      )
    );
  };

  // ===== handle file =====
  const handleFileChange = (index: number, file: File | null) => {
    setMembers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, file } : m))
    );
  };

  // ===== add row =====
  const addMember = () => {
    setMembers((prev) => [...prev, { name: "", email: "", file: null }]);
    setErrors((prev) => [...prev, {}]);
  };

  // ===== remove row =====
  const removeMember = (index: number) => {
    setMembers((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  // ===== validation =====
  const validateForm = () => {
    const newErrors: MemberError[] = [];

    members.forEach((m) => {
      const err: MemberError = {};

      if (!m.name.trim()) err.name = "Name is required";
      if (!m.email.trim()) err.email = "Email is required";

      newErrors.push(err);
    });

    setErrors(newErrors);

    // ถ้าไม่มี error เลย = valid
    return newErrors.every((e) => !e.name && !e.email);
  };

  // ===== on submit =====
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please complete required fields.");
      return;
    }

    console.log("submitted data:", members);

    const formData = new FormData();
    members.forEach((m, i) => {
      formData.append(`members[${i}][name]`, m.name);
      formData.append(`members[${i}][email]`, m.email);
      if (m.file) {
        formData.append(`members[${i}][file]`, m.file);
      }
    });

    alert("Submitted successfully! Check console.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {members.map((member, index) => (
        <div key={index} className="flex flex-col border p-4 rounded gap-3">
          {/* NAME */}
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Name *"
              value={member.name}
              onChange={(e) =>
                handleChange(index, "name", e.target.value)
              }
              className={`border px-2 py-1 rounded ${
                errors[index]?.name ? "border-red-500" : ""
              }`}
            />
            {errors[index]?.name && (
              <p className="text-red-600 text-sm">{errors[index].name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Email *"
              value={member.email}
              onChange={(e) =>
                handleChange(index, "email", e.target.value)
              }
              className={`border px-2 py-1 rounded ${
                errors[index]?.email ? "border-red-500" : ""
              }`}
            />
            {errors[index]?.email && (
              <p className="text-red-600 text-sm">{errors[index].email}</p>
            )}
          </div>

          {/* FILE */}
          <input
            type="file"
            onChange={(e) =>
              handleFileChange(
                index,
                e.target.files ? e.target.files[0] : null
              )
            }
            className="border px-2 py-2 rounded bg-white"
          />

          {/* Remove button */}
          {members.length > 1 && (
            <button
              type="button"
              onClick={() => removeMember(index)}
              className="px-2 py-1 border rounded text-red-600"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      {/* Add + Submit */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={addMember}
          className="px-3 py-1 border rounded"
        >
          + Add Member
        </button>

        <button type="submit" className="px-3 py-1 border rounded">
          Submit
        </button>
      </div>
    </form>
  );
}
