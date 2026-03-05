import axios, { AxiosError } from "axios";
import { MdPolicy, MdPolicyKpi } from "@/types/types";
import { ApiError } from "@/types/validate-types";
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
})
const KPI_ENDPOINT = "/kpi";

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

export const mdPolicyService = {
    async readAll(): Promise<{ mdpolicyList: MdPolicy[] }> {
        try {
            const res = await api.get<{ mdpolicyList: MdPolicy[] }>(KPI_ENDPOINT);
            return res.data;
        } catch (err) {
            throwAxiosError(err);
        }
    },
    async readDetail(id: number): Promise<{ mdPolicyInfo: MdPolicy, mdpolicyKpiList: MdPolicyKpi[] }> {
        try {
            const res = await api.get<{ mdPolicyInfo: MdPolicy, mdpolicyKpiList: MdPolicyKpi[] }>(`${KPI_ENDPOINT}/${encodeURIComponent(id)}`);
            return res.data;
        } catch (err) {
            const e = err as AxiosError;
            throw {
                status: e.response?.status ?? 500,
                data: e.response?.data ?? { message: "Unexpected error" },
            };
        }
    },
    async create(data: Omit<MdPolicy, "id">): Promise<{ md_policy: MdPolicy }> {
        try {
            const res = await api.post<{ md_policy: MdPolicy }>(KPI_ENDPOINT, data);
            return res.data;
        } catch (err) {
            throwAxiosError(err);
        }
    },
    async update(id: number, data: Omit<MdPolicy, "id">): Promise<{ md_policy: MdPolicy }> {
        try {
            const res = await api.put<{ md_policy: MdPolicy }>(`${KPI_ENDPOINT}/${encodeURIComponent(id)}`, data);
            return res.data;
        } catch (err) {
            throwAxiosError(err);
        }
    },
    async delete(id: number): Promise<void> {
        try {
            await api.delete(`${KPI_ENDPOINT}/${encodeURIComponent(id)}`);
        } catch (err) {
            throwAxiosError(err);
        }
    }
}