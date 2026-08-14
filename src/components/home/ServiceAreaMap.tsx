"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { BUSINESS } from "@/config/business";

const NEARBY_CITIES = [
  { name: "Richland", angle: 0, dist: 0, primary: true },
  { name: "Lebanon", angle: 45, dist: 0.3 },
  { name: "Waynesville", angle: 120, dist: 0.35 },
  { name: "Camdenton", angle: 350, dist: 0.38 },
  { name: "Rolla", angle: 80, dist: 0.55 },
  { name: "Springfield", angle: 220, dist: 0.7 },
  { name: "Jefferson City", angle: 20, dist: 0.72 },
  { name: "Lake of the Ozarks", angle: 310, dist: 0.45 },
  { name: "Fort Leonard Wood", angle: 150, dist: 0.42 },
];

const RINGS = [
  { label: "0–75 mi", sub: "Local Hauling", color: "rgba(34,197,94,0.25)", border: "rgba(34,197,94,0.5)", r: 0.22 },
  { label: "75–150 mi", sub: "Core Service Area", color: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.4)", r: 0.44 },
  { label: "150–300 mi", sub: "Regional Hauling", color: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.3)", r: 0.72 },
];

export default function ServiceAreaMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!animated) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.5);
    bg.addColorStop(0, "#1a1a1a");
    bg.addColorStop(1, "#0a0a0a");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    [...RINGS].reverse().forEach(({ color, border, r }) => {
      const radius = r * (W * 0.48);
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20);
    glowGrad.addColorStop(0, "rgba(204,27,27,0.6)");
    glowGrad.addColorStop(1, "rgba(204,27,27,0)");
    ctx.fillStyle = glowGrad;
    ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "#CC1B1B";
    ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();

    NEARBY_CITIES.filter((c) => !c.primary).forEach(({ name, angle, dist }) => {
      const rad = (angle * Math.PI) / 180;
      const r = dist * (W * 0.48);
      const x = cx + Math.cos(rad) * r;
      const y = cy + Math.sin(rad) * r;

      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2); ctx.fill();

      ctx.font = "bold 10px Inter, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.textAlign = "center";
      ctx.fillText(name, x, y - 8);
    });

    ctx.font = "bold 13px Inter, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("Richland, MO", cx, cy + 20);

    RINGS.forEach(({ label, border, r }) => {
      const radius = r * (W * 0.48);
      const lx = cx + Math.cos(-0.4) * radius;
      const ly = cy + Math.sin(-0.4) * radius;
      ctx.font = "bold 10px Inter, sans-serif";
      ctx.fillStyle = border;
      ctx.textAlign = "left";
      ctx.fillText(label, lx + 4, ly - 4);
    });

    ctx.font = "10px Inter, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.textAlign = "center";
    ctx.fillText("Long-Distance By Request", cx, cy + H * 0.45);
  }, [animated]);

  return (
    <section id="service-area" className="bg-brand-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Where We Work
          </p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl">
            SERVICE AREA
          </h2>
          <p className="text-brand-off-white/60 mt-4 max-w-2xl mx-auto">
            Based in Richland, Missouri — serving local, regional, and long-distance hauling requests throughout Missouri and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <div className="relative rounded-xl overflow-hidden border border-white/10">
              <canvas
                ref={canvasRef}
                width={600}
                height={500}
                className="w-full h-auto"
                aria-label="Service area map centered on Richland, Missouri"
              />
              <div className="absolute bottom-3 left-3 text-[10px] text-white/30">
                Areas shown are approximate. Contact for route-specific availability.
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {[
              {
                range: "0–75 MILES",
                label: "LOCAL HAULING",
                desc: "Nearby farm-to-farm, sale barn, livestock, equipment, and agricultural hauling.",
                color: "border-green-500 bg-green-500/10 text-green-400",
              },
              {
                range: "75–150 MILES",
                label: "CORE SERVICE AREA",
                desc: "Primary regional operating territory for regular hauling operations.",
                color: "border-blue-500 bg-blue-500/10 text-blue-400",
              },
              {
                range: "150–300 MILES",
                label: "REGIONAL HAULING",
                desc: "Available depending on load, schedule, equipment, and destination.",
                color: "border-amber-500 bg-amber-500/10 text-amber-400",
              },
              {
                range: "300+ MILES",
                label: "LONG-DISTANCE BY REQUEST",
                desc: "Got a longer haul? Send us the details. Multi-state hauling may be available.",
                color: "border-red-700 bg-red-900/20 text-red-400",
              },
            ].map((item) => (
              <div
                key={item.range}
                className={`rounded-lg border p-4 ${item.color}`}
              >
                <p className="text-xs font-bold tracking-widest opacity-70">{item.range}</p>
                <p className="font-display font-bold text-base mt-0.5">{item.label}</p>
                <p className="text-sm mt-1.5 opacity-70 leading-relaxed">{item.desc}</p>
              </div>
            ))}

            <div className="rounded-lg bg-brand-charcoal border border-white/10 p-4">
              <p className="text-white font-bold mb-2">Nearby Areas Include:</p>
              <div className="flex flex-wrap gap-1.5">
                {BUSINESS.serviceAreaCities.map((city) => (
                  <span
                    key={city}
                    className="px-2.5 py-1 bg-brand-dark-gray rounded text-xs text-white/60 border border-white/10"
                  >
                    <MapPin size={9} className="inline mr-1" />
                    {city}
                  </span>
                ))}
              </div>
              <p className="text-white/30 text-xs mt-3">And surrounding areas — this is not an exhaustive list.</p>
            </div>

            <a
              href="#quote-form"
              className="block w-full bg-brand-red text-white text-center font-display font-bold tracking-widest uppercase py-4 rounded-md hover:bg-brand-red-dark transition-colors shadow-brand"
            >
              ASK ABOUT A LONGER HAUL
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
