"use client";

import { useState } from "react";
import { MapPin, ArrowRight, Truck } from "lucide-react";
import { estimateDemoDistance, classifyMileage } from "@/lib/utils";
import Button from "@/components/ui/Button";
import DemoBadge from "@/components/ui/DemoBadge";

const CATEGORY_COLORS = {
  local: "text-green-400 border-green-500/40 bg-green-500/10",
  core: "text-blue-400 border-blue-500/40 bg-blue-500/10",
  regional: "text-amber-400 border-amber-500/40 bg-amber-500/10",
  "long-distance": "text-brand-red border-brand-red/40 bg-brand-red/10",
};

export default function MileageCalculator() {
  const [pickup, setPickup] = useState("");
  const [dest, setDest] = useState("");
  const [result, setResult] = useState<{ miles: number; info: ReturnType<typeof classifyMileage> } | null>(null);
  const [checking, setChecking] = useState(false);

  function calculate() {
    if (!pickup || !dest) return;
    setChecking(true);
    setTimeout(() => {
      const miles = estimateDemoDistance(pickup, dest);
      const info = classifyMileage(miles);
      setResult({ miles, info });
      setChecking(false);
    }, 600);
  }

  return (
    <section id="route-checker" className="bg-brand-dark-gray py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Route Checker
          </p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl">
            HOW FAR IS THE HAUL?
          </h2>
          <p className="text-brand-off-white/60 mt-3">
            Enter a pickup and destination to check the estimated distance and haul category.
          </p>
          <DemoBadge className="mt-3" label="DEMO ESTIMATOR" />
        </div>

        <div className="bg-brand-charcoal rounded-xl border border-white/10 p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex-1">
              <label className="form-label flex items-center gap-2">
                <MapPin size={13} className="text-brand-red" /> Pickup Location
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="City, MO or ZIP (e.g. 65536)"
                value={pickup}
                onChange={(e) => { setPickup(e.target.value); setResult(null); }}
              />
            </div>
            <div className="hidden sm:flex items-center pb-3">
              <ArrowRight size={20} className="text-white/30" />
            </div>
            <div className="flex-1">
              <label className="form-label flex items-center gap-2">
                <MapPin size={13} className="text-brand-red" /> Destination
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="City, MO or ZIP (e.g. 65802)"
                value={dest}
                onChange={(e) => { setDest(e.target.value); setResult(null); }}
              />
            </div>
          </div>

          <div className="mt-5">
            <Button
              size="lg"
              fullWidth
              onClick={calculate}
              disabled={!pickup || !dest || checking}
            >
              {checking ? "CHECKING..." : "CHECK ROUTE"}
            </Button>
          </div>

          {result && (
            <div className="mt-6 border-t border-white/10 pt-6 space-y-4">
              <div className="text-center">
                <p className="text-brand-off-white/50 text-sm uppercase tracking-wider mb-1">
                  Estimated Haul Distance
                </p>
                <p className="font-display font-bold text-white text-6xl">
                  {result.miles}
                </p>
                <p className="text-white/40 text-sm">Miles (Demo Estimate)</p>
              </div>

              <div
                className={`rounded-lg border p-4 text-center ${
                  CATEGORY_COLORS[result.info.category]
                }`}
              >
                <p className="font-display font-bold text-lg tracking-wide">
                  {result.info.label.toUpperCase()}
                </p>
                <p className="text-sm mt-1 opacity-80">{result.info.description}</p>
              </div>

              {result.info.category === "long-distance" && (
                <div className="bg-brand-dark-gray rounded-lg p-4 text-center border border-white/10">
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    That&apos;s a longer haul, but don&apos;t count us out. Send us the details and we&apos;ll confirm whether we can handle it.
                  </p>
                  <a
                    href="#quote-form"
                    className="inline-flex items-center gap-2 bg-brand-red text-white font-display font-bold tracking-widest uppercase px-6 py-3 rounded-md text-sm hover:bg-brand-red-dark transition-colors"
                  >
                    <Truck size={16} /> REQUEST THIS HAUL
                  </a>
                </div>
              )}

              {result.info.category !== "long-distance" && (
                <a
                  href="#quote-form"
                  className="flex items-center justify-center gap-2 bg-brand-red text-white font-display font-bold tracking-widest uppercase py-4 rounded-md hover:bg-brand-red-dark transition-colors shadow-brand"
                >
                  <Truck size={18} /> REQUEST THIS HAUL
                </a>
              )}

              <p className="text-center text-brand-off-white/30 text-xs">
                Estimated demo mileage only. Actual routing confirmed upon request.
              </p>
            </div>
          )}
        </div>

        {/* Service area legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {[
            { range: "0–75 mi", label: "Local Haul", color: "text-green-400" },
            { range: "76–150 mi", label: "Core Service Area", color: "text-blue-400" },
            { range: "151–300 mi", label: "Regional Haul", color: "text-amber-400" },
            { range: "300+ mi", label: "Long-Distance", color: "text-brand-red" },
          ].map((item) => (
            <div key={item.range} className="bg-brand-charcoal rounded-lg p-3 border border-white/5 text-center">
              <p className={`font-display font-bold text-sm ${item.color}`}>{item.range}</p>
              <p className="text-white/50 text-xs mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
