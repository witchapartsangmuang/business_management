import { Employee } from "./types";

export const isApiError = (err: unknown): err is ApiError => {
	return (
		typeof err === "object" &&
		err !== null &&
		"status" in err &&
		"data" in err
	);
}

export type BackendDuplicateError = {
	code: string;
	fields: string[];
	message: string;
}

export type ApiError<T = any> = {
	status: number;
	data: T;
}

export type FieldError = {
	valid_status: boolean;
	errorText: string;
};
// Validate for Login
export type ValidateLoginError = { [key: number | string]: FieldError, email: FieldError, password: FieldError }
// Validate for Employee
export type ValidateEmployeeField = | keyof Pick<Employee, "emp_code" | "first_name" | "last_name" | "email" | "password" | "organizational_unit"> | "confirmPassword";
export type ValidateEmployeeError = { [key: number | string]: FieldError } & Record<ValidateEmployeeField, FieldError>;
