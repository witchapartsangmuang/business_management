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

function SortableTh({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    userSelect: "none",
    opacity: isDragging ? 0.6 : 1,
    background: isDragging ? "#f5f5f5" : undefined,
    position: "relative",
    whiteSpace: "nowrap",
  };

  return (
    <th
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
      <span style={{ marginLeft: 8, fontSize: 12, opacity: 0.6 }}>↔ drag</span>
    </th>
  );
}

export default function DndReorderColumnsTable() {
  // sample data
  const [rows] = useState<Row[]>([
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

  const columnIds = useMemo(() => columns.map((c) => c.id), [columns]);

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const oldIndex = columnIds.indexOf(active.id as ColumnId);
    const newIndex = columnIds.indexOf(over.id as ColumnId);
    if (oldIndex === -1 || newIndex === -1) return;

    setColumns((prev) => arrayMove(prev, oldIndex, newIndex));
  }

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
        Drag to reorder columns
      </h2>

      <div style={{ border: "1px solid #e5e5e5", borderRadius: 10, overflow: "auto" }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <SortableContext
                items={columnIds}
                strategy={horizontalListSortingStrategy}
              >
                <tr>
                  {columns.map((col) => (
                    <SortableTh key={col.id} id={col.id}>
                      <div
                        style={{
                          padding: "12px 12px",
                          borderBottom: "1px solid #eee",
                          fontWeight: 700,
                          width: col.width,
                          minWidth: col.width,
                        }}
                      >
                        {col.header}
                      </div>
                    </SortableTh>
                  ))}
                </tr>
              </SortableContext>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  {columns.map((col) => (
                    <td
                      key={`${r.id}-${col.id}`}
                      style={{
                        padding: "10px 12px",
                        borderBottom: "1px solid #f0f0f0",
                        width: col.width,
                        minWidth: col.width,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {col.accessor(r)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </DndContext>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
        Tip: ลากที่หัวตาราง (header) เพื่อสลับคอลัมน์
      </div>
    </div>
  );
}
