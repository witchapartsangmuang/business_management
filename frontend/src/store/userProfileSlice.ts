import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Employee, Permission } from '@/types/types'

const initialState: { userProfile: Omit<Employee, 'password'>, userPermission: Permission, accessToken: string } = {
    userProfile: {
        id: null,
        profile_picture: null,
        emp_code: '',
        description: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        position: '',
        organizational_unit: null,
        report_to: null,
        is_active: true,
        is_project_leader: true,
        is_project_approver: true,
        is_project_member: true,
        created_by: null,
        created_datetime: null,
        updated_by: null,
        updated_datetime: null
    },
    userPermission: {
        id: null,
        md_policy_view: true,
        kpi_alignment_view: true,
        project_view: true,
        project_create: true,
        project_update: true,
        project_delete: true,
        report_view: true,
        report_update: true,
        report_delete: true,
        dashboard_view: true,
        dashboard_executive_view: true,
        dashboard_manager_view: true,
        dashboard_user_view: true,
        admin_view: true,
        cost_saving_type_view: true,
        cost_saving_type_create: true,
        cost_saving_type_update: true,
        cost_saving_type_delete: true,
        policy_view: true,
        policy_create: true,
        policy_update: true,
        policy_delete: true,
        kpi_view: true,
        kpi_create: true,
        kpi_update: true,
        kpi_delete: true,
        organizational_unit_view: true,
        organizational_unit_create: true,
        organizational_unit_update: true,
        organizational_unit_delete: true,
        employee_view: true,
        employee_create: true,
        employee_update: true,
        employee_delete: true,
        permission_for: null
    },
    accessToken: ""
}

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<Omit<Employee, 'password'>>) => {
            state.userProfile = action.payload
        },
        setUserPermission: (state, action: PayloadAction<Permission>) => {
            state.userPermission = action.payload
        },
        setUserAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUserProfile, setUserPermission, setUserAccessToken } = userSlice.actions

export default userSlice.reducer