const STEPS = [
  {
    number: "01",
    title: "TELL US WHAT\nYOU'RE MOVING",
    desc: "Cattle, livestock, equipment, or another agricultural load. Give us the basics — type and count.",
    icon: "🐄",
  },
  {
    number: "02",
    title: "TELL US WHERE\nIT'S GOING",
    desc: "Give us the pickup, destination, and timeframe. The more detail, the better we can plan.",
    icon: "📍",
  },
  {
    number: "03",
    title: "WE REVIEW\nTHE HAUL",
    desc: "We review the route, load requirements, schedule, and availability before confirming anything.",
    icon: "📋",
  },
  {
    number: "04",
    title: "GET IT\nSCHEDULED",
    desc: "Once everything is confirmed, the haul gets scheduled. You'll know exactly what to expect.",
    icon: "✅",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-brand-charcoal py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">Simple Process</p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl">HOW IT WORKS</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative bg-brand-dark-gray rounded-xl border border-white/10 p-6 hover:border-brand-red/40 transition-colors group">
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-3 w-6 h-0.5 bg-brand-red/30 z-10" />
              )}
              <span className="text-5xl mb-4 block">{step.icon}</span>
              <span className="text-brand-red text-xs font-bold tracking-widest uppercase mb-2 block">Step {step.number}</span>
              <h3 className="font-display font-bold text-white text-lg leading-tight mb-3 whitespace-pre-line">{step.title}</h3>
              <p className="text-brand-off-white/60 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <div className="inline-block bg-brand-black rounded-xl border border-brand-red/20 px-10 py-6">
            <p className="font-display font-bold text-brand-red text-xl sm:text-2xl tracking-wide">TELL US WHAT YOU&apos;VE GOT.</p>
            <p className="font-display font-bold text-white text-xl sm:text-2xl tracking-wide">TELL US WHERE IT&apos;S AT.</p>
            <p className="font-display font-bold text-white text-xl sm:text-2xl tracking-wide">TELL US WHERE IT&apos;S GOING.</p>
            <p className="font-display font-bold text-brand-red/70 text-lg sm:text-xl tracking-wide mt-1">WE&apos;LL TAKE IT FROM THERE.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
