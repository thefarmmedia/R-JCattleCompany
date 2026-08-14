"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Phone, MessageSquare, Truck } from "lucide-react";
import { BUSINESS, buildCallLink, buildSMSLink, buildSMSTemplate } from "@/config/business";
import Button from "@/components/ui/Button";

// Dramatic cattle/farm background using Unsplash
const BG_IMAGE =
  "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1800&q=80";

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const callLink = buildCallLink(BUSINESS.phone);
  const smsLink = buildSMSLink(BUSINESS.smsNumber, buildSMSTemplate("cattle"));

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-brand-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BG_IMAGE}
          alt=""
          role="presentation"
          className="w-full h-full object-cover opacity-35"
          loading="eager"
        />
        {/* Overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/30 to-brand-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/70 via-transparent to-brand-black/70" />
        {/* Red bottom gradient blending to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-brand-black to-transparent" />
      </div>

      {/* Red accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center pt-32 pb-24">
        {/* Eyebrow */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          <p className="inline-flex items-center gap-2 text-brand-red text-xs font-bold tracking-[0.25em] uppercase mb-6 border border-brand-red/30 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
            {BUSINESS.city}, {BUSINESS.state} &nbsp;•&nbsp; {BUSINESS.subTagline}
          </p>
        </div>

        {/* Main headline */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.25s" }}
        >
          <h1 className="font-display font-bold text-white leading-none mb-4">
            <span className="block text-5xl sm:text-7xl lg:text-8xl tracking-tight">
              CATTLE NEED
            </span>
            <span className="block text-5xl sm:text-7xl lg:text-8xl tracking-tight text-brand-red">
              MOVED?
            </span>
            <span className="block text-3xl sm:text-5xl lg:text-6xl tracking-tight mt-2 text-white/90">
              WE&apos;LL GET &apos;EM THERE.
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          <p className="text-brand-off-white/70 text-lg lg:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
            Cattle, livestock, and agricultural hauling based in Richland, Missouri — serving farms, ranches,
            sale barns, and agricultural operations throughout Missouri and beyond.
          </p>
        </div>

        {/* CTA buttons */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.55s" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button
              size="xl"
              onClick={() => {
                document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group shadow-brand-lg"
            >
              <Truck size={20} className="group-hover:animate-bounce" />
              REQUEST A HAUL
            </Button>
            <a
              href={smsLink}
              className="flex items-center gap-2 border-2 border-white/30 text-white font-display font-bold tracking-wide uppercase text-lg px-9 py-5 rounded-md hover:border-white/60 hover:bg-white/5 transition-all active:scale-95"
            >
              <MessageSquare size={20} />
              TEXT US
            </a>
            <a
              href={callLink}
              className="flex items-center gap-2 text-white/70 font-display font-semibold tracking-wide uppercase text-base px-6 py-5 hover:text-white transition-colors active:scale-95"
            >
              <Phone size={18} />
              CALL NOW
            </a>
          </div>
        </div>

        {/* Trust line */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.7s" }}
        >
          <div className="flex items-center justify-center gap-3 mt-10 text-brand-off-white/40 text-xs font-semibold tracking-[0.2em] uppercase">
            <span>Cattle</span>
            <span className="text-brand-red">•</span>
            <span>Livestock</span>
            <span className="text-brand-red">•</span>
            <span>Agricultural Hauling</span>
            <span className="text-brand-red">•</span>
            <span>Local &amp; Regional</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <p className="text-white/30 text-xs font-semibold tracking-widest uppercase">Scroll</p>
        <ChevronDown size={18} className="text-white/30" />
      </div>
    </section>
  );
}
