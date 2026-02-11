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
        md_policy_view: false,
        kpi_alignment_view: false,
        project_view: false,
        project_create: false,
        project_update: false,
        project_delete: false,
        report_view: false,
        report_update: false,
        report_delete: false,
        dashboard_executive_view: false,
        dashboard_manager_view: false,
        dashboard_user_view: false,
        admin_view: false,
        cost_saving_type_view: false,
        cost_saving_type_create: false,
        cost_saving_type_update: false,
        cost_saving_type_delete: false,
        policy_view: false,
        policy_create: false,
        policy_update: false,
        policy_delete: false,
        kpi_view: false,
        kpi_create: false,
        kpi_update: false,
        kpi_delete: false,
        organizational_unit_view: false,
        organizational_unit_create: false,
        organizational_unit_update: false,
        organizational_unit_delete: false,
        employee_view: false,
        employee_create: false,
        employee_update: false,
        employee_delete: false,
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