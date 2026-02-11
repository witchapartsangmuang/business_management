"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Label from "@/components/input/Label";
import InputPassword from "@/components/input/InputPassword";
import { isApiError, ValidateLoginError } from "@/types/validate-types";
import Input from "@/components/input/Input";
import { AuthService } from "@/features/services/auth";
import Modal from "@/components/Modal";
import { useDispatch } from "react-redux";
import { setUserAccessToken, setUserPermission, setUserProfile } from "@/store/userProfileSlice";


export default function LoginPage() {
	const router = useRouter();
	const dispatch = useDispatch()
	const [email, setemail] = useState<string>("")
	const [password, setpassword] = useState<string>("")
	const [loading, setLoading] = useState(false);
	const [validateErrorModalOpen, setvalidateErrorModalOpen] = useState(false)
	const [validateFieldError, setvalidateFieldError] = useState<ValidateLoginError>({
		email: {
			valid_status: true,
			errorText: ''
		},
		password: {
			valid_status: true,
			errorText: ''
		}
	})
	function validateData() {
		let validateStatus = true;
		const errorList: ValidateLoginError = { ...validateFieldError };
		// email
		if (email.trim() === "") {
			errorList.email = { valid_status: false, errorText: "Please enter the email." };
			validateStatus = false;
		} else {
			errorList.email = { valid_status: true, errorText: "" };
		}
		// password
		if (password.trim() === "") {
			errorList.password = { valid_status: false, errorText: "Please enter the password." };
			validateStatus = false;
		} else {
			errorList.password = { valid_status: true, errorText: "" };
		}
		setvalidateFieldError(errorList);
		return validateStatus
	}

	async function handleSubmit() {
		if (validateData()) {
			setLoading(true);
			try {
				const res = await AuthService.login({ email, password })
				const { employee, permission, token } = res
				dispatch(setUserProfile(employee))
				dispatch(setUserPermission(permission))
				dispatch(setUserAccessToken(token))
				router.push("/")
			} catch (err) {
				if (isApiError(err)) {
					console.log(err);
					if (err.status === 401) {
						setvalidateErrorModalOpen(true)
					}
				}
			}
			setLoading(false);
		} else {
			setvalidateErrorModalOpen(true)
		}
	}

	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
				<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-8">
					<div className="text-center space-y-2">
						<h1 className="text-2xl font-semibold text-slate-800">เข้าสู่ระบบ</h1>
						<p className="text-sm text-slate-500">กรุณากรอกอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ</p>
					</div>
					<div className="grid grid-cols-12">
						<div className="col-span-12 mt-3 px-3">
							<Label title="Email" htmlFor="email" require />
							<Input
								value={email}
								error={!validateFieldError.email.valid_status}
								onFocus={() => { setvalidateFieldError({ ...validateFieldError, email: { valid_status: true, errorText: '' } }) }}
								onChange={(e) => { setemail(e.target.value) }} />
							{validateFieldError.email.errorText !== '' && <p className="pt-1 pl-1 whitespace-nowrap text-red-500">{validateFieldError.email.errorText}</p>}
						</div>
						<div className="col-span-12 mt-3 px-3">
							<Label title="Password" htmlFor="password" require />
							<InputPassword
								value={password}
								error={!validateFieldError.password.valid_status}
								onFocus={() => { setvalidateFieldError({ ...validateFieldError, password: { valid_status: true, errorText: '' } }) }}
								onChange={(e) => { setpassword(e.target.value) }} />
							{validateFieldError.password.errorText !== '' && <p className="pt-1 pl-1 whitespace-nowrap text-red-500">{validateFieldError.password.errorText}</p>}
						</div>
						<div className="col-span-12 mt-6 px-3">
							<button
								disabled={loading}
								className="primary-button"
								onClick={handleSubmit}
							>
								{loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
							</button>
						</div>
					</div>
				</div>
			</div>
			<Modal title="Login Failed!" isOpen={validateErrorModalOpen} onClose={() => { setvalidateErrorModalOpen(false) }}>
				<p>Login Failed!</p>
			</Modal>
		</>
	);
}
