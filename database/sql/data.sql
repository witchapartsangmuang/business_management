INSERT INTO policy (policy_code, policy_name, description, is_active, created_by, created_datetime, updated_by, updated_datetime)
VALUES
()


	

INSERT INTO  (kpi_code, kpi_name, unit, description, is_active, created_by, created_datetime, updated_by, updated_datetime)
VALUES
()


INSERT INTO organization_structure_level (org_level_name, level, created_by, created_datetime, updated_by, updated_datetime)
VALUES
('Company', 1, null, null, null, null),
('Business Unit', 2, null, null, null, null),
('Division', 3, null, null, null, null),
('Department', 4, null, null, null, null),
('Section', 5, null, null, null, null);

INSERT INTO organization_structure_level (org_code, org_name, org_level, parent_org_id, path, created_by, created_datetime, updated_by, updated_datetime)
VALUES
('Com-A', 'Company A', 1, '1', null, null, null),
('Com-B', 'Company B', 1, '2', null, null, null),
('Bu-A', 'Business A', 2, 1, '1.3', null, null),
('Div-A', 'Division A', 3, 3, '1.3.4', null, null),
('Dep-A', 'Department A', 4, 4, '1.3.4.5', null, null),
('Dep-B', 'Department B', 4, 4, '1.3.4.6', null, null),
('Sec-A', 5, 5, '1.3.4.5.7', null, null);

INSERT INTO employee (profile_picture, emp_code, first_name, last_name, desription, email, phone, password, organizational_unit, position, report_to, language, is_active, is_project_leader, is_approver, is_team_member, created_by, created_datetime, updated_by, updated_datetime)
VALUES
('emp1.jpg', 'EMP-001', 'Fifa', 'Wisdom', 'Department Manager', 'fifa@company.com', '0811111111', 'hashed_pwd_1', 'Digital Platform', 'Department Manager', NULL, 'TH', TRUE, TRUE, TRUE, FALSE, null, CURRENT_TIMESTAMP, null, CURRENT_TIMESTAMP),
('emp2.jpg', 'EMP-002', 'Nat', 'Leader', 'Project Lead', 'nat@company.com', '0822222222', 'hashed_pwd_2', 'Digital Platform', 'Project Lead', 1, 'TH', TRUE, TRUE, FALSE, TRUE, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
('emp3.jpg', 'EMP-003', 'Kiew', 'Manager', 'Operation Manager', 'kiew@company.com', '0833333333', 'hashed_pwd_3', 'Operation', 'Manager', 1, 'EN', TRUE, FALSE, TRUE, FALSE, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
('emp4.jpg', 'EMP-004', 'Boy', 'Officer', 'Project Officer', 'boy@company.com', '0844444444', 'hashed_pwd_4', 'Operation', 'Officer', 3, 'TH', TRUE, FALSE, FALSE, TRUE, 1, CURRENT_TIMESTAMP,1, CURRENT_TIMESTAMP),
('emp5.jpg', 'EMP-005', 'Ham', 'User', 'System User', 'ham@company.com', '0855555555', 'hashed_pwd_5', 'Support', 'Staff', 3, 'EN', TRUE, FALSE, FALSE, TRUE, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP);


INSERT INTO permission (md_policy_view, kpi_alignment_view, project_view, project_create, project_update, project_delete, report_view, report_update, report_delete, dashboard_executive_view, dashboard_manager_view, dashboard_user_view, admin_view, cost_saving_type_view, cost_saving_type_create, cost_saving_type_update, cost_saving_type_delete, policy_view, policy_create, policy_update, policy_delete, kpi_view, kpi_create, kpi_update, kpi_delete, organizational_unit_view, organizational_unit_create, organizational_unit_update, organizational_unit_delete, employee_view, employee_create, employee_update, employee_delete, permission_for)
VALUES
-- EMP-001 (Admin / Manager)
(TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 1),
-- EMP-002 (Project Lead)
(TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, 2),
-- EMP-003 (Manager)
(TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE, 3),
-- EMP-004 (Officer)
(FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, 4),
-- EMP-005 (User)
(FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, 5);
