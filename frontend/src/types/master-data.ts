export type PolicyMaster = {
    id: number | null,
    policy_code: string,
    policy_name: string,
    description: string
    unit: string,
    is_active: boolean
}

export type KpiMaster = {
    id: number | null,
    kpi_code: string,
    kpi_name: string,
    description: string
    unit: string,
    is_active: boolean
}