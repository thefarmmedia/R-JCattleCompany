"use client";

import { Calendar } from "lucide-react";
import DemoBadge from "@/components/ui/DemoBadge";

const DAYS = [
  { day: "MON", status: "Limited Availability", color: "text-amber-400 border-amber-500/30 bg-amber-900/15" },
  { day: "TUE", status: "2 Openings", color: "text-green-400 border-green-500/30 bg-green-900/15" },
  { day: "WED", status: "Available", color: "text-green-400 border-green-500/30 bg-green-900/15" },
  { day: "THU", status: "Limited Availability", color: "text-amber-400 border-amber-500/30 bg-amber-900/15" },
  { day: "FRI", status: "Call for Availability", color: "text-blue-400 border-blue-500/30 bg-blue-900/15" },
  { day: "SAT", status: "By Request", color: "text-white/50 border-white/10 bg-white/5" },
  { day: "SUN", status: "By Request", color: "text-white/50 border-white/10 bg-white/5" },
];

export default function AvailabilitySection() {
  return (
    <section className="bg-brand-charcoal py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">Current Schedule</p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl mb-3">NEED SOMETHING MOVED SOON?</h2>
          <p className="text-brand-off-white/60 text-lg mb-3">Check upcoming hauling availability.</p>
          <DemoBadge label="DEMO AVAILABILITY — MUST BE CONFIRMED" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
          {DAYS.map((d) => (
            <div key={d.day} className={`rounded-xl border p-4 text-center ${d.color}`}>
              <Calendar size={18} className="mx-auto mb-2 opacity-60" />
              <p className="font-display font-bold text-base">{d.day}</p>
              <p className="text-xs mt-1 font-semibold leading-tight opacity-80">{d.status}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-dark-gray rounded-xl border border-white/10 p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg mb-1">Ready to schedule a haul?</p>
            <p className="text-brand-off-white/60 text-sm">
              Submit a request and we&apos;ll confirm availability for your specific route and date.
              <br />
              <span className="text-white/30">Demo schedule shown above — actual availability must be confirmed.</span>
            </p>
          </div>
          <a href="#quote-form" className="shrink-0 bg-brand-red text-white font-display font-bold tracking-widest uppercase px-8 py-4 rounded-md hover:bg-brand-red-dark transition-colors shadow-brand whitespace-nowrap">
            REQUEST AN OPENING
          </a>
        </div>
      </div>
    </section>
  );
}
