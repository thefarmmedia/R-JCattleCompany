import { MessageSquare, Tractor, Zap, MapPin, ArrowRight } from "lucide-react";

const REASONS = [
  {
    icon: MessageSquare,
    title: "STRAIGHTFORWARD COMMUNICATION",
    desc: "No complicated process. Tell us what needs moved, where it's at, and where it's going. We handle the rest.",
  },
  {
    icon: Tractor,
    title: "BUILT AROUND AGRICULTURE",
    desc: "A website experience specifically designed around cattle and agricultural hauling — not a generic trucking template.",
  },
  {
    icon: Zap,
    title: "FAST HAUL REQUESTS",
    desc: "Submit everything we need without playing phone tag. Request a haul from your phone in under a minute.",
  },
  {
    icon: MapPin,
    title: "LOCAL & REGIONAL REQUESTS",
    desc: "Based in Richland and accepting hauling requests throughout the region. Local, core, and regional routes all welcome.",
  },
  {
    icon: ArrowRight,
    title: "LONGER HAUL? ASK US.",
    desc: "Don't assume you're too far away. Send us the route and let us figure out if we can handle it.",
  },
];

export default function WhyPemberton() {
  return (
    <section className="bg-brand-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">Why Choose Us</p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl">
            WHY PEMBERTON<br />CATTLE COMPANY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div key={reason.title}
                className={`bg-brand-charcoal rounded-xl border border-white/10 p-7 hover:border-brand-red/30 transition-all hover:-translate-y-1 group ${
                  i === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="w-12 h-12 bg-brand-red/15 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-red/25 transition-colors">
                  <Icon size={22} className="text-brand-red" />
                </div>
                <h3 className="font-display font-bold text-white text-sm tracking-widest uppercase mb-3">{reason.title}</h3>
                <p className="text-brand-off-white/60 text-sm leading-relaxed">{reason.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
