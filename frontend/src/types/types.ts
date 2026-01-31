export type Employee = {
    id: null | number,
    profile_picture: string,
    employee_code: string,
    description: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    position: string,
    organizational_unit: string,
    approver: string,
    language: string,
    is_active: boolean,
    is_project_leader: boolean,
    is_project_approver: boolean,
    is_project_member: boolean,
}
export type Permission = {
    md_policy_view: boolean,
    kpi_alignment_view: boolean,
    // project permissions
    project_view: boolean,
    project_create: boolean,
    project_update: boolean,
    project_delete: boolean,
    // report permissions
    report_view: boolean,
    report_update: boolean,
    report_delete: boolean,
    // dashboard permissions
    dashboard_executive_view: boolean,
    dashboard_manager_view: boolean,
    dashboard_user_view: boolean,
    // admin permissions
    admin_view: boolean,
    // master data permissions
    cost_saving_type_view: boolean,
    cost_saving_type_create: boolean,
    cost_saving_type_update: boolean,
    cost_saving_type_delete: boolean,
    policy_view: boolean,
    policy_create: boolean,
    policy_update: boolean,
    policy_delete: boolean,
    kpi_view: boolean,
    kpi_create: boolean,
    kpi_update: boolean,
    kpi_delete: boolean,
    // organizational structure permissions
    organizational_unit_view: boolean,
    organizational_unit_create: boolean,
    organizational_unit_update: boolean,
    organizational_unit_delete: boolean,
    employee_view: boolean,
    employee_create: boolean,
    employee_update: boolean,
    employee_delete: boolean
}