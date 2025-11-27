"use client";

import { useState } from "react";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className="w-64 h-screen bg-gray-900 text-gray-200 p-4">
      <h1 className="text-xl font-semibold px-2 mb-6">Wisdom Platform</h1>

      <nav className="space-y-1 overflow-y-scroll h-full  ">

        {/* Single menus */}
        <MenuItem label="MD Policy" />
        <MenuItem label="KPI Alignment" />
        <MenuItem label="Inspiration" />
        <MenuItem label="Idea Generation" />
        <MenuItem label="Project Management" />

        {/* Dashboard (Accordion) */}
        <Accordion 
          label="Dashboard"
          isOpen={openMenu === "dashboard"}
          onClick={() => toggleMenu("dashboard")}
          items={[
            "Executive Dashboard",
            "Manager Dashboard",
            "User Dashboard",
          ]}
        />

        {/* Report (Accordion) */}
        <Accordion 
          label="Report"
          isOpen={openMenu === "report"}
          onClick={() => toggleMenu("report")}
          items={[
            "Project Report",
            "Idea Report",
            "Inspiration Report",
          ]}
        />

        <MenuItem label="Knowledge Management" />
        <MenuItem label="Management" />
<MenuItem label="Management" /><MenuItem label="Management" /><MenuItem label="Management" /><MenuItem label="Management" /><MenuItem label="Management" /><MenuItem label="Management" /><MenuItem label="Management" /><MenuItem label="Management" /><MenuItem label="Management" /><MenuItem label="Management" />
      </nav>
    </aside>
  );
}

function MenuItem({ label }: { label: string }) {
  return (
    <div className="px-3 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition">
      {label}
    </div>
  );
}

function Accordion({
  label,
  isOpen,
  onClick,
  items,
}: {
  label: string;
  isOpen: boolean;
  onClick: () => void;
  items: string[];
}) {
  return (
    <div>
      {/* Main menu */}
      <div
        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition"
        onClick={onClick}
      >
        <span>{label}</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="ml-4 mt-1 space-y-1">
          {items.map((item) => (
            <div
              key={item}
              className="px-3 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
