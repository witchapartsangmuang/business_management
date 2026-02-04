// src/services/kpiService.ts
import axios, { AxiosError } from "axios";

export type KPIInfo = {
  id: string;
  code: string;
  name: string;
  description: string;
  unit: string;
};

// แนะนำทำ axios instance แยก เพื่อใส่ baseURL + token/interceptor ในอนาคต
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "", // เช่น "https://your-domain.com"
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// (optional) helper สำหรับโยน error ให้สวยขึ้น
function throwAxiosError(err: unknown): never {
  const e = err as AxiosError<any>;
  const msg =
    e.response?.data?.message ||
    e.response?.data?.error ||
    e.message ||
    "Request failed";
  throw new Error(msg);
}

const KPI_ENDPOINT = "/api/kpis";

export const kpiService = {
  // READ ALL: GET /api/kpis
  async readAll(params?: {
    q?: string; // search
    page?: number;
    limit?: number;
    sortBy?: keyof KPIInfo;
    sortDir?: "asc" | "desc";
  }): Promise<KPIInfo[]> {
    try {
      const res = await api.get<KPIInfo[]>(KPI_ENDPOINT, { params });
      return res.data;
    } catch (err) {
      throwAxiosError(err);
    }
  },

  // READ DETAIL: GET /api/kpis/:id
  async readDetail(id: string): Promise<KPIInfo> {
    try {
      const res = await api.get<KPIInfo>(`${KPI_ENDPOINT}/${encodeURIComponent(id)}`);
      return res.data;
    } catch (err) {
      throwAxiosError(err);
    }
  },

  // CREATE: POST /api/kpis
  // ปกติ create ไม่ต้องส่ง id (ให้ backend gen) แต่ถ้าของคุณต้องส่ง id ก็เอาออกจาก Omit ได้
  async create(payload: Omit<KPIInfo, "id"> & { id?: string }): Promise<KPIInfo> {
    try {
      const res = await api.post<KPIInfo>(KPI_ENDPOINT, payload);
      return res.data;
    } catch (err) {
      throwAxiosError(err);
    }
  },

  // UPDATE: PUT /api/kpis/:id
  async update(id: string, payload: Partial<Omit<KPIInfo, "id">>): Promise<KPIInfo> {
    try {
      const res = await api.put<KPIInfo>(
        `${KPI_ENDPOINT}/${encodeURIComponent(id)}`,
        payload
      );
      return res.data;
    } catch (err) {
      throwAxiosError(err);
    }
  },

  // DELETE: DELETE /api/kpis/:id
  async remove(id: string): Promise<{ success: boolean }> {
    try {
      const res = await api.delete<{ success: boolean }>(
        `${KPI_ENDPOINT}/${encodeURIComponent(id)}`
      );
      return res.data;
    } catch (err) {
      throwAxiosError(err);
    }
  },
};
