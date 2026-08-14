import { ArrowRight } from "lucide-react";

const BG = "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1400&q=80";

export default function FarmToFarmSection() {
  return (
    <section id="farm-to-farm" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BG}
          alt=""
          role="presentation"
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-brand-black/80" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Farm to Farm
          </p>
          <h2 className="font-display font-bold text-white text-5xl sm:text-6xl leading-tight mb-6">
            FARM TO FARM.
            <br />
            <span className="text-brand-red">NO RUNAROUND.</span>
          </h2>
          <p className="text-brand-off-white/70 text-lg leading-relaxed mb-4">
            Whether cattle are moving down the road or across Missouri, send us the pickup, destination,
            number of head, and timeframe.
          </p>
          <p className="text-brand-off-white/70 text-lg leading-relaxed mb-8">
            We&apos;ll review the haul and get back with you.
          </p>
          <a
            href="#quote-form"
            className="inline-flex items-center gap-3 bg-brand-red text-white font-display font-bold tracking-widest uppercase px-8 py-5 rounded-md hover:bg-brand-red-dark transition-colors shadow-brand-lg text-lg group"
          >
            START A HAUL REQUEST
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-16 border-t border-white/10 pt-10">
          {[
            { label: "Tell us what you've got", icon: "🐄" },
            { label: "Tell us where it's going", icon: "📍" },
            { label: "We'll take it from there", icon: "🚛" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <span className="text-3xl block mb-2">{item.icon}</span>
              <p className="text-white/60 text-sm font-semibold leading-tight">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
