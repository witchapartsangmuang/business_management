-- ใช้ DB เป้าหมาย
\c business_management_database;

-- แนะนำใช้ชื่อ table ว่า users (เพราะ user เป็น keyword)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS capability (
    id SERIAL PRIMARY KEY,
		user VARCHAR(50),
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
INSERT INTO capability (user, strategy_read, strategy_create, strategy_update, strategy_delete, kpi_read, kpi_create, kpi_update, kpi_delete, 
	executive_dashboard_read, manager_dashboard_read, user_dashboard_read, project_report_read, idea_report_read, inspiration, knowledge_management_read, admin_page)
	VALUES ('SuperAdminBM', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

INSERT INTO users (username, email, password_hash, role)
VALUES (
  'SuperAdminBM',
  'superadmin@example.com',
  'CHANGE_ME_TO_REAL_HASH',
  'super_admin'
)
ON CONFLICT (username) DO NOTHING;
