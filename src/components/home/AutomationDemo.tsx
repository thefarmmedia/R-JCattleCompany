"use client";

import { useState } from "react";
import { ArrowDown, CheckCircle, Bell, MessageSquare, User, Truck } from "lucide-react";
import DemoBadge from "@/components/ui/DemoBadge";

const FLOW = [
  {
    role: "customer",
    label: "CUSTOMER SUBMITS",
    icon: User,
    color: "border-blue-500/30 bg-blue-900/15 text-blue-400",
    content: {
      title: "Haul Request",
      fields: [
        { k: "Livestock", v: "42 Head — Cattle" },
        { k: "Pickup", v: "Lebanon, MO" },
        { k: "Destination", v: "Springfield, MO" },
        { k: "Requested", v: "Friday" },
      ],
    },
  },
  {
    role: "system",
    label: "PEMBERTON RECEIVES",
    icon: Bell,
    color: "border-brand-red/30 bg-red-900/15 text-brand-red",
    content: {
      title: "NEW CATTLE HAUL REQUEST",
      fields: [
        { k: "Customer", v: "John Smith" },
        { k: "Head", v: "42 Cattle" },
        { k: "Pickup", v: "Lebanon, MO" },
        { k: "Destination", v: "Springfield, MO" },
        { k: "Requested", v: "Friday" },
        { k: "Phone", v: "[Customer Phone]" },
      ],
    },
  },
  {
    role: "confirmation",
    label: "CUSTOMER GETS CONFIRMATION",
    icon: MessageSquare,
    color: "border-green-500/30 bg-green-900/15 text-green-400",
    content: {
      title: "Automated Response",
      message:
        "Thanks John — we received your hauling request. We'll review the route and availability and get back with you as soon as possible.",
    },
  },
];

export default function AutomationDemo() {
  const [revealed, setRevealed] = useState(0);

  return (
    <section className="bg-brand-black py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <DemoBadge className="mb-4" label="VISUAL DEMO" />
          <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">
            What Happens After You Submit
          </p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl">
            REQUEST A HAUL
            WITHOUT THE PHONE TAG.
          </h2>
          <p className="text-brand-off-white/60 mt-4 max-w-xl mx-auto">
            Submit a request and the system can automatically notify Pemberton&apos;s team and send you a confirmation — without a single phone call.
          </p>
        </div>

        <div className="space-y-4">
          {FLOW.map((step, i) => {
            const Icon = step.icon;
            const isVisible = i <= revealed;
            return (
              <div key={step.role}>
                <div
                  className={`rounded-xl border p-5 transition-all duration-500 ${
                    step.color
                  } ${isVisible ? "opacity-100 translate-y-0" : "opacity-30 translate-y-4"}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full border border-current/30 flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                    <p className="font-display font-bold text-sm tracking-widest">{step.label}</p>
                  </div>
                  <div className="bg-brand-black/40 rounded-lg p-4">
                    <p className="font-bold text-white text-sm mb-2">{step.content.title}</p>
                    {"fields" in step.content && step.content.fields && (
                      <div className="space-y-1">
                        {step.content.fields.map(({ k, v }) => (
                          <div key={k} className="flex justify-between text-sm border-b border-white/5 pb-1">
                            <span className="text-white/40">{k}</span>
                            <span className="text-white/80 font-medium">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {"message" in step.content && step.content.message && (
                      <p className="text-green-300/80 text-sm leading-relaxed italic">
                        &ldquo;{step.content.message}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
                {i < FLOW.length - 1 && (
                  <div className="flex flex-col items-center my-2">
                    <ArrowDown size={20} className="text-brand-red/50" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {revealed < FLOW.length - 1 ? (
          <button
            onClick={() => setRevealed((r) => r + 1)}
            className="mt-8 w-full py-4 bg-brand-charcoal border border-white/15 text-white font-display font-bold tracking-widest uppercase rounded-md hover:border-brand-red/30 hover:bg-brand-dark-gray transition-colors"
          >
            SEE WHAT HAPPENS NEXT
          </button>
        ) : (
          <div className="mt-8 bg-brand-charcoal rounded-xl border border-green-500/20 p-6 text-center">
            <CheckCircle size={36} className="text-green-400 mx-auto mb-3" />
            <p className="font-display font-bold text-white text-lg mb-2">
              THAT&apos;S THE SYSTEM.
            </p>
            <p className="text-brand-off-white/60 text-sm">
              A farmer finds the site, fills out the form, and Pemberton has every piece of information they need — name, phone, head count, pickup, destination, and date — instantly. No phone tag required.
            </p>
            <a href="#quote-form" className="mt-4 inline-block bg-brand-red text-white font-display font-bold tracking-widest uppercase px-8 py-3 rounded-md hover:bg-brand-red-dark transition-colors text-sm">
              <Truck className="inline mr-2" size={16} />
              TRY IT NOW
            </a>
          </div>
        )}

        <p className="text-center text-white/20 text-xs mt-5">
          Visual demo only. No messages are actually sent. In production, this connects to GoHighLevel, webhooks, or your CRM.
        </p>
      </div>
    </section>
  );
}
