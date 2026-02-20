"use client";

import React, { useMemo, useState } from "react";
import {
	DndContext,
	PointerSensor,
	KeyboardSensor,
	closestCenter,
	useSensor,
	useSensors,
	DragEndEvent,
} from "@dnd-kit/core";
import {
	SortableContext,
	useSortable,
	arrayMove,
	horizontalListSortingStrategy,
	verticalListSortingStrategy,
	sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Row = {
	id: string;
	name: string;
	department: string;
	role: string;
	email: string;
};

type ColumnId = "name" | "department" | "role" | "email";

type ColumnDef = {
	id: ColumnId;
	header: string;
	accessor: (r: Row) => React.ReactNode;
	width?: number;
};

function SortableResizableTh({
	dndId, // "col-name"
	col,
	onResize,
}: {
	dndId: string;
	col: ColumnDef;
	onResize: (id: ColumnId, width: number) => void;
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: dndId });

	const startResize = (e: React.MouseEvent<HTMLDivElement>) => {
		// กันไม่ให้ไป trigger drag column
		e.preventDefault();
		e.stopPropagation();

		const startX = e.clientX;
		const startWidth = col.width ?? 150;

		const onMouseMove = (event: MouseEvent) => {
			const next = startWidth + (event.clientX - startX);
			const clamped = Math.max(80, Math.min(next, 800));
			onResize(col.id, clamped);
		};

		const onMouseUp = () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	};

	return (
		<th
			ref={setNodeRef}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				width: col.width,
				minWidth: col.width,
				position: "relative",
				userSelect: "none",
				opacity: isDragging ? 0.7 : 1,
				background: isDragging ? "#f7f7f7" : undefined,
				borderBottom: "1px solid #eee",
				whiteSpace: "nowrap",
			}}
		>
			{/* พื้นที่ลากสลับคอลัมน์ (drag handle) */}
			<div
				ref={setActivatorNodeRef}
				{...attributes}
				{...listeners}
				style={{
					padding: "12px 12px",
					fontWeight: 700,
					cursor: "grab",
					display: "flex",
					alignItems: "center",
					gap: 8,
				}}
				title="Drag to reorder column"
			>
				{col.header}
				<span style={{ fontSize: 12, opacity: 0.6 }}>↔</span>
			</div>

			{/* พื้นที่ resize */}
			<div
				onMouseDown={startResize}
				style={{
					position: "absolute",
					top: 0,
					right: 0,
					width: 8,
					height: "100%",
					cursor: "col-resize",
					// ช่วยให้จับง่ายขึ้น
				}}
				title="Drag to resize"
			/>
		</th>
	);
}

function SortableRow({
	dndId, // "row-1"
	children,
}: {
	dndId: string;
	children: (opts: {
		handleProps: React.HTMLAttributes<HTMLElement>;
		setHandleRef: (node: HTMLElement | null) => void;
		isDragging: boolean;
	}) => React.ReactNode;
}) {
	const {
		setNodeRef,
		setActivatorNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: dndId });

	return (
		<tr
			ref={setNodeRef}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				background: isDragging ? "#fafafa" : undefined,
				opacity: isDragging ? 0.8 : 1,
			}}
		>
			{children({
				handleProps: { ...attributes, ...listeners },
				setHandleRef: setActivatorNodeRef,
				isDragging,
			})}
		</tr>
	);
}

