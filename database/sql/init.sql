CREATE TABLE IF NOT EXISTS policy (
	id SERIAL PRIMARY KEY,
	policy_code VARCHAR(100),
	policy_name VARCHAR(100),
	description VARCHAR(200),
	is_active BOOLEAN,
	created_by INT,
    created_datetime TIMESTAMP,
	updated_by INT,
    updated_datetime TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kpi (
	id SERIAL PRIMARY KEY,
	kpi_code VARCHAR(100),
	kpi_name VARCHAR(100),
	unit VARCHAR(100),
	description VARCHAR(200),
	is_active BOOLEAN,
	created_by INT,
    created_datetime TIMESTAMP,
	updated_by INT,
    updated_datetime TIMESTAMP
);


CREATE TABLE IF NOT EXISTS organization_structure_level (
	id SERIAL PRIMARY KEY,
	org_level_name VARCHAR(100),
	level INT,
	created_by INT,
    created_datetime TIMESTAMP,
	updated_by INT,
    updated_datetime TIMESTAMP
);

CREATE TABLE IF NOT EXISTS organization_structure (
	id SERIAL PRIMARY KEY,
	org_code VARCHAR(100),
	org_name VARCHAR(100),
	org_level INT,
	parent_org_id INT,
	path VARCHAR(100),
	created_by INT,
    created_datetime TIMESTAMP,
	updated_by INT,
    updated_datetime TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee (
    id SERIAL PRIMARY KEY,
	profile_picture VARCHAR(100),
	emp_code VARCHAR(100) NOT NULL UNIQUE,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	description VARCHAR(500),
    email VARCHAR(100) NOT NULL UNIQUE,
	phone VARCHAR(10),
    password VARCHAR(100) NOT NULL,
	organizational_unit VARCHAR(100),
	position VARCHAR(100),
	report_to INT,
	is_active BOOLEAN,
	is_project_leader BOOLEAN,
	is_project_approver BOOLEAN,
	is_project_member BOOLEAN,
	created_by INT,
    created_datetime TIMESTAMP,
	updated_by INT,
    updated_datetime TIMESTAMP
);

CREATE TABLE IF NOT EXISTS permission (
    id SERIAL PRIMARY KEY,
	data_scope VARCHAR(100),
	md_policy_view BOOLEAN,
	kpi_alignment_view BOOLEAN,
	project_view BOOLEAN,
	project_create BOOLEAN,
	project_update BOOLEAN,
	project_delete BOOLEAN,
	report_view BOOLEAN,
	report_update BOOLEAN,
	report_delete BOOLEAN,
	dashboard_executive_view BOOLEAN,
	dashboard_manager_view BOOLEAN,
	dashboard_user_view BOOLEAN,
	admin_view BOOLEAN,
	cost_saving_type_view BOOLEAN,
	cost_saving_type_create BOOLEAN,
	cost_saving_type_update BOOLEAN,
	cost_saving_type_delete BOOLEAN,
	policy_view BOOLEAN,
	policy_create BOOLEAN,
	policy_update BOOLEAN,
	policy_delete BOOLEAN,
	kpi_view BOOLEAN,
	kpi_create BOOLEAN,
	kpi_update BOOLEAN,
	kpi_delete BOOLEAN,
	organizational_unit_view BOOLEAN,
	organizational_unit_create BOOLEAN,
	organizational_unit_update BOOLEAN,
	organizational_unit_delete BOOLEAN,
	employee_view BOOLEAN,
	employee_create BOOLEAN,
	employee_update BOOLEAN,
	employee_delete BOOLEAN,
	permission_for INT
);

