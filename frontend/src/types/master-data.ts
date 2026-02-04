export type KpiMaster = {
    id: number,
    policy_code: string,
    policy_name: string,
    description: string
    unit: string,
    is_active: boolean
}

export type PolicyMaster = {
    id: number,
    kpi_code: string,
    kpi_name: string,
    description: string
    unit: string,
    is_active: boolean
}