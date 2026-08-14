import { Star } from "lucide-react";
import DemoBadge from "@/components/ui/DemoBadge";

const TESTIMONIALS = [
  {
    quote: "Easy to get ahold of, straightforward scheduling, and everything went exactly like it was supposed to.",
    name: "Local Farmer",
    location: "Central Missouri",
  },
  {
    quote: "Had 60 head to move from our place to the sale barn. Filled out the form, got a call the same day, and it was handled. Couldn't ask for anything easier.",
    name: "Ranch Operator",
    location: "South-Central Missouri",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-brand-dark-gray py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <DemoBadge className="mb-3" label="DEMO REVIEWS — REPLACE WITH REAL" />
          <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-2 mt-3">
            What Customers Say
          </p>
          <h2 className="font-display font-bold text-white text-3xl sm:text-4xl">
            STRAIGHTFORWARD.
            <br />
            AS ADVERTISED.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-brand-charcoal rounded-xl border border-white/10 p-7 hover:border-brand-red/20 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-brand-off-white/80 text-base leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-bold text-sm">{t.name}</p>
                <p className="text-white/40 text-xs">{t.location}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Demo reviews only. Replace with real customer feedback before going live.
        </p>
      </div>
    </section>
  );
}
