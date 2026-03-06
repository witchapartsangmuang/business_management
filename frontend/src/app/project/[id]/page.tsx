'use client'
import SearchSelect from "@/components/input/SearchSelect";
import { useMemo, useState, useEffect, act } from "react";

import { Kpi, Employee_Project, ProjectInfo, Strategic, StrategicMaster, ProjectActivity } from "@/types/types";
import { Table, Tbody, Thead, TableWrapper, TrHead, Th, TrBody, Td } from "@/components/table/Table";
import Label from "@/components/input/Label";
import Input from "@/components/input/Input";
import Select from "@/components/input/Select";
import Textarea from "@/components/input/Textarea";

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

const monthObjList: MonthObj[] = [
	{
		id: 0,
		project_no: "PRJ001",
		month: "2025-02",
		plan: 0,
		actual: 0,
		status: "draft",
		is_deleted: false,
		created_by: null,
		created_datetime: null,
		updated_by: null,
		updated_datetime: null
	}
]


// Start Data List For Select
const strategic_by_year_list: (Strategic & Pick<StrategicMaster, "strategic_code" | "strategic_name">)[] = [
	{ id: 1, strategic_code: 'SD&SG', strategic_name: 'Strategic Direction & Sustainable Growth Policy', year_target: 2026, strategic_master_id: 1, is_active: true, is_deleted: false, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null },
	{ id: 2, strategic_code: 'PRM', strategic_name: 'Performance & Result-Oriented Management Policy', year_target: 2026, strategic_master_id: 2, is_active: true, is_deleted: false, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null },
	{ id: 3, strategic_code: 'PLS', strategic_name: 'People, Leadership & Successor Development Policy', year_target: 2026, strategic_master_id: 3, is_active: true, is_deleted: false, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null },
	{ id: 4, strategic_code: 'PE&CE', strategic_name: 'Process Excellence & Cost Efficiency Policy', year_target: 2026, strategic_master_id: 4, is_active: true, is_deleted: false, created_by: null, created_datetime: null, updated_by: null, updated_datetime: null },
]

const kpi_list: Kpi[] = [
	{ id: 1, kpi_code: 'SOAR', kpi_name: 'Strategic Objective Achievement Rate', unit: '%', md_number: 1 },
	{ id: 4, kpi_code: 'CRPI', kpi_name: 'Cost Reduction from Process Improvement', unit: 'MB', md_number: 4 },
	{ id: 6, kpi_code: 'MCRI', kpi_name: 'Major Compliance & Risk Incident', unit: 'Case', md_number: 6 },
	{ id: 7, kpi_code: 'CSI', kpi_name: 'Customer Satisfaction Index (CSI)', unit: 'Score', md_number: 7 },
]

const employee_list: Employee_Project[] = [
	{ id: 1, emp_code: 'EMP001', first_name: 'Witchapart', last_name: 'Sangmuang', is_project_leader: true, is_project_approver: false, is_project_member: true },
	{ id: 2, emp_code: 'EMP002', first_name: 'Aphiwit', last_name: 'Muangsang', is_project_leader: false, is_project_approver: true, is_project_member: true },
	{ id: 3, emp_code: 'EMP003', first_name: 'Sangya', last_name: 'Kanya', is_project_leader: true, is_project_approver: false, is_project_member: true },
]

function parseUSDateToYearMonth(mmddyyyy) {
	const [yyyy, mm, dd] = mmddyyyy.split("-").map(Number);
	if (!mm || !dd || !yyyy) throw new Error("Invalid date format. Use MM/DD/YYYY");
	return { y: yyyy, m: mm - 1 };
}


