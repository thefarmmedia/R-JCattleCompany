"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { BUSINESS, buildCallLink, buildSMSLink, buildSMSTemplate } from "@/config/business";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "#",
    children: [
      { label: "Cattle Hauling", href: "#cattle-hauling" },
      { label: "Equipment Hauling", href: "#equipment-hauling" },
      { label: "Sale Barn", href: "#sale-barn" },
      { label: "Farm to Farm", href: "#farm-to-farm" },
      { label: "Hay & Agricultural", href: "#agricultural" },
    ],
  },
  { label: "Service Area", href: "#service-area" },
  { label: "Gallery", href: "#gallery" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const callLink = buildCallLink(BUSINESS.phone);
  const smsLink = buildSMSLink(BUSINESS.smsNumber, buildSMSTemplate("cattle"));

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-brand-black/95 backdrop-blur-md shadow-dark"
            : "bg-gradient-to-b from-black/80 to-transparent"
        )}
      >
        {/* Top bar */}
        <div className="hidden lg:flex items-center justify-between bg-brand-red px-6 py-1.5">
          <p className="text-white/90 text-xs font-medium tracking-wide">
            {BUSINESS.businessName} — {BUSINESS.city}, {BUSINESS.stateAbbr} &nbsp;|&nbsp; Cattle • Livestock • Agricultural Hauling
          </p>
          <div className="flex items-center gap-4">
            <a
              href={callLink}
              className="text-white text-xs font-bold tracking-wide flex items-center gap-1.5 hover:text-white/80 transition-colors"
            >
              <Phone size={12} />
              {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Main nav */}
        <div className="px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between max-w-[1400px] mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src={BUSINESS.logo}
              alt={BUSINESS.logoAlt}
              width={56}
              height={56}
              className="h-12 w-auto"
              priority
            />
            <div className="hidden sm:block">
              <p className="font-display font-bold text-white text-lg leading-tight">
                PEMBERTON
              </p>
              <p className="font-display text-brand-red text-sm tracking-widest leading-tight">
                CATTLE CO.
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative">
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-sm font-semibold tracking-wide text-white/80 hover:text-white transition-colors uppercase rounded"
                    onClick={() =>
                      setOpenDropdown(openDropdown === link.label ? null : link.label)
                    }
                    onBlur={() => setTimeout(() => setOpenDropdown(null), 150)}
                  >
                    {link.label}
                    <ChevronDown size={14} className={cn("transition-transform", openDropdown === link.label && "rotate-180")} />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-brand-charcoal border border-white/10 rounded-lg shadow-dark-lg py-1 z-50">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-semibold tracking-wide text-white/80 hover:text-white transition-colors uppercase rounded"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={callLink}
              className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold tracking-wide transition-colors"
            >
              <Phone size={15} />
              CALL
            </a>
            <Button
              size="md"
              onClick={() => {
                const el = document.getElementById("quote-form");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              REQUEST A HAUL
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden bg-brand-charcoal border-t border-white/10">
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="px-4 py-2 text-xs font-bold tracking-widest text-brand-red uppercase">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-8 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block px-4 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/5 rounded uppercase tracking-wide transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              )}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <a
                  href={callLink}
                  className="flex items-center justify-center gap-2 bg-brand-dark-gray text-white py-3 rounded-md font-bold tracking-wide uppercase text-sm"
                >
                  <Phone size={16} /> CALL NOW
                </a>
                <a
                  href={smsLink}
                  className="flex items-center justify-center gap-2 bg-brand-dark-gray text-white py-3 rounded-md font-bold tracking-wide uppercase text-sm"
                >
                  TEXT US
                </a>
                <a
                  href="#quote-form"
                  className="flex items-center justify-center gap-2 bg-brand-red text-white py-3 rounded-md font-bold tracking-wide uppercase text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  REQUEST A HAUL
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
