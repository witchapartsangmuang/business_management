'use client'

import { useEffect, useState } from "react";

type RegisterForm = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
};
type RegisterFormError = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: string;
};


export default function RegisterPage() {
    const [formValue, setformValue] = useState<RegisterForm>({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phone: "",
        role: ""
    })
    const [error, seterror] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phone: "",
        role: ""
    })
    function onChangeValue(field: keyof RegisterForm, value: string) {
        setformValue((prev) => ({ ...prev, [field]: value }));
    }

    function validateForm() {
        return true
    }
    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("formValue", formValue);

        if (!validateForm()) {
            alert("Please complete required fields.");
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formValue),
        });

    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 mt-3 px-3">
                        <label className="form-label" htmlFor="email">Email<span className="ml-1 text-red-500">*</span></label>
                        <input className={`form-input ${error.email ? "border-red-500" : ""}`} type="text" id="email" name="email" value={formValue.email} onChange={(e) => onChangeValue("email", e.target.value)} />
                        <p className={`text-red-600 text-sm mt-1 ${error.email === "" && "hidden"}`}>{error.email}</p>
                    </div>
                    <div className="col-span-6 mt-3 px-3">
                        <label className="form-label" htmlFor="password">Password<span className="ml-1 text-red-500">*</span></label>
                        <input className={`form-input ${error.password ? "border-red-500" : ""}`} type="password" id="password" name="password" value={formValue.password} onChange={(e) => onChangeValue("password", e.target.value)} />
                        <p className={`text-red-600 text-sm mt-1 ${error.password === "" && "hidden"}`}>{error.password}</p>
                    </div>
                    <div className="col-span-6 mt-3 px-3">
                        <label className="form-label" htmlFor="">Confirm Password<span className="ml-1 text-red-500">*</span></label>
                        <input className={`form-input ${error.confirmPassword ? "border-red-500" : ""}`} type="password" id="confirmPassword" name="confirmPassword" value={formValue.confirmPassword} onChange={(e) => onChangeValue("confirmPassword", e.target.value)} />
                        <p className={`text-red-600 text-sm mt-1 ${error.confirmPassword === "" && "hidden"}`}>{error.confirmPassword}</p>
                    </div>
                    <div className="col-span-6 mt-3 px-3">
                        <label className="form-label" htmlFor="firstName">First Name<span className="ml-1 text-red-500">*</span></label>
                        <input className={`form-input ${error.firstName ? "border-red-500" : ""}`} type="text" id="firstName" name="firstName" value={formValue.firstName} onChange={(e) => onChangeValue("firstName", e.target.value)} />
                        <p className={`text-red-600 text-sm mt-1 ${error.firstName === "" && "hidden"}`}>{error.firstName}</p>
                    </div>
                    <div className="col-span-6 mt-3 px-3">
                        <label className="form-label" htmlFor="lastName">Last Name<span className="ml-1 text-red-500">*</span></label>
                        <input className={`form-input ${error.lastName ? "border-red-500" : ""}`} type="text" id="lastName" name="lastName" value={formValue.lastName} onChange={(e) => onChangeValue("lastName", e.target.value)} />
                        <p className={`text-red-600 text-sm mt-1 ${error.lastName === "" && "hidden"}`}>{error.lastName}</p>
                    </div>
                    <div className="col-span-6 mt-3 px-3">
                        <label className="form-label" htmlFor="phone">Phone<span className="ml-1 text-red-500">*</span></label>
                        <input className={`form-input ${error.phone ? "border-red-500" : ""}`} type="text" id="phone" name="phone" value={formValue.phone} onChange={(e) => onChangeValue("phone", e.target.value)} />
                        <p className={`text-red-600 text-sm mt-1 ${error.phone === "" && "hidden"}`}>{error.phone}</p>
                    </div>
                    <div className="col-span-6 mt-3 px-3">
                        <label className="form-label" htmlFor="role">Role<span className="ml-1 text-red-500">*</span></label>
                        <select className={`form-select ${error.role ? "border-red-500" : ""}`} id="role" name="role" value={formValue.role} onChange={(e) => onChangeValue("role", e.target.value)}>
                            <option className="hidden" value="">-- select --</option>
                            <option value="Super Admin">Super Admin</option>
                            <option value="Corporate Admin">Corporate Admin</option>
                        </select>
                        <p className={`text-red-600 text-sm mt-1 ${error.role === "" && "hidden"}`}>{error.role}</p>
                    </div>
                    <div className="col-span-12 mt-3 px-3">
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}