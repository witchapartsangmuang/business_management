import { Employee } from "./types";

export type FieldError = {
    valid_status: boolean;
    errorText: string;
};
// Validate for Employee
export type ValidateEmployeeField = | keyof Pick<Employee, "emp_code" | "first_name" | "last_name" | "email" | "password"> | "confirmPassword";
export type ValidateEmployeeError = Record<ValidateEmployeeField, FieldError>;