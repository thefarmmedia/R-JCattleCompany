"use client";

import { Phone, MessageSquare, Truck } from "lucide-react";
import { BUSINESS, buildCallLink, buildSMSLink, buildSMSTemplate } from "@/config/business";

export default function MobileStickyBar() {
  const callLink = buildCallLink(BUSINESS.phone);
  const smsLink = buildSMSLink(BUSINESS.smsNumber, buildSMSTemplate("cattle"));

  function scrollToQuote() {
    const el = document.getElementById("quote-form");
    el?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="mobile-sticky-bar lg:hidden no-print">
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <a
          href={callLink}
          className="flex flex-col items-center justify-center gap-1 py-3 px-2 text-white hover:bg-white/5 active:bg-white/10 transition-colors"
          aria-label="Call Pemberton Cattle Company"
        >
          <Phone size={20} className="text-brand-red" />
          <span className="text-[10px] font-bold tracking-widest uppercase">CALL</span>
        </a>
        <a
          href={smsLink}
          className="flex flex-col items-center justify-center gap-1 py-3 px-2 text-white hover:bg-white/5 active:bg-white/10 transition-colors"
          aria-label="Text Pemberton Cattle Company"
        >
          <MessageSquare size={20} className="text-brand-red" />
          <span className="text-[10px] font-bold tracking-widest uppercase">TEXT</span>
        </a>
        <button
          onClick={scrollToQuote}
          className="flex flex-col items-center justify-center gap-1 py-3 px-2 bg-brand-red text-white hover:bg-brand-red-dark active:bg-brand-red-dark transition-colors"
          aria-label="Request a haul"
        >
          <Truck size={20} />
          <span className="text-[10px] font-bold tracking-widest uppercase">HAUL</span>
        </button>
      </div>
    </div>
  );
}
