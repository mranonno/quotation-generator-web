"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  //   ExternalLink,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Mock data for the table
const historyData = [
  {
    id: "Q-2024-001",
    client: "Rahim Textiles Ltd",
    date: "2024-05-15",
    amount: "৳ 12,500",
    status: "Sent",
  },
  {
    id: "Q-2024-002",
    client: "Karim & Sons",
    date: "2024-05-14",
    amount: "৳ 8,200",
    status: "Draft",
  },
  {
    id: "Q-2024-003",
    client: "Green Field Agriculture",
    date: "2024-05-12",
    amount: "৳ 45,000",
    status: "Paid",
  },
  {
    id: "Q-2024-004",
    client: "Blue Sky Agency",
    date: "2024-05-10",
    amount: "৳ 2,400",
    status: "Sent",
  },
  {
    id: "Q-2024-005",
    client: "Pacific Logistics",
    date: "2024-05-08",
    amount: "৳ 15,900",
    status: "Expired",
  },
];

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Sent":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Expired":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Quotation History
            </h1>
            <p className="text-slate-500 font-medium">
              Manage and track your previous generated quotations.
            </p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 rounded-xl shadow-sm transition-all">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by client or ID..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all">
              <Calendar className="w-4 h-4" />
              Date
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Quotation ID
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Client Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {historyData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 text-sm">
                        {row.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600 font-medium text-sm">
                        {row.client}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-500 text-sm">{row.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 text-sm">
                        {row.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(row.status)}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm text-slate-500 font-medium">
              Showing 5 of 48 entries
            </span>
            <div className="flex items-center gap-2">
              <button className="p-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