export default function DndReorderColumnsAndRowsTable() {
	const [rows, setRows] = useState<Row[]>([
		{ id: "1", name: "Aqua Treat", department: "Sales", role: "Manager", email: "aqua@corp.com" },
		{ id: "2", name: "Wisdom Platform", department: "IT", role: "Engineer", email: "it@corp.com" },
		{ id: "3", name: "Chien Production", department: "Ops", role: "Supervisor", email: "ops@corp.com" },
		{ id: "4", name: "Health Tech Plus", department: "Finance", role: "Officer", email: "fin@corp.com" },
	]);

	const initialColumns: ColumnDef[] = useMemo(
		() => [
			{ id: "name", header: "Company", accessor: (r) => r.name, width: 220 },
			{ id: "department", header: "Department", accessor: (r) => r.department, width: 160 },
			{ id: "role", header: "Role", accessor: (r) => r.role, width: 160 },
			{ id: "email", header: "Email", accessor: (r) => r.email, width: 240 },
		],
		[]
	);

	const [columns, setColumns] = useState<ColumnDef[]>(initialColumns);

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
	);

	const columnDndIds = useMemo(() => columns.map((c) => `col-${c.id}`), [columns]);
	const rowDndIds = useMemo(() => rows.map((r) => `row-${r.id}`), [rows]);

	function handleResize(id: ColumnId, width: number) {
		setColumns((prev) => prev.map((c) => (c.id === id ? { ...c, width } : c)));
	}

	function onDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (!over) return;
		if (active.id === over.id) return;

		const activeId = String(active.id);
		const overId = String(over.id);

		// columns
		if (activeId.startsWith("col-") && overId.startsWith("col-")) {
			const oldIndex = columnDndIds.indexOf(activeId);
			const newIndex = columnDndIds.indexOf(overId);
			if (oldIndex < 0 || newIndex < 0) return;
			setColumns((prev) => arrayMove(prev, oldIndex, newIndex));
			return;
		}

		// rows
		if (activeId.startsWith("row-") && overId.startsWith("row-")) {
			const oldIndex = rowDndIds.indexOf(activeId);
			const newIndex = rowDndIds.indexOf(overId);
			if (oldIndex < 0 || newIndex < 0) return;
			setRows((prev) => arrayMove(prev, oldIndex, newIndex));
			return;
		}
	}

	return (
		<div style={{ padding: 16 }}>
			<h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
				Drag to reorder columns & rows + resize columns
			</h2>

			<div style={{ border: "1px solid #e5e5e5", borderRadius: 10, overflow: "auto" }}>
				<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
					<table
						style={{
							width: "100%",
							borderCollapse: "separate",
							borderSpacing: 0,
							tableLayout: "fixed", // ช่วยให้ width ทำงานนิ่ง
						}}
					>
						<thead>
							<SortableContext items={columnDndIds} strategy={horizontalListSortingStrategy}>
								<tr>
									<th
										style={{
											width: 52,
											minWidth: 52,
											padding: "12px 12px",
											borderBottom: "1px solid #eee",
											fontWeight: 700,
											whiteSpace: "nowrap",
										}}
									>
										Row
									</th>

									{columns.map((col) => (
										<SortableResizableTh
											key={col.id}
											dndId={`col-${col.id}`}
											col={col}
											onResize={handleResize}
										/>
									))}
								</tr>
							</SortableContext>
						</thead>

						<tbody>
							<SortableContext items={rowDndIds} strategy={verticalListSortingStrategy}>
								{rows.map((r) => {
									const rowId = `row-${r.id}`;
									return (
										<SortableRow key={r.id} dndId={rowId}>
											{({ handleProps, setHandleRef }) => (
												<>
													<td
														style={{
															padding: "10px 12px",
															borderBottom: "1px solid #f0f0f0",
															width: 52,
															minWidth: 52,
															whiteSpace: "nowrap",
														}}
													>
														<span
															ref={setHandleRef}
															{...handleProps}
															style={{
																display: "inline-flex",
																alignItems: "center",
																justifyContent: "center",
																width: 24,
																height: 24,
																borderRadius: 6,
																border: "1px solid #eee",
																cursor: "grab",
																userSelect: "none",
																fontSize: 14,
																opacity: 0.9,
															}}
															title="Drag to reorder row"
															aria-label="Drag to reorder row"
														>
															≡
														</span>
													</td>

													{columns.map((col) => (
														<td
															key={`${r.id}-${col.id}`}
															style={{
																padding: "10px 12px",
																borderBottom: "1px solid #f0f0f0",
																width: col.width,
																minWidth: col.width,
																whiteSpace: "nowrap",
																overflow: "hidden",
																textOverflow: "ellipsis",
															}}
														>
															{col.accessor(r)}
														</td>
													))}
												</>
											)}
										</SortableRow>
									);
								})}
							</SortableContext>
						</tbody>
					</table>
				</DndContext>
			</div>

			<div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
				Tip: ลากหัวคอลัมน์เพื่อสลับ / ลากเส้นขวาเพื่อขยาย / ลาก “≡” เพื่อสลับแถว
			</div>
		</div>
	);
}
