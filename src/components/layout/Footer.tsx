import Image from "next/image";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { BUSINESS, buildCallLink } from "@/config/business";

const footerNav = {
  Pages: [
    { label: "Home", href: "/" },
    { label: "Cattle Hauling", href: "#cattle-hauling" },
    { label: "Agricultural Hauling", href: "#agricultural" },
    { label: "Equipment Hauling", href: "#equipment-hauling" },
    { label: "Service Area", href: "#service-area" },
    { label: "Gallery", href: "#gallery" },
    { label: "Request a Haul", href: "#quote-form" },
    { label: "Contact", href: "#contact" },
  ],
  Tools: [
    { label: "Quick Haul Request", href: "#quick-haul" },
    { label: "Route Checker", href: "#route-checker" },
    { label: "Equipment Hauling", href: "#equipment-hauling" },
    { label: "Send Us a Photo", href: "#can-we-haul" },
    { label: "Customer Portal", href: "/customer-portal-demo" },
    { label: "Dispatch Dashboard", href: "/dispatch-demo" },
  ],
};

export default function Footer() {
  const callLink = buildCallLink(BUSINESS.phone);

  return (
    <footer id="contact" className="bg-brand-black border-t border-white/10">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src={BUSINESS.logo}
              alt={BUSINESS.logoAlt}
              width={100}
              height={100}
              className="h-20 w-auto mb-5"
            />
            <p className="font-display font-bold text-white text-xl mb-1">
              PEMBERTON CATTLE CO.
            </p>
            <p className="text-brand-off-white/50 text-sm mb-5">
              Cattle • Livestock • Agricultural Hauling
            </p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 text-sm text-brand-off-white/60">
                <MapPin size={14} className="mt-0.5 text-brand-red shrink-0" />
                <span>
                  {BUSINESS.city}, {BUSINESS.state}
                </span>
              </div>
              <a
                href={callLink}
                className="flex items-center gap-2.5 text-sm text-brand-off-white/60 hover:text-white transition-colors"
              >
                <Phone size={14} className="text-brand-red shrink-0" />
                {BUSINESS.phoneDisplay}
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-2.5 text-sm text-brand-off-white/60 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-brand-red shrink-0" />
                {BUSINESS.email}
              </a>
            </div>
            <div className="flex items-center gap-4 mt-6">
              {BUSINESS.facebook && (
                <a
                  href={BUSINESS.facebook}
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <ExternalLink size={20} />
                </a>
              )}
              {BUSINESS.instagram && (
                <a
                  href={BUSINESS.instagram}
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-display font-bold text-white text-sm tracking-widest uppercase mb-5">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-brand-off-white/50 hover:text-brand-red transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA */}
          <div>
            <h3 className="font-display font-bold text-white text-sm tracking-widest uppercase mb-5">
              GET IN TOUCH
            </h3>
            <p className="text-brand-off-white/60 text-sm leading-relaxed mb-6">
              Need something moved? Tell us what you&apos;ve got, where it&apos;s at, and where it&apos;s going.
            </p>
            <a
              href="#quote-form"
              className="block w-full bg-brand-red text-white text-center py-3.5 rounded-md font-display font-bold tracking-widest uppercase text-sm hover:bg-brand-red-dark transition-colors mb-3"
            >
              REQUEST A HAUL
            </a>
            <a
              href={callLink}
              className="block w-full border border-white/20 text-white text-center py-3.5 rounded-md font-display font-bold tracking-widest uppercase text-sm hover:bg-white/5 transition-colors"
            >
              CALL NOW
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-4 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-brand-off-white/30">
          <p>
            © {new Date().getFullYear()} {BUSINESS.businessName} — {BUSINESS.city}, {BUSINESS.stateAbbr}. All rights reserved.
          </p>
          <p>
            Service areas shown are approximate. Availability depends on load, route, equipment, and schedule.
          </p>
        </div>
      </div>
    </footer>
  );
}
