import axios, { AxiosError } from "axios";
import { PolicyMaster } from "@/types/master-data";
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
})
const KPI_ENDPOINT = "/policy";

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


export const policyMasterService = {
    async readAll(): Promise<{ policy: PolicyMaster[] }> {
        try {
            console.log("res");
            
            const res = await api.get<{ policy: PolicyMaster[] }>(KPI_ENDPOINT);
            return res.data;
        } catch (err) {
            throwAxiosError(err);
        }
    },
    async create(payload: PolicyMaster): Promise<PolicyMaster> {
        try {
            const res = await api.post<PolicyMaster>(KPI_ENDPOINT, payload);
            return res.data;
        } catch (err) {
            throwAxiosError(err);
        }
    },
    async update(id: string, payload: Partial<Omit<PolicyMaster, "id">>): Promise<PolicyMaster> {
        try {
            const res = await api.put<PolicyMaster>(`${KPI_ENDPOINT}/${encodeURIComponent(id)}`, payload);
            return res.data;
        } catch (err) {
            throwAxiosError(err);
        }
    },
    async remove(id: string): Promise<void> {
        try {
            const res = await api.delete<void>(
                `${KPI_ENDPOINT}/${encodeURIComponent(id)}`
            );
            return res.data;
        } catch (err) {
            throwAxiosError(err);
        }
    },
}