"use client";

import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import { useRouter } from "next/navigation";
// Assuming you use lucide-react for icons
import { Plus, LayoutDashboard, Zap } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Dashboard Overview
              </h1>
            </div>
            <p className="text-slate-500 font-medium">
              Welcome back, <span className="text-slate-900">Admin</span>. Here
              is your business summary.
            </p>
          </div>

          <button
            onClick={() => router.push("/quotation")}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-200"
          >
            <Plus className="w-5 h-5" />
            <span>New Quotation</span>
          </button>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Products"
            value={120}
            trend="+12% from last month"
            icon="package" // Pass icon name if your StatCard supports it
          />
          <StatCard
            title="Total Quotations"
            value={48}
            trend="+5% today"
            icon="file-text"
          />
          <StatCard
            title="Revenue"
            value="৳ 2,45,000"
            trend="+৳ 12k this week"
            highlight={true} // Custom prop for different styling
            icon="currency"
          />
        </section>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Activity Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800">
                  Recent Activity
                </h2>
                <button className="text-sm text-blue-600 font-medium hover:underline">
                  View All
                </button>
              </div>
              <div className="p-6">
                <RecentActivity />
              </div>
            </div>
          </div>

          {/* Right Column: Actions & Tools */}
          <aside className="space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <Zap className="w-5 h-5 text-amber-500" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">
                  Quick Actions
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                <QuickActionCard
                  title="Create Quotation"
                  description="Instantly generate a professional PDF invoice"
                  buttonText="Start"
                  variant="blue" // Use variants instead of hardcoded colors
                  onClick={() => router.push("/quotation")}
                />

                <QuickActionCard
                  title="Add Product"
                  description="Update your inventory with new arrivals"
                  buttonText="Add"
                  variant="emerald"
                  onClick={() => router.push("/products/add")}
                />
              </div>
            </div>

            {/* Optional Promo or Tip Card */}
            <div className="bg-linear-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl">
              <h3 className="font-bold mb-2">Pro Tip</h3>
              <p className="text-indigo-100 text-sm leading-relaxed">
                You can now export your monthly revenue reports directly to
                Excel from the settings page.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
