export type Md_Policy = {
    id: number,
    policy_code: string,
    policy_name: string,
    year_target: number
}
export type Kpi = {
    id: number,
    kpi_code: string,
    kpi_name: string,
    unit: string,
    md_number: number
}

export type Employee_Project = {
    id: number,
    employee_code: string,
    first_name: string,
    last_name: string,
    is_project_leader: boolean,
    is_project_approver: boolean,
    is_project_member: boolean,
}

export type ProjectInfo = {
    project_id: string,
    project_name: string,
    md_policy: number | null,
    project_leader: string,
    project_org: string,
    start_date: string,
    end_date: string,
    step: 'Registed' | 'Submitted' | 'On Going' | 'Revision' | 'Closure' | 'Completed' | 'Cancelled',
    status: null | 'On Plan' | 'Potential Delay' | 'Delayed',
    // For Revise
    end_date_rev: string,
    opportunity_statement: string,
    est_investment: number,
    // For Revise
    est_investment_rev: number,
    est_gross_earnings: number,
    payback_period_year: number,
    return_on_investment: number,
    project_approver: string,
    grade_quality: string,
    grade_reason: string
}

