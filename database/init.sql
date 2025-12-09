-- ใช้ DB เป้าหมาย
\c business_management_database;

-- แนะนำใช้ชื่อ table ว่า users (เพราะ user เป็น keyword)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	phone VARCHAR(10),
    role VARCHAR(50) NOT NULL,
	is_project_leader BOOLEAN,
	is_approver BOOLEAN,
	is_team_member BOOLEAN,
	is_project_sponsor BOOLEAN,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS capability (
    id SERIAL PRIMARY KEY,
	group_name VARCHAR(50),
	strategy_read BOOLEAN,
	strategy_create BOOLEAN,
	strategy_update BOOLEAN,
	strategy_delete BOOLEAN,
	kpi_read BOOLEAN,
	kpi_create BOOLEAN,
	kpi_update BOOLEAN,
	kpi_delete BOOLEAN,
	executive_dashboard_read BOOLEAN,
	manager_dashboard_read BOOLEAN,
	user_dashboard_read BOOLEAN,
	project_report_read BOOLEAN,
	idea_report_read BOOLEAN,
	inspiration BOOLEAN,
	knowledge_management_read BOOLEAN,
	admin_page BOOLEAN

);

