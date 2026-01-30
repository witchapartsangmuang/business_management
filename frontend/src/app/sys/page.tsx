'use client'

import { useEffect, useState } from "react";

type RegisterForm = {
    email: string;
    password: string;
    confirmPassword: string | null;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    role: string| null;
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
            confirmPassword: null,
            firstName: null,
            lastName: null,
            phone: null,
            role: null
        })
    const [error, seterror] = useState({
        email: "",
        password: "",
    })
    function onChangeValue(field: keyof RegisterForm, value: string) {
        setformValue((prev) => ({ ...prev, [field]: value }));
    }

    function validateForm() {
        let error = 1
        if (!formValue.email) {
            seterror((prev) => ({ ...prev, email: "Email is required." }));
            error = 0
        } else {
            seterror((prev) => ({ ...prev, email: "" }));
        }
        if (!formValue.password) {
            seterror((prev) => ({ ...prev, password: "Password is required." }));
            error = 0
        } else {
            seterror((prev) => ({ ...prev, password: "" }));
        }
        return error;
    }


    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("formValue", formValue);
        if (!validateForm()) {
            return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formValue),
        });

    }
    return (
        <div className="bg-white shadow rounded p-6 mx-auto my-10 max-w-3xl">
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 mt-3 px-3">
                        <label className="form-label" htmlFor="email">Email<span className="ml-1 text-red-500">*</span></label>
                        <input className={`form-input ${error.email ? "border-red-500" : ""}`} type="text" id="email" name="email" value={formValue.email} onChange={(e) => onChangeValue("email", e.target.value)} />
                        <p className={`text-red-600 text-sm mt-1 ${error.email === "" && "hidden"}`}>{error.email}</p>
                    </div>
                    <div className="col-span-12 mt-3 px-3">
                        <label className="form-label" htmlFor="password">Password<span className="ml-1 text-red-500">*</span></label>
                        <input className={`form-input ${error.password ? "border-red-500" : ""}`} type="password" id="password" name="password" value={formValue.password} onChange={(e) => onChangeValue("password", e.target.value)} />
                        <p className={`text-red-600 text-sm mt-1 ${error.password === "" && "hidden"}`}>{error.password}</p>
                    </div>

                    <div className="col-span-12 mt-6 px-3">
                        <button className="primary-button" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}