// Key for sorting: "YYYY-MM"
function formatKey(y, m) {
	const mm = String(m + 1).padStart(2, "0");
	return `${y}-${mm}`;
}
function buildMonthRange(startDate, endDate) {
	const s = parseUSDateToYearMonth(startDate);
	const e = parseUSDateToYearMonth(endDate);

	// Use first day of month UTC
	const cur = new Date(Date.UTC(s.y, s.m, 1));
	const end = new Date(Date.UTC(e.y, e.m, 1));

	// if (cur > end) throw new Error("start_date must be <= end_date");

	const result = [];

	while (cur <= end) {
		const y = cur.getUTCFullYear();
		const m = cur.getUTCMonth();

		result.push({
			month: formatKey(y, m),   // "2025-02"
			type: "Plan",                    // "Plan" (or "Actual")
			project_no: null
		});

		// Move to next month
		cur.setUTCMonth(cur.getUTCMonth() + 1);
	}

	return { result };
}
export default function ProjectPage() {
	// ✅ UseMemo กัน option ซ้ำ + ไม่ต้อง setState จาก useEffect
	const select_strategic_by_year_list = useMemo(
		() =>
			strategic_by_year_list.map((md) => ({
				value: String(md.id),
				label: `${md.policy_code} - ${md.policy_name} (${md.year_target})`,
			})),
		[]
	);

	const kpi_select_list = useMemo(() => {
		// คง logic เดิมของคุณ: filter kpi ที่ md_number มีอยู่ใน strategic_by_year_list
		const mdIds = new Set(strategic_by_year_list.map((m) => m.id));
		return kpi_list
			.filter((kpi) => mdIds.has(kpi.md_number))
			.map((kpi) => ({
				value: String(kpi.id),
				label: `${kpi.kpi_code} - ${kpi.kpi_name} (${kpi.unit})`,
			}));
	}, []);

	const other_benefit_select_list = useMemo(
		() =>
			kpi_list.map((kpi) => ({
				value: String(kpi.id),
				label: `${kpi.kpi_code} - ${kpi.kpi_name} (${kpi.unit})`,
			})),
		[]
	);

	const select_project_leader_list = useMemo(
		() =>
			employee_list
				.filter((emp) => emp.is_project_leader)
				.map((emp) => ({
					value: String(emp.id),
					label: `${emp.first_name} ${emp.last_name} (${emp.emp_code})`,
				})),
		[]
	);

	const select_project_approver_list = useMemo(
		() =>
			employee_list
				.filter((emp) => emp.is_project_approver)
				.map((emp) => ({
					value: String(emp.id),
					label: `${emp.first_name} ${emp.last_name} (${emp.emp_code})`,
				})),
		[]
	);

	const select_project_member_list = useMemo(
		() =>
			employee_list
				.filter((emp) => emp.is_project_member)
				.map((emp) => ({
					value: String(emp.id),
					label: `${emp.first_name} ${emp.last_name} (${emp.emp_code})`,
				})),
		[]
	);

	const [tabOpen, setTabOpen] = useState(0);

	const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
		project_id: '',
		project_name: '',
		strategic_alignment: 1,
		objective: '',
		solution: '',
		impact: '',
		scope: '',
		project_leader: '',
		project_org: '',
		plan_start_date: '',
		plan_end_date: '',
		step: 'Registed',
		status: null,
		// For Revise
		end_date_rev: '',
		opportunity_statement: '',
		est_investment: 0,
		// For Revise
		est_investment_rev: 0,
		est_gross_earnings: 0,
		payback_period_year: 0,
		return_on_investment: 0,
		project_approver: '',
		grade_quality: '',
		grade_reason: ''
	});

	const [activityList, setactivityList] = useState<ProjectActivity[]>([
		{
			id: crypto.randomUUID(),
			sequence: 1,
			activity_name: '',
			start_date: '',
			end_date: '',
			wegiht: 0,
			project_id: '',
			status: 'Not Started',
			responsible_person: null,
			activity_plan_month: []
		}
	])

	function onClickInsertActivity(sequence: number) {
		
	}
	useEffect(() => {
		if (projectInfo.plan_start_date && projectInfo.plan_end_date) {
			const { result } = buildMonthRange(projectInfo.plan_start_date, projectInfo.plan_end_date)
			console.log(result);
		}
	}, [projectInfo.plan_start_date, projectInfo.plan_end_date]);


	const [project_kpi_list, setproject_kpi_list] = useState<
		{ id: number | null, sequence: number, kpi_id: number | null, target: number | null, plan: any[], actual: any[] }[]
	>([
		{ id: null, sequence: 1, kpi_id: null, target: null, plan: [], actual: [] }
	]);

	function onClickInsertProjectKpi(sequence: number) {
		setproject_kpi_list([
			...project_kpi_list,
			{ id: null, sequence, kpi_id: null, target: 0, plan: [], actual: [] }
		]);
	}

	function onChangeProjectKpi(rowIndex: number, selectedKpi: number | null, target?: number) {
		const kpi_id = kpi_list.find((kpi) => kpi.id === selectedKpi)?.id || null;

		const updateKpi = project_kpi_list.map((projectKpi, index) => {
			if (rowIndex === index) {
				return { ...projectKpi, kpi_id, target: target !== undefined ? target : projectKpi.target };
			}
			return projectKpi;
		});

		setproject_kpi_list(updateKpi);
	}

	function onClickRemoveProjectKpi(sequenceToRemove: number) {
		let updateKpi = project_kpi_list.filter((kpi) => kpi.sequence !== sequenceToRemove);
		let number = 1;
		updateKpi = updateKpi.map((projectKpi) => {
			const kpiItem = { ...projectKpi, sequence: number };
			number += 1;
			return kpiItem;
		});
		setproject_kpi_list(updateKpi);
	}

	const [project_other_benefit_list, setproject_other_benefit_list] = useState<
		{ id: number | null, sequence: number, kpi_id: number | null, target: number | null, plan: any[], actual: any[] }[]
	>([
		{ id: null, sequence: 1, kpi_id: null, target: null, plan: [], actual: [] }
	]);

	function onClickInsertProjectOtherBenefit(sequence: number) {
		setproject_other_benefit_list([
			...project_other_benefit_list,
			{ id: null, sequence, kpi_id: null, target: 0, plan: [], actual: [] }
		]);
	}

	function onChangeProjectOtherBenefit(rowIndex: number, selectedKpi: number | null, target?: number) {
		const kpi_id = kpi_list.find((kpi) => kpi.id === selectedKpi)?.id || null;

		const updateKpi = project_other_benefit_list.map((projectKpi, index) => {
			if (rowIndex === index) {
				return { ...projectKpi, kpi_id, target: target !== undefined ? target : projectKpi.target };
			}
			return projectKpi;
		});

		setproject_other_benefit_list(updateKpi);
	}

	function onClickRemoveProjectOtherBenefit(sequenceToRemove: number) {
		let updateKpi = project_other_benefit_list.filter((kpi) => kpi.sequence !== sequenceToRemove);
		let number = 1;
		updateKpi = updateKpi.map((projectKpi) => {
			const kpiItem = { ...projectKpi, sequence: number };
			number += 1;
			return kpiItem;
		});
		setproject_other_benefit_list(updateKpi);
	}

	const [teamMember, setteamMember] = useState([
		{ sequence: 1, emp_no: "", empName: "", weight: 0, plan_start_date: "", end_date: "" }
	]);

	function onClickInsertTeamMember(sequence: number) {
		setteamMember([
			...teamMember,
			{ sequence, emp_no: "", empName: "", weight: 0, plan_start_date: "", end_date: "" }
		]);
	}

	// (Optional) ยังเก็บ log ของคุณไว้ แต่ list จะไม่ซ้ำแล้ว
	useEffect(() => {
		console.log(select_strategic_by_year_list, "select_strategic_by_year_list");
	}, [select_strategic_by_year_list]);

	useEffect(() => {
		console.log(select_project_leader_list, "select_project_leader_list");
		console.log(select_project_approver_list, "select_project_approver_list");
		console.log(select_project_member_list, "select_project_member_list");
	}, [select_project_leader_list, select_project_approver_list, select_project_member_list]);

	return (
		<>
			<ul className="flex bg-white rounded p-5 justify-center">
				<li className="text-center text-blue-700">Registered<span className="px-2">{'>'}</span></li>
				<li className="text-gray-400">Submitted for Approval<span className="px-2">{'>'}</span></li>
				<li className="text-gray-400">On Going<span className="px-2">{'>'}</span></li>
				<li className="text-gray-400">Submitted for Closure<span className="px-2">{'>'}</span></li>
				<li className="text-gray-400">Completed</li>
			</ul>

			<div className="flex mt-3">
				<ul className="flex px-2">
					<button className={`py-1.5 px-4 rounded-t ${tabOpen === 0 ? "bg-blue-500 text-white" : ""}`} onClick={() => { setTabOpen(0) }}>Information</button>
					<button className={`py-1.5 px-4 rounded-t ${tabOpen === 1 ? "bg-blue-500 text-white" : ""}`} onClick={() => { setTabOpen(1) }}>Benefits/Investment</button>
					<button className={`py-1.5 px-4 rounded-t ${tabOpen === 2 ? "bg-blue-500 text-white" : ""}`} onClick={() => { setTabOpen(2) }}>Team Member</button>
					<button className={`py-1.5 px-4 rounded-t ${tabOpen === 3 ? "bg-blue-500 text-white" : ""}`} onClick={() => { setTabOpen(3) }}>Project Plan</button>
				</ul>
			</div>

			<div className="bg-white rounded min-h-[calc(100vh-16rem)]">
				<div className="grid grid-cols-12">
					{tabOpen === 0 &&
						<>
							<div className="col-span-12 mt-3 px-3">
								<p className="text-2xl">Project Information</p>
							</div>
							<div className="col-span-6 mt-3 px-3">
								<Label title="Project No." htmlFor="id" />
								<Input id="id" value={projectInfo.project_id} readOnly />
							</div>
							<div className="col-span-6 mt-3 px-3">
								<Label title="Project Name" htmlFor="project_name" require />
								<Input
									type="text"
									id="project_name"
									value={projectInfo.project_name || ""}
									onChange={(e) => setProjectInfo({ ...projectInfo, project_name: e.target.value })}
								/>
							</div>
							<div className="col-span-6 mt-3 px-3">
								<Label title="Strategic Alignment" htmlFor="strategic_alignment" require />
								<Select
									rowKey="strategic_alignment"
									id="strategic_alignment"
									optionList={select_strategic_by_year_list}
									defaultSelectedValue={String(projectInfo.strategic_alignment)}
									onChange={(value) => setProjectInfo({ ...projectInfo, strategic_alignment: Number(value) })}
								/>
							</div>
							<div className="col-span-6 mt-3 px-3">
								<Label title="Project Leader" htmlFor="project_leader" require />
								<SearchSelect
									rowKey="project_leader"
									id="project_leader"
									optionList={select_project_leader_list}
									placeholder={'Select Project Leader'}
									defaultSelectedValue={projectInfo.project_leader}
									onChange={(value) => setProjectInfo({ ...projectInfo, project_leader: value !== null ? value : '' })}
								/>
							</div>
							<div className="col-span-6 mt-3 px-3">
								<Label title="Start Date" htmlFor="plan_start_date" require />
								<Input
									id="plan_start_date"
									type="date"
									value={projectInfo.plan_start_date}
									onChange={(e) => setProjectInfo({ ...projectInfo, plan_start_date: e.target.value })}
								/>
							</div>
							<div className="col-span-6 mt-3 px-3">
								<Label title="End Date" htmlFor="plan_end_date" require />
								<Input
									id="plan_end_date"
									type="date"
									value={projectInfo.plan_end_date}
									onChange={(e) => setProjectInfo({ ...projectInfo, plan_end_date: e.target.value })}
								/>
							</div>
							<div className="col-span-12 mt-3 px-3">
								<p className="text-2xl">Initiative Definition</p>
							</div>
							<div className="col-span-6 mt-3 px-3">
								<Label title="Problem / Opportunity" htmlFor="opportunity_statement" require />
								<Textarea
									id="opportunity_statement"
									value={projectInfo.opportunity_statement}
									onChange={(e) => setProjectInfo({ ...projectInfo, opportunity_statement: e.target.value })}
								/>
							</div>
							<div className="col-span-6 mt-3 px-3">
								<Label title="Objective" htmlFor="objective" require />
								<Textarea
									id="objective"
									value={projectInfo.objective}
									onChange={(e) => setProjectInfo({ ...projectInfo, objective: e.target.value })}
								/>
							</div>
							<div className="col-span-6 mt-3 px-3">
								<Label title="Solution" htmlFor="solution" require />
								<Textarea
									id="solution"
									value={projectInfo.solution}
									onChange={(e) => setProjectInfo({ ...projectInfo, solution: e.target.value })}
								/>
							</div>
							<div className="col-span-6 mt-3 px-3">
								<Label title="Impact" htmlFor="impact" require />
								<Textarea
									id="impact"
									value={projectInfo.impact}
									onChange={(e) => setProjectInfo({ ...projectInfo, impact: e.target.value })}
								/>
							</div>
							<div className="col-span-6 mt-3 px-3">
								<Label title="Scope" htmlFor="scope" require />
								<Textarea
									id="scope"
									value={projectInfo.scope}
									onChange={(e) => setProjectInfo({ ...projectInfo, scope: e.target.value })}
								/>
							</div>
							<div className="col-span-12 mt-10 px-3">
								<p className="font-bold">KPI (Key Peroformance Indicator)</p>
							</div>

							<div className="col-span-12 mt-3 px-3">
								<TableWrapper overflow>
									<Table>
										<Thead>
											<TrHead>
												<Th>#</Th>
												<Th>KPI</Th>
												<Th>Target</Th>
												<Th>Unit</Th>
												<Th>Action</Th>
											</TrHead>
										</Thead>

										<Tbody>
											{project_kpi_list.map((projectKpi, index) => (
												<TrBody key={`project_kpi_list-${index}`}>
													<Td>{projectKpi.sequence}</Td>
													<Td>
														<SearchSelect
															rowKey="kpi_select_list"
															optionList={kpi_select_list}
															placeholder={'Select KPI'}
															defaultSelectedValue={projectKpi.kpi_id ? String(projectKpi.kpi_id) : ""}
															onChange={(value) => {
																const selected = value ? Number(value) : null; // ✅ กัน null กลายเป็น 0
																onChangeProjectKpi(index, selected);
															}}
														/>
													</Td>
													<Td>
														<input
															type="number"
															className="form-input"
															value={projectKpi.target !== null ? projectKpi.target : ''}
															onChange={(e) => {
																const next = e.target.value === "" ? null : Number(e.target.value);
																onChangeProjectKpi(index, projectKpi.kpi_id, next ?? undefined);
															}}
														/>
													</Td>
													<Td>
														<input
															type="text"
															className="form-input"
															value={projectKpi.kpi_id ? (kpi_list.find(k => k.id === projectKpi.kpi_id)?.unit || "") : ""}
															readOnly
														/>
													</Td>
													<Td>
														<button
															className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
															onClick={() => { onClickRemoveProjectKpi(projectKpi.sequence) }}
														>
															Delete
														</button>
													</Td>
												</TrBody>
											))}
										</Tbody>

										{/* ✅ ย้าย Total ไปอยู่ tfoot ให้ table ถูกโครงสร้าง */}
										<tfoot>
											<tr>
												<td colSpan={5}>Total: {project_kpi_list.length} kpi(s)</td>
											</tr>
										</tfoot>
									</Table>

									<div className="flex justify-between">
										<div className="px-4 py-3">
											<button className="primary-button" onClick={() => { onClickInsertProjectKpi(project_kpi_list.length + 1) }}>
												Add
											</button>
										</div>
										<div className="tbl-pagination">
											<button className="tbl-page-btn">Prev</button>
											<button className="tbl-page-btn tbl-page-btn-active">1</button>
											<button className="tbl-page-btn">2</button>
											<button className="tbl-page-btn">Next</button>
										</div>
									</div>
								</TableWrapper>
							</div>
						</>
					}

					{tabOpen === 1 &&
						<>
							<div className="col-span-12 mt-3 px-3">
								<p className="text-2xl">Financial Impact</p>
							</div>
							<div className="col-span-3 mt-3 px-3">
								<Label title="Est. Investment" htmlFor="est_investment" />
								<Input
									id="est_investment"
									type="number"
									value={projectInfo.est_investment}
									onChange={(e) => setProjectInfo({ ...projectInfo, est_investment: Number(e.target.value) })}
								/>
							</div>

							<div className="col-span-3 mt-3 px-3">
								<Label title="Est. Gross Earnings" htmlFor="est_gross_earnings" />
								<Input
									id="est_gross_earnings"
									type="number"
									value={projectInfo.est_gross_earnings}
									onChange={(e) => setProjectInfo({ ...projectInfo, est_gross_earnings: Number(e.target.value) })}
								/>
							</div>

							<div className="col-span-3 mt-3 px-3">
								<Label title="Payback Period (Year)" htmlFor="payback_period_year" />
								<Input
									id="payback_period_year"
									type="number"
									readOnly
									value={projectInfo.payback_period_year}
								/>
							</div>

							<div className="col-span-3 mt-3 px-3">
								<Label title="Return on Investment - ROI (%)" htmlFor="return_on_investment" />
								<Input
									id="return_on_investment"
									type="number"
									readOnly
									value={projectInfo.return_on_investment}
								/>
							</div>

							<div className="col-span-12 mt-10 px-3">
								<p className="font-bold">Other Benefit</p>
							</div>

							<div className="col-span-12 mt-3 px-3">
								<TableWrapper>
									<Table>
										<Thead>
											<TrHead>
												<Th>#</Th>
												<Th>Other Benefit</Th>
												<Th>Target</Th>
												<Th>Unit</Th>
												<Th>Action</Th>
											</TrHead>
										</Thead>

										<Tbody>
											{project_other_benefit_list.map((projectKpi, index) => (
												<TrBody key={`project_other_benefit_list-${index}`}>
													<Td>{projectKpi.sequence}</Td>
													<Td>
														<SearchSelect
															optionList={other_benefit_select_list}
															placeholder={'Select Other Benefit'}
															defaultSelectedValue={projectKpi.kpi_id ? String(projectKpi.kpi_id) : ""}
															onChange={(value) => {
																const selected = value ? Number(value) : null; // ✅ กัน null กลายเป็น 0
																onChangeProjectOtherBenefit(index, selected);
															}}
														/>
													</Td>
													<Td>
														<input
															type="number"
															className="form-input"
															value={projectKpi.target !== null ? projectKpi.target : ''}
															onChange={(e) => {
																const next = e.target.value === "" ? null : Number(e.target.value);
																onChangeProjectOtherBenefit(index, projectKpi.kpi_id, next ?? undefined);
															}}
														/>
													</Td>
													<Td>
														<input
															type="text"
															className="form-input"
															value={projectKpi.kpi_id ? (kpi_list.find(k => k.id === projectKpi.kpi_id)?.unit || "") : ""}
															readOnly
														/>
													</Td>
													<Td>
														<button
															className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
															onClick={() => { onClickRemoveProjectOtherBenefit(projectKpi.sequence) }}
														>
															Delete
														</button>
													</Td>
												</TrBody>
											))}
										</Tbody>

										<tfoot>
											<tr>
												<td colSpan={5}>Total: {project_other_benefit_list.length} Other Benefit(s)</td>
											</tr>
										</tfoot>
									</Table>
								</TableWrapper>

								<div className="flex justify-between">
									<div className="px-4 py-3">
										<button className="primary-button" onClick={() => { onClickInsertProjectOtherBenefit(project_other_benefit_list.length + 1) }}>
											Add
										</button>
									</div>
									<div className="tbl-pagination">
										<button className="tbl-page-btn">Prev</button>
										<button className="tbl-page-btn tbl-page-btn-active">1</button>
										<button className="tbl-page-btn">2</button>
										<button className="tbl-page-btn">Next</button>
									</div>
								</div>
							</div>
						</>
					}

					{tabOpen === 2 &&
						<>
							<div className="col-span-3 mt-3 px-3">
								<label className="form-label" htmlFor="">Approver</label>
								<SearchSelect
									rowKey="select_project_approver_list"
									optionList={select_project_approver_list}
									placeholder={'Select Project Approver'}
									defaultSelectedValue={projectInfo.project_approver}
									onChange={(value) => setProjectInfo({ ...projectInfo, project_approver: value !== null ? value : '' })}
								/>
							</div>

							<div className="col-span-12 mt-3 px-3">
								<TableWrapper overflow>
									<Table>
										<Thead>
											<TrHead>
												<th>No.</th>
												<th>Name</th>
												<th>% Weight</th>
												<th>Start Date</th>
												<th>End Date</th>
												<th></th>
											</TrHead>
										</Thead>

										<Tbody>
											{teamMember.map((member, index) => (
												<TrBody key={index}>
													<Td>{index + 1}</Td>
													<Td>
														<SearchSelect
															optionList={select_project_member_list}
															placeholder={'Select Team Member'}
															defaultSelectedValue={member.empName}
															onChange={(value) => {
																const newTeamMember = [...teamMember];
																newTeamMember[index].empName = value !== null ? value : '';
																setteamMember(newTeamMember);
															}}
														/>
													</Td>
													<Td>
														<input
															type="number"
															className="form-input"
															value={member.weight}
															onChange={(e) => {
																const newTeamMember = [...teamMember];
																newTeamMember[index].weight = Number(e.target.value);
																setteamMember(newTeamMember);
															}}
														/>
													</Td>
													<Td>
														<input
															type="date"
															className="form-input"
															value={member.plan_start_date}
															onChange={(e) => {
																const newTeamMember = [...teamMember];
																newTeamMember[index].plan_start_date = e.target.value;
																setteamMember(newTeamMember);
															}}
														/>
													</Td>
													<Td>
														<input
															type="date"
															className="form-input"
															value={member.end_date}
															onChange={(e) => {
																const newTeamMember = [...teamMember];
																newTeamMember[index].end_date = e.target.value;
																setteamMember(newTeamMember);
															}}
														/>
													</Td>
													<td></td>
												</TrBody>
											))}
										</Tbody>

										<tfoot>
											<tr>
												<td colSpan={6}>Total: {teamMember.length} member(s)</td>
											</tr>
										</tfoot>
									</Table>

									<div className="flex justify-between">
										<div className="px-4 py-3">
											<button className="primary-button" onClick={() => { onClickInsertTeamMember(teamMember.length + 1) }}>
												Add
											</button>
										</div>
										<div className="tbl-pagination">
											<button className="tbl-page-btn">Prev</button>
											<button className="tbl-page-btn tbl-page-btn-active">1</button>
											<button className="tbl-page-btn">2</button>
											<button className="tbl-page-btn">Next</button>
										</div>
									</div>
								</TableWrapper>
							</div>
						</>
					}

					{tabOpen === 3 &&
						<>
							{/* ส่วน Project Plan ของคุณ ผมยังคงไว้ตามเดิมทั้งหมด */}
							<div className="col-span-12 mt-3 px-3">
								<div className="table-wrapper">
									<table className="tbl tbl-zebra tbl-sortable">
										<thead>
											<tr>
												<th className="w-[8rem]"></th>
												<th className="w-[3rem]"></th>
												<th>
													<div className="flex">
														<div className="w-[5rem] text-center p-1">Jan 25</div>
														<div className="w-[5rem] text-center p-1">Jan 25</div>
														<div className="w-[5rem] text-center p-1">Jan 25</div>
													</div>
												</th>
												<th className="w-[5rem] text-center">Total</th>
											</tr>
										</thead>
										<tbody>
											{/* ... เดิมทั้งหมด ... */}
											<tr>
												<td className="text-nowrap">Income</td>
												<td>
													<div className="flex h-[3rem] items-center">P</div>
													<div className="flex h-[3rem] items-center">A</div>
												</td>
												<td>
													<div className="flex h-[3rem]">
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
													</div>
													<div className="flex h-[3rem]">
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
													</div>
												</td>
												<td>
													<div className="flex h-[3rem] items-center"><div className="w-[5rem] p-1"><input type="number" className="form-input" /></div></div>
													<div className="flex h-[3rem] items-center"><div className="w-[5rem] p-1"><input type="number" className="form-input" /></div></div>
												</td>
											</tr>

											<tr>
												<td>Cost Saving</td>
												<td>
													<div className="flex h-[3rem] items-center">P</div>
													<div className="flex h-[3rem] items-center">A</div>
												</td>
												<td>
													<div className="flex h-[3rem]">
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
													</div>
													<div className="flex h-[3rem]">
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
													</div>
												</td>
												<td>
													<div className="flex h-[3rem] items-center"><div className="w-[5rem] p-1"><input type="number" className="form-input" /></div></div>
													<div className="flex h-[3rem] items-center"><div className="w-[5rem] p-1"><input type="number" className="form-input" /></div></div>
												</td>
											</tr>

											<tr>
												<td>Investment</td>
												<td>
													<div className="flex h-[3rem] items-center">P</div>
													<div className="flex h-[3rem] items-center">A</div>
												</td>
												<td>
													<div className="flex h-[3rem]">
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
													</div>
													<div className="flex h-[3rem]">
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
													</div>
												</td>
												<td>
													<div className="flex h-[3rem] items-center"><div className="w-[5rem] p-1"><input type="number" className="form-input" /></div></div>
													<div className="flex h-[3rem] items-center"><div className="w-[5rem] p-1"><input type="number" className="form-input" /></div></div>
												</td>
											</tr>

										</tbody>
									</table>
								</div>
							</div>

							{/* ตารางล่างคงเดิม */}
							<div className="col-span-12 mt-3 px-3">
								<TableWrapper overflow>
									<Table className="tbl tbl-zebra tbl-sortable">
										<Thead>
											<TrHead>
												<Th className="min-w-[3rem]">-</Th>
												<Th className="min-w-[3rem]">No.</Th>
												<Th className="min-w-[32rem]">Activity</Th>
												<Th className="min-w-[12rem]">PIC</Th>
												<Th className="min-w-[12rem]">Start Date</Th>
												<Th className="min-w-[12rem]">End Date</Th>
												<Th className="min-w-[8rem]">% Weight</Th>
												<Th className="min-w-[3rem]">-</Th>
												<Th>
													<div className="flex">
														<div className="w-[5rem] text-center p-1">Jan 25</div>
														<div className="w-[5rem] text-center p-1">Jan 25</div>
														<div className="w-[5rem] text-center p-1">Jan 25</div>
													</div>
												</Th>
												<th></th>
											</TrHead>
										</Thead>
										<Tbody>
											{/* ... เดิมทั้งหมด ... */}
											<TrBody>
												<Td>-</Td>
												<Td>1</Td>
												<Td><textarea className="form-input"></textarea></Td>
												<Td>
													<select className="form-select truncate">
														<option value="test1">Witchapart Sangmuang 1</option>
														<option value="test2">Witchapart Sangmuang 2</option>
													</select>
												</Td>
												<Td><input type="date" className="form-input" /></Td>
												<Td><input type="date" className="form-input" /></Td>
												<Td><input type="number" className="form-input" /></Td>
												<Td>
													<div className="flex h-[3rem] items-center">P</div>
													<div className="flex h-[3rem] items-center">A</div>
												</Td>
												<Td>
													<div className="flex h-[3rem]">
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
													</div>
													<div className="flex h-[3rem]">
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
													</div>
												</Td>
												<Td><button>DEL</button></Td>
											</TrBody>
											<TrBody>
												<Td>-</Td>
												<Td>1</Td>
												<Td><textarea className="form-input"></textarea></Td>
												<Td>
													<select className="form-select">
														<option value="test1">test1</option>
														<option value="test2">test2</option>
													</select>
												</Td>
												<Td><input type="date" className="form-input" /></Td>
												<Td><input type="date" className="form-input" /></Td>
												<Td><input type="number" className="form-input" /></Td>
												<Td>
													<div className="flex h-[3rem] items-center">P</div>
													<div className="flex h-[3rem] items-center">A</div>
												</Td>
												<Td>
													<div className="flex h-[3rem]">
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
													</div>
													<div className="flex h-[3rem]">
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
														<div className="w-[5rem] p-1"><input type="number" className="form-input" /></div>
													</div>
												</Td>
												<Td><button>DEL</button></Td>
											</TrBody>

											<TrBody><Td>1</Td></TrBody>
											<TrBody><Td>1</Td></TrBody>
											<TrBody><Td>1</Td></TrBody>
										</Tbody>
									</Table>
								</TableWrapper>
								<div className="rounded bg-white my-2">
									<button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add</button>
								</div>
							</div>
						</>
					}
				</div>
			</div>
			<div className="grid grid-cols-12">
				<div className="col-span-12 mt-3 px-3">
					<p className="text-2xl">Investment</p>
				</div>
				<div className="col-span-6 mt-3 px-3">
					<Label title="Current Est. Investment" htmlFor="est_investment" />
					<Input
						type="text"
						id="est_investment"
						value={projectInfo.est_investment || ""}
						onChange={(e) => setProjectInfo({ ...projectInfo, est_investment: e.target.value })}
					/>
				</div>
				<div className="col-span-6 mt-3 px-3">
					<Label title="New Est. Investment" htmlFor="est_investment_rev" />
					<Input
						type="text"
						id="est_investment_rev"
						value={projectInfo.est_investment_rev || ""}
						onChange={(e) => setProjectInfo({ ...projectInfo, est_investment_rev: e.target.value })}
					/>
				</div>
				<div className="col-span-12 mt-3 px-3">
					<p className="text-2xl">Gross Earnings</p>
				</div>
				<div className="col-span-6 mt-3 px-3">
					<Label title="Current Gross Earnings" htmlFor="gross_earnings" />
					<Input
						type="text"
						id="gross_earnings"
						value={projectInfo.gross_earnings || ""}
						onChange={(e) => setProjectInfo({ ...projectInfo, gross_earnings: e.target.value })}
					/>
				</div>
				<div className="col-span-6 mt-3 px-3">
					<Label title="New Gross Earnings" htmlFor="gross_earnings_rev" />
					<Input
						type="text"
						id="gross_earnings_rev"
						value={projectInfo.gross_earnings_rev || ""}
						onChange={(e) => setProjectInfo({ ...projectInfo, gross_earnings_rev: e.target.value })}
					/>
				</div>
				<div className="col-span-12 mt-3 px-3">
					<p className="text-2xl">Project End Date</p>
				</div>
				<div className="col-span-6 mt-3 px-3">
					<Label title="Current Project End Date" htmlFor="project_end_date" />
					<Input
						type="date"
						id="project_end_date"
						value={projectInfo.project_end_date || ""}
						onChange={(e) => setProjectInfo({ ...projectInfo, est_investment: e.target.value })}
					/>
				</div>
				<div className="col-span-6 mt-3 px-3">
					<Label title="New Project End Date" htmlFor="project_end_date_rev" />
					<Input
						type="date"
						id="project_end_date_rev"
						value={projectInfo.project_end_date_rev || ""}
						onChange={(e) => setProjectInfo({ ...projectInfo, est_investment_rev: e.target.value })}
					/>
				</div>
			</div>
			<div className="flex justify-between rounded bg-white mt-2 p-2">
				<div>
					<button className="secondary-button">Back</button>
				</div>
				<div>
					<button className="primary-button">Save</button>
				</div>
			</div>
		</>
	)
}