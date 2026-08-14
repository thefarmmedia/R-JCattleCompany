"use client";

import { useRef, useState } from "react";
import { Upload, X, Camera, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CanWeHaulIt() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [what, setWhat] = useState("");
  const [pickup, setPickup] = useState("");
  const [dest, setDest] = useState("");
  const [dims, setDims] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const arr = Array.from(files).slice(0, 6 - photos.length);
    const urls = arr.map((f) => URL.createObjectURL(f));
    setPhotos((p) => [...p, ...urls]);
  }

  function remove(i: number) {
    URL.revokeObjectURL(photos[i]);
    setPhotos((p) => p.filter((_, j) => j !== i));
  }

  if (submitted) {
    return (
      <section id="can-we-haul" className="bg-brand-charcoal py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle size={48} className="text-green-400 mx-auto mb-5" />
          <h2 className="font-display font-bold text-white text-3xl mb-3">DETAILS RECEIVED</h2>
          <p className="text-brand-off-white/60">We&apos;ll take a look and get back to you quickly.</p>
          <button onClick={() => { setSubmitted(false); setPhotos([]); setWhat(""); setPickup(""); setDest(""); }} className="mt-5 text-brand-red text-sm underline">
            Send another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="can-we-haul" className="bg-brand-charcoal py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-3">Not Sure?</p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl">
            NOT SURE IF WE<br />CAN MOVE IT?
          </h2>
          <p className="text-brand-off-white/60 mt-3 text-lg">Send us a picture.</p>
        </div>

        <div className="bg-brand-dark-gray rounded-xl border border-white/10 p-6 lg:p-8 space-y-5">
          <div>
            <label className="form-label flex items-center gap-2">
              <Camera size={13} className="text-brand-red" /> Photos (Optional but helpful)
            </label>
            <div
              className={`drop-zone p-10 text-center cursor-pointer rounded-lg ${dragging ? "active" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
              onClick={() => fileRef.current?.click()}
            >
              <Upload size={36} className="text-brand-red mx-auto mb-3" />
              <p className="text-white/70 font-semibold">Drop photos here or tap to choose</p>
              <p className="text-white/30 text-sm mt-1">Works great on mobile — snap it and send</p>
              <input ref={fileRef} type="file" accept="image/*" multiple className="sr-only"
                onChange={(e) => addFiles(e.target.files)} />
            </div>
            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {photos.map((src, i) => (
                  <div key={i} className="relative group aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="w-full h-full object-cover rounded-md" />
                    <button onClick={() => remove(i)}
                      className="absolute -top-1.5 -right-1.5 bg-brand-red rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={12} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="form-label">What is it?</label>
              <input type="text" className="form-input" placeholder="e.g. Grain bin sections, large boat, unusual equipment..."
                value={what} onChange={(e) => setWhat(e.target.value)} />
            </div>
            <div><label className="form-label">Pickup Location</label>
              <input type="text" className="form-input" placeholder="City or ZIP" value={pickup} onChange={(e) => setPickup(e.target.value)} /></div>
            <div><label className="form-label">Destination</label>
              <input type="text" className="form-input" placeholder="City or ZIP" value={dest} onChange={(e) => setDest(e.target.value)} /></div>
            <div><label className="form-label">Approx. Dimensions (Optional)</label>
              <input type="text" className="form-input" placeholder="e.g. 20×8×10 ft" value={dims} onChange={(e) => setDims(e.target.value)} /></div>
            <div><label className="form-label">Additional Notes</label>
              <input type="text" className="form-input" placeholder="Anything else..." value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
            <div><label className="form-label">Your Name *</label>
              <input type="text" className="form-input" placeholder="John Smith" value={name} onChange={(e) => setName(e.target.value)} required /></div>
            <div><label className="form-label">Phone *</label>
              <input type="tel" inputMode="tel" className="form-input" placeholder="(573) 555-0100" value={phone} onChange={(e) => setPhone(e.target.value)} required /></div>
          </div>

          <Button size="lg" fullWidth onClick={() => (name && phone) && setSubmitted(true)} disabled={!name || !phone}>
            SEND US THE DETAILS
          </Button>
        </div>
      </div>
    </section>
  );
}
