"use client";

import { useState } from "react";
import { Truck } from "lucide-react";
import Button from "@/components/ui/Button";

const BG = "https://images.unsplash.com/photo-1605152276897-4f618f831968?w=1200&q=75";

export default function SaleBarnSection() {
  const [form, setForm] = useState({ head: "", pickupZip: "", saleBarn: "", date: "", name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="sale-barn" className="bg-brand-charcoal py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-64 lg:h-full min-h-[360px] rounded-xl overflow-hidden border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BG}
              alt="Sale barn cattle transport"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white/50">
                Sale Barn Transport
              </span>
            </div>
          </div>

          <div>
            <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Sale Barn Service
            </p>
            <h2 className="font-display font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
              HEADED TO THE
              <br />
              SALE BARN?
            </h2>
            <p className="text-brand-off-white/70 leading-relaxed mb-8">
              Need cattle picked up and transported to the sale barn? Send us the number of head, pickup
              location, destination, and date. We&apos;ll review the haul and let you know about availability.
            </p>

            {submitted ? (
              <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-6 text-center">
                <Truck size={32} className="text-green-400 mx-auto mb-3" />
                <p className="font-display font-bold text-white text-xl">REQUEST RECEIVED</p>
                <p className="text-brand-off-white/60 text-sm mt-2">We&apos;ll be in touch shortly about your sale barn haul.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Number of Head</label>
                    <input type="number" inputMode="numeric" className="form-input" placeholder="e.g. 20"
                      value={form.head} onChange={(e) => setForm({ ...form, head: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">Pickup ZIP</label>
                    <input type="text" inputMode="numeric" className="form-input" placeholder="65536"
                      value={form.pickupZip} onChange={(e) => setForm({ ...form, pickupZip: e.target.value })} maxLength={5} />
                  </div>
                </div>
                <div>
                  <label className="form-label">Sale Barn / Destination</label>
                  <input type="text" className="form-input" placeholder="Sale barn name or city"
                    value={form.saleBarn} onChange={(e) => setForm({ ...form, saleBarn: e.target.value })} required />
                </div>
                <div>
                  <label className="form-label">Date Needed</label>
                  <input type="date" className="form-input" value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Your Name</label>
                    <input type="text" className="form-input" placeholder="John Smith"
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">Phone</label>
                    <input type="tel" inputMode="tel" className="form-input" placeholder="(573) 555-0100"
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                  </div>
                </div>
                <Button type="submit" size="lg" fullWidth>
                  REQUEST SALE BARN HAULING
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
