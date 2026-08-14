"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "What types of cattle do you haul?",
    a: "We accept hauling requests for cattle, calves, bulls, cows, cow/calf pairs, feeder cattle, and other livestock. Use the haul request form to describe your specific load.",
  },
  {
    q: "How far does Pemberton Cattle Company travel?",
    a: "We're based in Richland, Missouri and accept local, regional, and long-distance hauling requests. Ranges 0–75 miles are local, 75–150 are our core service area, and 150–300 are regional. For longer hauls, send us the details — we'll let you know if it's something we can handle.",
  },
  {
    q: "How do I request a cattle haul?",
    a: "Use the multi-step haul request form on this page. It walks you through the type of livestock, head count, pickup location, destination, timeframe, and your contact info. You can also text or call us directly.",
  },
  {
    q: "Can I text pictures?",
    a: "Yes. You can upload photos directly through the haul request form, or text them to us directly. Photos help us understand the load, facilities, access, and any special handling requirements before we call you.",
  },
  {
    q: "Do you haul to sale barns?",
    a: "Yes. We accept sale barn hauling requests. Use the sale barn form or the main haul request form — give us the number of head, pickup location, sale barn name, and your requested date.",
  },
  {
    q: "Can I request farm-to-farm transportation?",
    a: "Yes. Farm-to-farm is one of our primary services. Give us the pickup location, destination, number of head, and your timeframe and we'll review the haul.",
  },
  {
    q: "Do you haul farm equipment?",
    a: "We accept equipment hauling requests for tractors, skid steers, combines, excavators, dozers, balers, sprayers, farm implements, and more. Use the equipment hauling tool to describe your equipment and get a trailer recommendation.",
  },
  {
    q: "Can I request a long-distance haul?",
    a: "Yes. Don't assume you're too far away. For hauls over 300 miles, send us the details — pickup, destination, and what you're moving — and we'll let you know if it's something we can accommodate.",
  },
  {
    q: "How quickly will someone respond?",
    a: "Response time depends on current schedule and volume. Submitting a haul request gives us everything we need to review the haul before calling you — which typically means a faster response than calling cold.",
  },
  {
    q: "What information should I have ready?",
    a: "The basics: type and count of what you're moving, pickup location, destination, and your preferred date or timeframe. If you have loading and unloading facility details, access notes, or photos, those help us plan the haul more accurately.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-brand-black py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Common Questions
          </p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl">
            FAQ
          </h2>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl border transition-all",
                open === i
                  ? "border-brand-red/30 bg-brand-charcoal"
                  : "border-white/10 bg-brand-charcoal/50 hover:border-white/20"
              )}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-white leading-snug">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={cn(
                    "text-brand-red shrink-0 transition-transform duration-200",
                    open === i ? "rotate-180" : ""
                  )}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-brand-off-white/70 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
