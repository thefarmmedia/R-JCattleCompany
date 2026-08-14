"use client";

import { useState } from "react";
import { Wrench, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

type EquipType =
  | "Tractor" | "Skid Steer" | "Combine" | "Excavator" | "Dozer"
  | "Baler" | "Sprayer" | "Farm Implement" | "Construction Equipment" | "Other";

const EQUIP_TYPES: { name: EquipType; icon: string }[] = [
  { name: "Tractor", icon: "🚜" },
  { name: "Skid Steer", icon: "🏗️" },
  { name: "Combine", icon: "🌾" },
  { name: "Excavator", icon: "⚙️" },
  { name: "Dozer", icon: "🔧" },
  { name: "Baler", icon: "🌿" },
  { name: "Sprayer", icon: "💧" },
  { name: "Farm Implement", icon: "🔩" },
  { name: "Construction Equipment", icon: "🏙️" },
  { name: "Other", icon: "📦" },
];

function recommendTrailer(weight: string, width: string, height: string): string {
  const w = parseFloat(weight) || 0;
  const wi = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;

  if (h > 13.5 || w > 80000) return "Lowboy (Oversize Load)";
  if (w > 48000 || wi > 10) return "Lowboy";
  if (h > 11 || w > 30000) return "Step Deck";
  return "Equipment Trailer";
}

export default function EquipmentHaulingTool() {
  const [step, setStep] = useState<"select" | "details" | "result">("select");
  const [equipType, setEquipType] = useState<EquipType | "">(" ");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [weight, setWeight] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [pickupZip, setPickupZip] = useState("");
  const [destZip, setDestZip] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const trailer = weight || width || height ? recommendTrailer(weight, width, height) : null;

  function reset() {
    setStep("select");
    setEquipType("");
    setMake(""); setModel(""); setWeight(""); setWidth(""); setHeight(""); setLength("");
    setPickupZip(""); setDestZip("");
    setSubmitted(false);
  }

  return (
    <section id="equipment-hauling" className="bg-brand-dark-gray py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Equipment Hauling
          </p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl">
            NEED EQUIPMENT MOVED?
          </h2>
          <p className="text-brand-off-white/60 mt-3">
            Tell us what you&apos;ve got and where it needs to go.
          </p>
        </div>

        <div className="bg-brand-charcoal rounded-xl border border-white/10 p-6 lg:p-8">
          {step === "select" && (
            <div>
              <h3 className="font-display font-bold text-white text-xl mb-5">WHAT ARE WE MOVING?</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {EQUIP_TYPES.map((e) => (
                  <button key={e.name} onClick={() => { setEquipType(e.name); setStep("details"); }}
                    className={`flex flex-col items-center gap-2 py-4 px-2 rounded-lg border text-center transition-all hover:scale-105 ${
                      equipType === e.name
                        ? "bg-brand-red border-brand-red text-white"
                        : "border-white/15 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/5"
                    }`}>
                    <span className="text-2xl">{e.icon}</span>
                    <span className="text-xs font-bold leading-tight">{e.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "details" && (
            <div>
              <button onClick={() => setStep("select")} className="text-brand-off-white/40 text-sm mb-5 hover:text-white flex items-center gap-1">
                ← Back
              </button>
              <h3 className="font-display font-bold text-white text-xl mb-1">{equipType} — DETAILS</h3>
              <p className="text-brand-off-white/50 text-sm mb-5">The more info you can give us, the faster we can help.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="form-label">Make (Optional)</label>
                  <input type="text" className="form-input" placeholder="e.g. John Deere" value={make} onChange={(e) => setMake(e.target.value)} /></div>
                <div><label className="form-label">Model (Optional)</label>
                  <input type="text" className="form-input" placeholder="e.g. 9620RX" value={model} onChange={(e) => setModel(e.target.value)} /></div>
                <div><label className="form-label">Approx. Weight (lbs)</label>
                  <input type="text" className="form-input" placeholder="e.g. 45000" value={weight} onChange={(e) => setWeight(e.target.value)} /></div>
                <div><label className="form-label">Width (ft)</label>
                  <input type="text" className="form-input" placeholder="e.g. 14" value={width} onChange={(e) => setWidth(e.target.value)} /></div>
                <div><label className="form-label">Height (ft)</label>
                  <input type="text" className="form-input" placeholder="e.g. 12" value={height} onChange={(e) => setHeight(e.target.value)} /></div>
                <div><label className="form-label">Length (ft)</label>
                  <input type="text" className="form-input" placeholder="e.g. 40" value={length} onChange={(e) => setLength(e.target.value)} /></div>
                <div><label className="form-label">Pickup ZIP</label>
                  <input type="text" inputMode="numeric" className="form-input" placeholder="65556" value={pickupZip} onChange={(e) => setPickupZip(e.target.value)} maxLength={5} /></div>
                <div><label className="form-label">Destination ZIP</label>
                  <input type="text" inputMode="numeric" className="form-input" placeholder="65101" value={destZip} onChange={(e) => setDestZip(e.target.value)} maxLength={5} /></div>
              </div>
              {trailer && (
                <div className="mt-5 bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                  <p className="text-amber-400 text-xs font-bold tracking-wider uppercase mb-1">Your Equipment May Require:</p>
                  <p className="font-display font-bold text-white text-xl">{trailer}</p>
                  <p className="text-white/40 text-xs mt-2">Trailer recommendation is an estimate only.</p>
                </div>
              )}
              <div className="mt-5">
                <Button size="lg" fullWidth onClick={() => setStep("result")}>
                  REQUEST EQUIPMENT HAULING <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          )}

          {step === "result" && !submitted && (
            <div>
              <button onClick={() => setStep("details")} className="text-brand-off-white/40 text-sm mb-5 hover:text-white flex items-center gap-1">← Back</button>
              <h3 className="font-display font-bold text-white text-xl mb-5">YOUR EQUIPMENT HAUL REQUEST</h3>
              <div className="bg-brand-dark-gray rounded-lg p-4 space-y-2 mb-5">
                {[
                  { k: "Equipment", v: `${make || ""} ${model || ""} ${equipType}`.trim() },
                  { k: "Approx. Weight", v: weight ? `${weight} lbs` : "Not provided" },
                  { k: "Dimensions", v: width || height || length ? `${width || "?"}w × ${height || "?"}h × ${length || "?"}l ft` : "Not provided" },
                  { k: "Pickup ZIP", v: pickupZip || "Not provided" },
                  { k: "Destination ZIP", v: destZip || "Not provided" },
                  { k: "Est. Trailer", v: trailer || "To be determined" },
                ].map(({ k, v }) => (
                  <div key={k} className="flex justify-between text-sm border-b border-white/5 pb-1.5">
                    <span className="text-white/50">{k}</span>
                    <span className="text-white font-semibold">{v}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" fullWidth onClick={() => setSubmitted(true)}>SEND EQUIPMENT HAUL REQUEST</Button>
            </div>
          )}

          {submitted && (
            <div className="text-center py-8">
              <Wrench size={40} className="text-green-400 mx-auto mb-4" />
              <h3 className="font-display font-bold text-white text-2xl mb-2">REQUEST RECEIVED</h3>
              <p className="text-brand-off-white/60">We&apos;ll review the equipment details and get back with you shortly.</p>
              <button onClick={reset} className="mt-5 text-brand-red text-sm underline">Submit another request</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
