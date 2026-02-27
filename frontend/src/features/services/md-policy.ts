import axios, { AxiosError } from "axios";
import { Md_Policy } from "@/types/types";
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
    async readAll(): Promise<{ md_policy: Md_Policy[] }> {
        try {
            const res = await api.get<{ md_policy: Md_Policy[] }>(KPI_ENDPOINT);
            return res.data;
        } catch (err) {
            throwAxiosError(err);
        }
    },
}