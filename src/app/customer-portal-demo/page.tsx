import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Truck, Calendar, FileText, DollarSign, Package, MapPin, CheckCircle, Clock, AlertCircle } from "lucide-react";
import DemoBadge from "@/components/ui/DemoBadge";

export const metadata: Metadata = {
  title: "Customer Portal Demo | Pemberton Cattle Company",
  description: "Demo customer portal showing upcoming hauls, haul history, quotes, and documents for Pemberton Cattle Company.",
};

const UPCOMING_HAULS = [
  {
    id: "H-2024-0842",
    type: "Cattle",
    head: 42,
    pickup: "Lebanon, Missouri",
    dest: "Springfield, Missouri",
    date: "August 22",
    status: "SCHEDULED",
    statusColor: "text-green-400 bg-green-900/30 border-green-600/30",
    driver: "[Driver — Pending Assignment]",
    distance: "~58 mi",
  },
  {
    id: "H-2024-0843",
    type: "Farm Equipment — Tractor",
    head: null,
    pickup: "Richland, Missouri",
    dest: "Jefferson City, Missouri",
    date: "August 30",
    status: "QUOTE PENDING",
    statusColor: "text-amber-400 bg-amber-900/30 border-amber-600/30",
    driver: "To be assigned",
    distance: "~100 mi",
  },
];

const PAST_HAULS = [
  {
    id: "H-2024-0731",
    type: "Cattle",
    head: 30,
    pickup: "Waynesville, MO",
    dest: "Richland, MO",
    date: "July 31",
    status: "DELIVERED",
    statusColor: "text-white/50 bg-white/5 border-white/10",
    distance: "~24 mi",
  },
  {
    id: "H-2024-0718",
    type: "Feeder Cattle",
    head: 65,
    pickup: "Camdenton, MO",
    dest: "Lebanon, MO",
    date: "July 18",
    status: "DELIVERED",
    statusColor: "text-white/50 bg-white/5 border-white/10",
    distance: "~41 mi",
  },
];

const NAV_ITEMS = [
  { label: "Upcoming Hauls", icon: Truck, active: true },
  { label: "Previous Hauls", icon: CheckCircle, active: false },
  { label: "Quotes", icon: FileText, active: false },
  { label: "Invoices", icon: DollarSign, active: false },
  { label: "Documents", icon: Package, active: false },
];

