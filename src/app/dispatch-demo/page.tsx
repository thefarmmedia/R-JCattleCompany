import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart3, Truck, Clock, DollarSign, Users } from "lucide-react";
import DemoBadge from "@/components/ui/DemoBadge";
import DispatchBoard from "@/components/dispatch/DispatchBoard";

export const metadata: Metadata = {
  title: "Dispatch Dashboard Demo | Pemberton Cattle Company",
  description: "Demo dispatch dashboard showing the internal CRM pipeline for Pemberton Cattle Company hauling operations.",
};

const STATS = [
  { label: "Active Leads", value: "8", icon: Users, color: "text-blue-400" },
  { label: "In Transit", value: "1", icon: Truck, color: "text-brand-red" },
  { label: "Scheduled", value: "2", icon: Clock, color: "text-green-400" },
  { label: "Pending Quotes", value: "3", icon: DollarSign, color: "text-amber-400" },
];

export default function DispatchPage() {
  return (
    <div className="min-h-screen bg-brand-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-brand-charcoal px-4 py-4 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Website</span>
            </Link>
            <div className="h-5 w-px bg-white/20" />
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 size={18} className="text-brand-red" />
                <p className="font-display font-bold text-white tracking-wide">
                  PEMBERTON DISPATCH
                </p>
                <DemoBadge label="DEMO DASHBOARD" />
              </div>
              <p className="text-white/40 text-xs">Internal CRM Pipeline — Demo View</p>
            </div>
          </div>
          <Link
            href="/customer-portal-demo"
            className="hidden sm:flex items-center gap-2 text-white/50 hover:text-white text-sm border border-white/15 px-4 py-2 rounded-md hover:border-white/30 transition-colors"
          >
            Customer Portal →
          </Link>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-brand-charcoal rounded-xl border border-white/10 p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-display font-bold text-white text-2xl">{stat.value}</p>
                  <p className="text-white/40 text-xs">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Kanban board */}
        <DispatchBoard />

        {/* Demo notice */}
        <div className="mt-6 bg-brand-charcoal border border-white/10 rounded-xl p-5">
          <h3 className="font-display font-bold text-white text-sm tracking-widest uppercase mb-3">
            WHAT THIS COULD DO
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-white/60">
            {[
              "New haul requests appear automatically when submitted from the website",
              "Drag leads through the pipeline from request to delivery to payment",
              "Click any card to view full customer details, load info, route, and notes",
              "Connect to GoHighLevel, Zapier, or other CRM systems for full automation",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-brand-red mt-0.5 shrink-0 font-bold">{i + 1}.</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
