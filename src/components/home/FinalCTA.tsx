import { Phone, MessageSquare, Truck } from "lucide-react";
import { BUSINESS, buildCallLink, buildSMSLink, buildSMSTemplate } from "@/config/business";

const BG = "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1600&q=80";

export default function FinalCTA() {
  const callLink = buildCallLink(BUSINESS.phone);
  const smsLink = buildSMSLink(BUSINESS.smsNumber, buildSMSTemplate("cattle"));

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BG}
          alt=""
          role="presentation"
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/90 via-brand-black/80 to-brand-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/60 to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-4">
          Ready to Get Started?
        </p>
        <h2 className="font-display font-bold text-white text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6">
          GOT SOMETHING
          <br />
          THAT NEEDS MOVED?
        </h2>
        <p className="text-brand-off-white/70 text-xl leading-relaxed max-w-xl mx-auto mb-10">
          Tell us what you&apos;ve got, where it&apos;s at, and where it&apos;s going.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#quote-form"
            className="flex items-center gap-3 bg-brand-red text-white font-display font-bold tracking-widest uppercase px-10 py-5 rounded-md hover:bg-brand-red-dark transition-colors shadow-brand-lg text-lg w-full sm:w-auto justify-center"
          >
            <Truck size={22} />
            REQUEST A HAUL
          </a>
          <a
            href={smsLink}
            className="flex items-center gap-3 border-2 border-white/30 text-white font-display font-bold tracking-widest uppercase px-10 py-5 rounded-md hover:border-white/60 hover:bg-white/5 transition-all text-lg w-full sm:w-auto justify-center"
          >
            <MessageSquare size={22} />
            TEXT US
          </a>
          <a
            href={callLink}
            className="flex items-center gap-3 border-2 border-white/15 text-white/70 font-display font-bold tracking-widest uppercase px-10 py-5 rounded-md hover:text-white hover:border-white/30 transition-all text-lg w-full sm:w-auto justify-center"
          >
            <Phone size={22} />
            CALL US
          </a>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="font-display font-bold text-white text-2xl tracking-wide mb-1">
            PEMBERTON CATTLE COMPANY
          </p>
          <p className="text-white/50 mb-2">
            {BUSINESS.city}, {BUSINESS.state}
          </p>
          <p className="text-brand-off-white/30 text-sm tracking-widest">
            Cattle • Livestock • Agricultural Hauling
          </p>
        </div>
      </div>
    </section>
  );
}