function StatusBadge({ status, color }: { status: string; color: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border ${color}`}>
      {status}
    </span>
  );
}

export default function CustomerPortalPage() {
  return (
    <div className="min-h-screen bg-brand-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-brand-charcoal px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
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
                <p className="font-display font-bold text-white text-base tracking-wide">
                  PEMBERTON CUSTOMER PORTAL
                </p>
                <DemoBadge />
              </div>
              <p className="text-white/40 text-xs">Pemberton Cattle Company</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-white text-sm font-bold">John Smith</p>
              <p className="text-white/40 text-xs">Smith Farms</p>
            </div>
            <div className="w-9 h-9 bg-brand-red rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JS</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar nav */}
          <aside className="lg:w-56 shrink-0">
            <nav className="bg-brand-charcoal rounded-xl border border-white/10 overflow-hidden">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-left transition-colors ${
                      item.active
                        ? "bg-brand-red/15 text-white border-r-2 border-brand-red"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={16} className={item.active ? "text-brand-red" : ""} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Quick actions */}
            <div className="mt-4 bg-brand-charcoal rounded-xl border border-white/10 p-4">
              <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-3">Quick Actions</p>
              <div className="space-y-2">
                <a
                  href="/#quote-form"
                  className="block w-full bg-brand-red text-white text-center py-2.5 rounded-md text-sm font-display font-bold tracking-widest uppercase hover:bg-brand-red-dark transition-colors"
                >
                  NEW HAUL REQUEST
                </a>
                <button className="block w-full border border-white/15 text-white/60 text-center py-2.5 rounded-md text-sm font-semibold hover:text-white hover:border-white/30 transition-colors">
                  Download Invoice
                </button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 space-y-6">
            {/* Upcoming hauls */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-white text-xl tracking-wide flex items-center gap-2">
                  <Truck size={18} className="text-brand-red" />
                  UPCOMING HAULS
                </h2>
                <DemoBadge label="DEMO DATA" />
              </div>

              <div className="space-y-4">
                {UPCOMING_HAULS.map((haul) => (
                  <div
                    key={haul.id}
                    className="bg-brand-charcoal rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
                  >
                    <div className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <p className="font-display font-bold text-white text-lg">
                            {haul.head ? `${haul.head} Head — ` : ""}{haul.type}
                          </p>
                          <p className="text-white/40 text-xs font-mono mt-0.5">{haul.id}</p>
                        </div>
                        <StatusBadge status={haul.status} color={haul.statusColor} />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="text-brand-red shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white/40 text-xs uppercase tracking-wider">Pickup</p>
                            <p className="text-white text-sm font-semibold">{haul.pickup}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="text-green-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white/40 text-xs uppercase tracking-wider">Destination</p>
                            <p className="text-white text-sm font-semibold">{haul.dest}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar size={14} className="text-white/40 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white/40 text-xs uppercase tracking-wider">Date</p>
                            <p className="text-white text-sm font-semibold">{haul.date}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-white/10">
                        <span className="text-white/40 text-xs">Distance: <span className="text-white/70">{haul.distance}</span></span>
                        <span className="text-white/40 text-xs">Driver: <span className="text-white/70">{haul.driver}</span></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Previous hauls */}
            <section>
              <h2 className="font-display font-bold text-white text-xl tracking-wide flex items-center gap-2 mb-4">
                <CheckCircle size={18} className="text-green-400" />
                PREVIOUS HAULS
              </h2>

              <div className="bg-brand-charcoal rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left px-5 py-3 text-white/40 text-xs font-bold tracking-wider uppercase">ID</th>
                      <th className="text-left px-5 py-3 text-white/40 text-xs font-bold tracking-wider uppercase">Load</th>
                      <th className="text-left px-5 py-3 text-white/40 text-xs font-bold tracking-wider uppercase hidden sm:table-cell">Route</th>
                      <th className="text-left px-5 py-3 text-white/40 text-xs font-bold tracking-wider uppercase hidden md:table-cell">Date</th>
                      <th className="text-left px-5 py-3 text-white/40 text-xs font-bold tracking-wider uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PAST_HAULS.map((haul, i) => (
                      <tr
                        key={haul.id}
                        className={`border-b border-white/5 hover:bg-white/3 transition-colors ${
                          i === PAST_HAULS.length - 1 ? "border-none" : ""
                        }`}
                      >
                        <td className="px-5 py-4 font-mono text-white/50 text-xs">{haul.id}</td>
                        <td className="px-5 py-4">
                          <p className="text-white font-semibold">{haul.type}</p>
                          {haul.head && <p className="text-white/40 text-xs">{haul.head} head</p>}
                        </td>
                        <td className="px-5 py-4 text-white/60 hidden sm:table-cell">
                          {haul.pickup.split(",")[0]} → {haul.dest.split(",")[0]}
                        </td>
                        <td className="px-5 py-4 text-white/60 hidden md:table-cell">{haul.date}</td>
                        <td className="px-5 py-4">
                          <StatusBadge status={haul.status} color={haul.statusColor} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Quotes */}
            <section>
              <h2 className="font-display font-bold text-white text-xl tracking-wide flex items-center gap-2 mb-4">
                <FileText size={18} className="text-amber-400" />
                OPEN QUOTES
              </h2>
              <div className="bg-brand-charcoal rounded-xl border border-white/10 p-5">
                <div className="flex items-center justify-between p-4 bg-brand-dark-gray rounded-lg border border-white/5">
                  <div>
                    <p className="text-white font-semibold">Q-2024-0843 — Equipment Haul</p>
                    <p className="text-white/40 text-xs mt-0.5">Tractor • Richland → Jefferson City • ~100 mi</p>
                  </div>
                  <div className="text-right">
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-600/30 bg-amber-900/20 px-2 py-1 rounded">
                      Pending
                    </span>
                    <p className="text-white/30 text-xs mt-1">Submitted Aug 14</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Placeholder sections */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: DollarSign, label: "INVOICES", count: 2, color: "text-green-400" },
                { icon: Package, label: "DOCUMENTS", count: 4, color: "text-blue-400" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-brand-charcoal rounded-xl border border-white/10 p-5 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${item.color}`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-sm tracking-widest">{item.label}</p>
                      <p className="text-white/40 text-sm">{item.count} items</p>
                    </div>
                    <button className="ml-auto text-brand-red text-sm font-semibold hover:underline">View</button>
                  </div>
                );
              })}
            </section>

            {/* Demo notice */}
            <div className="bg-brand-red/10 border border-brand-red/20 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle size={18} className="text-brand-red shrink-0 mt-0.5" />
              <p className="text-white/60 text-sm leading-relaxed">
                <strong className="text-white">Demo Mode.</strong> All haul data, quotes, invoices, and documents shown are fictional demo examples. In a live system, this portal would display real haul history, live status tracking, and downloadable documents for your account.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
