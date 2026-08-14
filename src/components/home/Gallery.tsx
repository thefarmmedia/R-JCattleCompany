"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const CATEGORIES = ["All", "Cattle", "Trucks", "Trailers", "Farms"] as const;
type Category = typeof CATEGORIES[number];

interface GalleryItem {
  id: number;
  url: string;
  title: string;
  category: Exclude<Category, "All">;
}

const GALLERY: GalleryItem[] = [
  { id: 1, url: "/1.jpg", title: "Pemberton Cattle", category: "Cattle" },
  { id: 2, url: "/2.jpg", title: "On the Road", category: "Trucks" },
  { id: 3, url: "/3.jpg", title: "Livestock Haul", category: "Cattle" },
  { id: 4, url: "/4.jpg", title: "Pemberton Trailer", category: "Trailers" },
  { id: 5, url: "/5.jpg", title: "Missouri Farmland", category: "Farms" },
  { id: 6, url: "/6.jpg", title: "Ready to Load", category: "Cattle" },
];

export default function Gallery() {
  const [active, setActive] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? GALLERY : GALLERY.filter((g) => g.category === active);
  const lb = lightbox !== null ? filtered[lightbox] : null;

  function prev() { setLightbox((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : 0)); }
  function next() { setLightbox((i) => (i !== null ? (i + 1) % filtered.length : 0)); }

  return (
    <section id="gallery" className="bg-brand-dark-gray py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">Gallery</p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl mb-2">HAUL GALLERY</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${
                active === cat ? "bg-brand-red text-white" : "bg-brand-charcoal border border-white/15 text-white/60 hover:border-white/40 hover:text-white"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
          {filtered.map((item, i) => (
            <div key={item.id}
              className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group border border-white/5 hover:border-brand-red/30 transition-all"
              onClick={() => setLightbox(i)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/40 transition-colors flex items-center justify-center">
                <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-white text-xs font-bold">{item.title}</p>
                <p className="text-white/50 text-[10px]">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lb && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)} role="dialog" aria-modal="true" aria-label={lb.title}>
          <button className="absolute top-4 right-4 text-white/60 hover:text-white z-10" onClick={() => setLightbox(null)} aria-label="Close"><X size={28} /></button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white z-10 p-2" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous"><ChevronLeft size={36} /></button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white z-10 p-2" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next"><ChevronRight size={36} /></button>
          <div className="max-w-4xl max-h-[85vh] px-16" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lb.url} alt={lb.title} className="max-w-full max-h-[80vh] object-contain rounded-lg" />
            <p className="text-center text-white/70 text-sm mt-3">{lb.title}</p>
          </div>
        </div>
      )}
    </section>
  );
}
