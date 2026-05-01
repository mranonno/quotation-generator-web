"use client";

import { FileCheck, Clock, ArrowUpRight } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      code: "#Q-2024-001",
      time: "2 hours ago",
      status: "Sent",
      amount: "৳ 12,500",
    },
    {
      id: 2,
      code: "#Q-2024-002",
      time: "5 hours ago",
      status: "Draft",
      amount: "৳ 8,200",
    },
    {
      id: 3,
      code: "#Q-2024-003",
      time: "Yesterday",
      status: "Sent",
      amount: "৳ 45,000",
    },
  ];

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {activities.map((activity, idx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {/* Timeline Connector Line */}
              {idx !== activities.length - 1 ? (
                <span
                  className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-slate-100"
                  aria-hidden="true"
                />
              ) : null}

              <div className="relative flex items-start space-x-4">
                {/* Icon Container */}
                <div className="relative">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-white ${
                      activity.status === "Sent"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <FileCheck className="h-5 w-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {activity.code}{" "}
                      <span className="ml-2 font-medium text-slate-500">
                        {activity.status === "Sent"
                          ? "created and sent"
                          : "saved as draft"}
                      </span>
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-slate-400">
                      <Clock className="h-3 w-3" />
                      <span>{activity.time}</span>
                    </div>
                  </div>

                  <div className="whitespace-nowrap text-right text-lg font-bold text-slate-900">
                    <span className="font-bold text-slate-900">
                      {activity.amount}
                    </span>
                    <button className="ml-3 text-slate-400 hover:text-blue-600 transition-colors">
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
