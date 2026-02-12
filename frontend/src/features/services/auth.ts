import axios, { AxiosError } from "axios";
import { Login, Employee, Permission } from "@/types/types";
import { ApiError } from "@/types/validate-types";
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
})
const KPI_ENDPOINT = "/auth";

export const AuthService = {
    async login(payload: Login): Promise<{ token: string, employee: Employee; permission: Permission }> {
        try {
            const res = await api.post<{ token: string, employee: Employee; permission: Permission }>(`${KPI_ENDPOINT}/login`, payload);
            console.log(res, ' : login res');

            return res.data;
        } catch (err) {
            const e = err as AxiosError;
            throw <ApiError>{
                status: e.response?.status ?? 500,
                data: e.response?.data ?? { message: "Unexpected error" },
            };
        }
    },
    async refresh(): Promise<{ token: string, employee: Employee; permission: Permission }> {
        try {
            const res = await api.post<{ token: string, employee: Employee; permission: Permission }>(`${KPI_ENDPOINT}/refresh`);
            console.log(res, ' : login res');
            return res.data;
        } catch (err) {
            const e = err as AxiosError;
            throw <ApiError>{
                status: e.response?.status ?? 500,
                data: e.response?.data ?? { message: "Unexpected error" },
            };
        }
    }
}