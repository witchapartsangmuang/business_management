import React from "react";

type Row = {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
};

const statusClass = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
};

export default function DataTable() {
  const data: Row[] = [
    { id: "1", name: "John Doe", email: "john@example.com", status: "active" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", status: "pending" },
    { id: "3", name: "Michael Lee", email: "michael@example.com", status: "inactive" },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">User List</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100 text-left border-b">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-lg text-sm font-medium ${statusClass[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="px-3 py-1 text-sm text-blue-600 hover:underline">
                    View
                  </button>
                  <button className="px-3 py-1 text-sm text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">Showing 1–3 of 3</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
            Prev
          </button>
          <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
