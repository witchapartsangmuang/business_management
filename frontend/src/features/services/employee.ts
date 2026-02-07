import axios, { AxiosError } from "axios";
import { Employee, Permission } from "@/types/types";
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
})
const KPI_ENDPOINT = "/employee";

function throwAxiosError(err: unknown): never {
    const e = err as AxiosError<any>;
    const msg =
        e.response?.data?.message ||
        e.response?.data?.error ||
        e.message ||
        "Request failed";
    console.log("msg : ", msg);

    throw new Error(msg);
}
export const EmployeeService = {
    async readAll(): Promise<{ employee: Employee[] & Permission[] }> {
        try {
            const res = await api.get<{ employee: Employee[] & Permission[] }>(KPI_ENDPOINT);
            return res.data;
        } catch (err) {
            throwAxiosError(err);
        }
    },
    async readDetail(id: string): Promise<{ employee: Employee[] & Permission[] }> {
        try {
            const res = await api.get<{ employee: Employee[] & Permission[] }>(`${KPI_ENDPOINT}/${encodeURIComponent(id)}`);
            return res.data;
        } catch (err) {
            throwAxiosError(err);
        }
    },
    async create(payload: Omit<Employee, "id"> & { id?: string }): Promise<{ employee: Employee[] & Permission[] }> {
        try {
            const res = await api.post<{ employee: Employee[] & Permission[] }>(KPI_ENDPOINT, payload);
            return res.data;
        } catch (err) {
            throwAxiosError(err);
        }
    },
    async update(id: number, payload: Omit<Employee, "id"> & { id?: string }): Promise<{ employee: Employee[] & Permission[] }> {
        try {
            const res = await api.put<{ employee: Employee[] & Permission[] }>(`${KPI_ENDPOINT}/${encodeURIComponent(id)}`, payload);
            return res.data;
        } catch (err) {
            throwAxiosError(err);
        }
    },
}