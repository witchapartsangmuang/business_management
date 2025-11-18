"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  useEffect(() => {
    document.title = openMenu ? openMenu :"" ;
  }, [openMenu]);
  return (
    <aside className="w-64 h-screen bg-gray-900 text-gray-200 p-4">
      <h1 className="text-xl font-semibold px-2 mb-6">Wisdom Platform</h1>

      <nav className="space-y-1">

        <MenuItem label="MD Policy" url="/md-policy" />
        <MenuItem label="KPI Alignment" url="/kpi-alignment" />
        <MenuItem label="Inspiration" url="/inspiration" />
        <MenuItem label="Idea Generation" url="/idea-generation" />
        <MenuItem label="Project Management" url="/project-management" />

        {/* Dashboard */}
        <Accordion
          label="Dashboard"
          isOpen={openMenu === "dashboard"}
          onClick={() => toggleMenu("dashboard")}
          items={[
            { label: "Executive Dashboard", url: "/dashboard/executive" },
            { label: "Manager Dashboard", url: "/dashboard/manager" },
            { label: "User Dashboard", url: "/dashboard/user" },
          ]}
        />

        {/* Report */}
        <Accordion
          label="Report"
          isOpen={openMenu === "report"}
          onClick={() => toggleMenu("report")}
          items={[
            { label: "Project Report", url: "/report/project" },
            { label: "Idea Report", url: "/report/idea" },
            { label: "Inspiration Report", url: "/report/inspiration" },
          ]}
        />

        <MenuItem label="Knowledge Management" url="/knowledge-management" />
        <MenuItem label="Management" url="/management" />

      </nav>
    </aside>
  );
}

function MenuItem({ label, url }: { label: string; url: string }) {
  return (
    <Link
      href={url}
      className="block px-3 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition"
    >
      {label}
    </Link>
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
  items: { label: string; url: string }[];
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
            <Link
              key={item.url}
              href={item.url}
              className="block px-3 py-2 rounded-lg hover:bg-gray-800 cursor-pointer transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
