"use client";
import React, { useMemo, useState } from "react";

// =============================
// Types
// =============================
export type KPI = {
  id: string;
  name: string;
  target: number | string;
  unit: string;
  weight?: number; // 0-100
  owner?: string;
};

export type MDPolicy = {
  id: string;
  title: string;
  description?: string;
  owner?: string;
  timeframe?: string; // e.g., FY2025, 2025-2027
  kpis: KPI[];
};

// Utility to make IDs
const uid = () => Math.random().toString(36).slice(2, 9);

// =============================
// Component
// =============================
export default function MDPolicyManager() {
  const [policies, setPolicies] = useState<MDPolicy[]>([
    {
      id: uid(),
      title: "Sustainable Revenue Growth",
      description:
        "Drive consistent YoY revenue growth via market expansion, new products, and digital channels.",
      owner: "Chief Commercial Officer",
      timeframe: "FY2025",
      kpis: [
        { id: uid(), name: "Total Revenue Growth", target: 12, unit: "%", weight: 40 },
        { id: uid(), name: "New Product / Service Ratio", target: 20, unit: "%", weight: 30 },
        { id: uid(), name: "Export / Regional Sales Ratio", target: 15, unit: "%", weight: 30 },
      ],
    },
    {
      id: uid(),
      title: "Operational Excellence & Cost Efficiency",
      description:
        "Increase operational efficiency and reduce cost across supply chain and production.",
      owner: "COO",
      timeframe: "2025-2026",
      kpis: [
        { id: uid(), name: "EBITDA Margin", target: 20, unit: "%", weight: 40 },
        { id: uid(), name: "Process Efficiency Index", target: 85, unit: "%", weight: 30 },
        { id: uid(), name: "Cost Saving vs Last Year", target: 5, unit: "%", weight: 30 },
      ],
    },
  ]);

  const [draft, setDraft] = useState<MDPolicy>({
    id: uid(),
    title: "",
    description: "",
    owner: "",
    timeframe: "",
    kpis: [
      { id: uid(), name: "", target: "", unit: "%", weight: 100 },
    ],
  });

  const totalWeight = useMemo(() =>
    draft.kpis.reduce((sum, k) => sum + (Number(k.weight) || 0), 0)
  , [draft.kpis]);

  const addKPIToDraft = () => {
    setDraft((d) => ({
      ...d,
      kpis: [...d.kpis, { id: uid(), name: "", target: "", unit: "%", weight: 0 }],
    }));
  };

  const removeKPIFromDraft = (id: string) => {
    setDraft((d) => ({ ...d, kpis: d.kpis.filter((k) => k.id !== id) }));
  };

  const resetDraft = () => {
    setDraft({ id: uid(), title: "", description: "", owner: "", timeframe: "", kpis: [{ id: uid(), name: "", target: "", unit: "%", weight: 100 }] });
  };

  const addPolicy = () => {
    if (!draft.title.trim()) return alert("Please provide a Policy title.");
    if (draft.kpis.length === 0) return alert("Please add at least 1 KPI.");
    setPolicies((p) => [{ ...draft, id: uid() }, ...p]);
    resetDraft();
  };

  const deletePolicy = (policyId: string) => {
    setPolicies((p) => p.filter((x) => x.id !== policyId));
  };

  const addKPIToPolicy = (policyId: string) => {
    setPolicies((p) =>
      p.map((pol) =>
        pol.id === policyId
          ? { ...pol, kpis: [...pol.kpis, { id: uid(), name: "", target: "", unit: "%", weight: 0 }] }
          : pol
      )
    );
  };

  const removeKPIFromPolicy = (policyId: string, kpiId: string) => {
    setPolicies((p) =>
      p.map((pol) =>
        pol.id === policyId
          ? { ...pol, kpis: pol.kpis.filter((k) => k.id !== kpiId) }
          : pol
      )
    );
  };

  const updatePolicyField = (
    policyId: string,
    field: keyof Omit<MDPolicy, "id" | "kpis">,
    value: string
  ) => {
    setPolicies((p) =>
      p.map((pol) => (pol.id === policyId ? { ...pol, [field]: value } : pol))
    );
  };

  const updateKPIField = (
    policyId: string,
    kpiId: string,
    field: keyof KPI,
    value: string
  ) => {
    setPolicies((p) =>
      p.map((pol) =>
        pol.id === policyId
          ? {
              ...pol,
              kpis: pol.kpis.map((k) =>
                k.id === kpiId
                  ? {
                      ...k,
                      [field]:
                        field === "target" || field === "weight"
                          ? (value === "" ? "" : Number(value))
                          : value,
                    }
                  : k
              ),
            }
          : pol
      )
    );
  };

  const exportJSON = () => {
    const data = JSON.stringify({ policies }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `md-policy-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">MD Policy Manager</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={exportJSON}
              className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-50 text-gray-800"
            >
              Export JSON
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Create / Edit Draft */}
        <section className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <h2 className="text-lg font-semibold mb-3">Create a new MD Policy</h2>

            <label className="block text-sm font-medium">Policy Title</label>
            <input
              className="mt-1 mb-3 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Digital Transformation & Innovation"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />

            <label className="block text-sm font-medium">Owner</label>
            <input
              className="mt-1 mb-3 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., CIO / CDO / VP Innovation"
              value={draft.owner}
              onChange={(e) => setDraft({ ...draft, owner: e.target.value })}
            />

            <label className="block text-sm font-medium">Timeframe</label>
            <input
              className="mt-1 mb-3 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., FY2025 or 2025-2027"
              value={draft.timeframe}
              onChange={(e) => setDraft({ ...draft, timeframe: e.target.value })}
            />

            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="mt-1 mb-3 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Short description of the policy goal"
              rows={3}
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            />

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">KPI(s)</h3>
                <button
                  onClick={addKPIToDraft}
                  className="text-sm px-2 py-1 rounded-lg border bg-white hover:bg-gray-50"
                >
                  + Add KPI
                </button>
              </div>
              <p className={`text-xs mt-1 ${totalWeight === 100 ? "text-green-600" : "text-amber-600"}`}>
                Weight total: <span className="font-semibold">{totalWeight}%</span> {totalWeight !== 100 && "(recommended = 100%)"}
              </p>

              <div className="mt-2 space-y-3">
                {draft.kpis.map((kpi, idx) => (
                  <div key={kpi.id} className="rounded-xl border p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium bg-gray-100 px-2 py-0.5 rounded-full">KPI #{idx + 1}</span>
                      <button
                        onClick={() => removeKPIFromDraft(kpi.id)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium">Name</label>
                        <input
                          className="mt-1 w-full rounded-lg border px-3 py-2"
                          placeholder="e.g., Digital Adoption Rate"
                          value={kpi.name}
                          onChange={(e) =>
                            setDraft((d) => ({
                              ...d,
                              kpis: d.kpis.map((x) => (x.id === kpi.id ? { ...x, name: e.target.value } : x)),
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Target</label>
                        <input
                          className="mt-1 w-full rounded-lg border px-3 py-2"
                          placeholder="e.g., 80"
                          value={kpi.target}
                          onChange={(e) =>
                            setDraft((d) => ({
                              ...d,
                              kpis: d.kpis.map((x) => (x.id === kpi.id ? { ...x, target: e.target.value } : x)),
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Unit</label>
                        <input
                          className="mt-1 w-full rounded-lg border px-3 py-2"
                          placeholder="e.g., % / THB / pts"
                          value={kpi.unit}
                          onChange={(e) =>
                            setDraft((d) => ({
                              ...d,
                              kpis: d.kpis.map((x) => (x.id === kpi.id ? { ...x, unit: e.target.value } : x)),
                            }))
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium">Weight (%)</label>
                        <input
                          type="number"
                          className="mt-1 w-full rounded-lg border px-3 py-2"
                          placeholder="e.g., 30"
                          value={kpi.weight ?? 0}
                          onChange={(e) =>
                            setDraft((d) => ({
                              ...d,
                              kpis: d.kpis.map((x) =>
                                x.id === kpi.id ? { ...x, weight: Number(e.target.value) } : x
                              ),
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={addPolicy}
                className="flex-1 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                Add Policy
              </button>
              <button
                onClick={resetDraft}
                className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* Right: Policies List */}
        <section className="lg:col-span-2">
          <div className="space-y-4">
            {policies.map((p) => (
              <article key={p.id} className="bg-white rounded-2xl shadow-sm border p-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                    <div className="mt-1 text-sm text-gray-600 flex flex-wrap gap-2">
                      {p.owner && (
                        <span className="bg-gray-100 px-2 py-0.5 rounded-full">Owner: {p.owner}</span>
                      )}
                      {p.timeframe && (
                        <span className="bg-gray-100 px-2 py-0.5 rounded-full">Timeframe: {p.timeframe}</span>
                      )}
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">KPI: {p.kpis.length}</span>
                    </div>
                    {p.description && (
                      <p className="mt-3 text-sm text-gray-700">{p.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => addKPIToPolicy(p.id)}
                      className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-50"
                    >
                      + Add KPI
                    </button>
                    <button
                      onClick={() => deletePolicy(p.id)}
                      className="px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Editable Policy Meta */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium">Owner</label>
                    <input
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                      value={p.owner || ""}
                      onChange={(e) => updatePolicyField(p.id, "owner", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium">Timeframe</label>
                    <input
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                      value={p.timeframe || ""}
                      onChange={(e) => updatePolicyField(p.id, "timeframe", e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-medium">Title</label>
                    <input
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                      value={p.title}
                      onChange={(e) => updatePolicyField(p.id, "title", e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-medium">Description</label>
                    <textarea
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                      rows={2}
                      value={p.description || ""}
                      onChange={(e) => updatePolicyField(p.id, "description", e.target.value)}
                    />
                  </div>
                </div>

                {/* KPI Table */}
                <div className="mt-4 overflow-auto">
                  <table className="min-w-full border-separate border-spacing-y-2">
                    <thead>
                      <tr className="text-left text-xs text-gray-600">
                        <th className="px-2">#</th>
                        <th className="px-2">KPI Name</th>
                        <th className="px-2">Target</th>
                        <th className="px-2">Unit</th>
                        <th className="px-2">Weight (%)</th>
                        <th className="px-2">Owner</th>
                        <th className="px-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.kpis.map((kpi, idx) => (
                        <tr key={kpi.id} className="bg-gray-50/70">
                          <td className="px-2 py-2 text-xs text-gray-600">{idx + 1}</td>
                          <td className="px-2 py-2">
                            <input
                              className="w-full rounded-lg border px-3 py-2"
                              value={kpi.name}
                              placeholder="e.g., NPS / OEE / ROI"
                              onChange={(e) => updateKPIField(p.id, kpi.id, "name", e.target.value)}
                            />
                          </td>
                          <td className="px-2 py-2">
                            <input
                              className="w-full rounded-lg border px-3 py-2"
                              value={kpi.target as any}
                              placeholder="e.g., 60"
                              onChange={(e) => updateKPIField(p.id, kpi.id, "target", e.target.value)}
                            />
                          </td>
                          <td className="px-2 py-2">
                            <input
                              className="w-full rounded-lg border px-3 py-2"
                              value={kpi.unit}
                              placeholder="% / THB / pts"
                              onChange={(e) => updateKPIField(p.id, kpi.id, "unit", e.target.value)}
                            />
                          </td>
                          <td className="px-2 py-2">
                            <input
                              type="number"
                              className="w-full rounded-lg border px-3 py-2"
                              value={kpi.weight ?? 0}
                              onChange={(e) => updateKPIField(p.id, kpi.id, "weight", e.target.value)}
                            />
                          </td>
                          <td className="px-2 py-2">
                            <input
                              className="w-full rounded-lg border px-3 py-2"
                              value={kpi.owner || ""}
                              placeholder="PIC"
                              onChange={(e) => updateKPIField(p.id, kpi.id, "owner", e.target.value)}
                            />
                          </td>
                          <td className="px-2 py-2 text-right">
                            <button
                              onClick={() => removeKPIFromPolicy(p.id, kpi.id)}
                              className="text-xs text-red-600 hover:underline"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={7} className="px-2 pt-1 text-xs text-gray-600">
                          Total weight: {p.kpis.reduce((s, k) => s + (Number(k.weight) || 0), 0)}%
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </article>
            ))}

            {policies.length === 0 && (
              <div className="text-center text-gray-500 py-20 border-2 border-dashed rounded-2xl">
                No policies yet. Add from the left panel.
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl px-4 py-8 text-xs text-gray-500">
        <p>
          Tip: Keep KPI weights per policy totaling <span className="font-semibold">100%</span> for clear evaluation.
        </p>
      </footer>
    </div>
  );
}
