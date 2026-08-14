import { MessageSquare, ArrowRight } from "lucide-react";
import { BUSINESS, buildSMSLink, buildSMSTemplate, buildCallLink } from "@/config/business";

export default function TextUsSection() {
  const cattleSMS = buildSMSLink(BUSINESS.smsNumber, buildSMSTemplate("cattle"));
  const equipSMS = buildSMSLink(BUSINESS.smsNumber, buildSMSTemplate("equipment"));
  const callLink = buildCallLink(BUSINESS.phone);

  return (
    <section className="bg-brand-black py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-brand-charcoal rounded-2xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">Skip the Form</p>
              <h2 className="font-display font-bold text-white text-4xl leading-tight mb-4">
                DON&apos;T WANT TO FILL OUT A FORM?
              </h2>
              <p className="text-brand-off-white/70 text-lg mb-8">Text us what you&apos;ve got.</p>
              <div className="space-y-3">
                <a href={cattleSMS} className="flex items-center justify-between gap-4 bg-brand-red text-white rounded-lg px-6 py-4 font-display font-bold tracking-wide uppercase hover:bg-brand-red-dark transition-colors group shadow-brand">
                  <div className="flex items-center gap-3"><MessageSquare size={20} /><span>TEXT A CATTLE HAUL</span></div>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href={equipSMS} className="flex items-center justify-between gap-4 bg-brand-dark-gray border border-white/15 text-white rounded-lg px-6 py-4 font-display font-bold tracking-wide uppercase hover:border-white/30 transition-colors group">
                  <div className="flex items-center gap-3"><MessageSquare size={20} /><span>TEXT AN EQUIPMENT HAUL</span></div>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href={callLink} className="flex items-center justify-between gap-4 bg-brand-dark-gray border border-white/15 text-white rounded-lg px-6 py-4 font-display font-bold tracking-wide uppercase hover:border-white/30 transition-colors group">
                  <div className="flex items-center gap-3"><span>📞</span><span>CALL DIRECTLY</span></div>
                  <span className="text-brand-red font-mono text-sm">{BUSINESS.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="bg-brand-dark-gray p-8 lg:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10">
              <p className="text-brand-off-white/40 text-xs font-bold tracking-widest uppercase mb-4">Pre-filled Message Example</p>
              <div className="bg-brand-black rounded-xl p-5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <MessageSquare size={14} className="text-white" />
                  </div>
                  <div><p className="text-white text-xs font-bold">To: Pemberton Cattle Co.</p></div>
                </div>
                <div className="bg-brand-charcoal rounded-lg p-4 rounded-tl-none">
                  <p className="text-white/80 text-sm leading-relaxed">
                    Hi, I&apos;m looking for someone to haul _____ head from _____ to _____ around _____.
                  </p>
                </div>
                <p className="text-white/30 text-xs mt-3 text-center">Tap the button above to start this message</p>
              </div>
              <div className="mt-5 bg-brand-black rounded-xl p-4 border border-white/10">
                <p className="text-brand-off-white/40 text-xs font-bold tracking-widest uppercase mb-2">Equipment Version</p>
                <div className="bg-brand-charcoal rounded-lg p-3 rounded-tl-none">
                  <p className="text-white/70 text-xs leading-relaxed">Hi, I need a _____ moved from _____ to _____ around _____.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
