import { ArrowRight } from "lucide-react";

const BG = "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=1200&q=75";

const LOAD_TYPES = [
  { icon: "🌾", label: "Hay & Feed" },
  { icon: "🌽", label: "Farm Supplies" },
  { icon: "🚜", label: "Equipment" },
  { icon: "📦", label: "Agricultural Loads" },
  { icon: "🏗️", label: "Other Farm Transport" },
];

export default function AgriculturalSection() {
  return (
    <section id="agricultural" className="bg-brand-charcoal py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-4">Agricultural Hauling</p>
            <h2 className="font-display font-bold text-white text-4xl sm:text-5xl leading-tight mb-5">
              MORE THAN
              <br />
              <span className="text-brand-red">CATTLE.</span>
            </h2>
            <p className="text-brand-off-white/70 leading-relaxed mb-6">
              Have something else that needs hauled? Send us the details and we&apos;ll let you know if it&apos;s something we can handle.
            </p>
            <div className="space-y-3 mb-8">
              {LOAD_TYPES.map((lt) => (
                <div key={lt.label} className="flex items-center gap-3">
                  <span className="text-xl">{lt.icon}</span>
                  <span className="text-brand-off-white/80 font-semibold">{lt.label}</span>
                </div>
              ))}
            </div>
            <div className="bg-brand-dark-gray rounded-lg border border-white/10 p-4 mb-6">
              <p className="text-white/50 text-sm">
                Not every agricultural load is listed above. If you&apos;re not sure whether we can handle it, send us the details — we&apos;ll let you know what we can do.
              </p>
            </div>
            <a href="#quote-form" className="inline-flex items-center gap-3 bg-brand-red text-white font-display font-bold tracking-widest uppercase px-7 py-4 rounded-md hover:bg-brand-red-dark transition-colors shadow-brand group">
              ASK ABOUT A HAUL
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="relative h-80 lg:h-full min-h-[400px] rounded-xl overflow-hidden border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BG} alt="Agricultural hauling Missouri" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-brand-black/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
