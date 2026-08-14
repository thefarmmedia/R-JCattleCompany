import CattleHaulForm from "@/components/forms/CattleHaulForm";

const BG_CATTLE = "/2.jpg";

export default function CattleHaulingSection() {
  return (
    <section id="cattle-hauling" className="bg-brand-black">
      {/* Hero banner */}
      <div className="relative h-80 lg:h-[440px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BG_CATTLE}
          alt="Cattle and livestock hauling"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/60 to-brand-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-5xl mx-auto px-6 lg:px-16 w-full">
            <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Primary Service
            </p>
            <h2 className="font-display font-bold text-white text-4xl sm:text-6xl leading-tight mb-4">
              CATTLE &amp; LIVESTOCK
              <br />
              <span className="text-brand-red">HAULING</span>
            </h2>
            <p className="text-brand-off-white/70 text-lg max-w-xl leading-relaxed">
              From farm-to-farm moves to sale barns and other agricultural destinations — tell us what
              you&apos;re moving, where they&apos;re at, and where they need to go.
            </p>
            <div className="mt-6">
              <a
                href="#quote-form"
                className="inline-flex items-center gap-2 bg-brand-red text-white font-display font-bold tracking-widest uppercase px-8 py-4 rounded-md hover:bg-brand-red-dark transition-colors shadow-brand"
              >
                REQUEST CATTLE HAULING
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quote form */}
      <div className="py-4 bg-brand-charcoal">
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-2 text-center">
          <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-2">Step-by-Step</p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl">
            NEED CATTLE MOVED?
          </h2>
          <p className="text-brand-off-white/60 mt-3 text-lg max-w-xl mx-auto">
            Tell us what you&apos;ve got, where they&apos;re at, and where they&apos;re going.
          </p>
        </div>
        <CattleHaulForm />
      </div>
    </section>
  );
}
