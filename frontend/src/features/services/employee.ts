import axios, { AxiosError } from "axios";
import { Employee, Permission } from "@/types/types";
import { ApiError } from "@/types/validate-types";
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
})
const KPI_ENDPOINT = "/employee";

export const EmployeeService = {
    async readAll(): Promise<{ employee: Employee[] & Permission[] }> {
        try {
            const res = await api.get<{ employee: Employee[] & Permission[] }>(KPI_ENDPOINT);
            return res.data;
        } catch (err) {
            const e = err as AxiosError;
            throw {
                status: e.response?.status ?? 500,
                data: e.response?.data ?? { message: "Unexpected error" },
            };
        }
    },
    async readDetail(id: number) {
        try {
            const res = await api.get<{ employee: Omit<Employee, "password">, permission: Permission }>(`${KPI_ENDPOINT}/${encodeURIComponent(id)}`);
            return res.data;
        } catch (err) {
            const e = err as AxiosError;
            throw {
                status: e.response?.status ?? 500,
                data: e.response?.data ?? { message: "Unexpected error" },
            };
        }
    },
    async create(payload: { employee: Omit<Employee, "id">, permission: Omit<Permission, "id"> }): Promise<{ employee: Employee; permission: Permission }> {
        try {
            const res = await api.post<{ employee: Employee; permission: Permission }>(KPI_ENDPOINT, payload);
            return res.data;
        } catch (err) {
            const e = err as AxiosError;
            throw <ApiError>{
                status: e.response?.status ?? 500,
                data: e.response?.data ?? { message: "Unexpected error" },
            };
        }
    },
    async update(id: number, payload: { employee: Omit<Employee, "id" | "password">, permission: Permission }): Promise<{ employee: Omit<Employee, "password">, permission: Permission }> {
        try {
            const res = await api.put<{ employee: Omit<Employee, "password">, permission: Permission }>(`${KPI_ENDPOINT}/${encodeURIComponent(id)}`, payload);
            return res.data;
        } catch (err) {
            const e = err as AxiosError;
            throw {
                status: e.response?.status ?? 500,
                data: e.response?.data ?? { message: "Unexpected error" },
            };
        }
    },
    async changePassword(id: number, payload: { password: string, confirm_password: string }) {
        try {
            const res = await api.post<{ employee: Employee, permission: Permission }>(`${KPI_ENDPOINT}/${encodeURIComponent(id)}`, payload);
            return res.data;
        } catch (err) {
            const e = err as AxiosError;
            throw {
                status: e.response?.status ?? 500,
                data: e.response?.data ?? { message: "Unexpected error" },
            };
        }
    }
}