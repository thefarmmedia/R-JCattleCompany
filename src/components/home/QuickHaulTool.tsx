"use client";

import { useState } from "react";
import { Truck, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

type LoadType =
  | "Cattle"
  | "Calves"
  | "Cow/Calf Pairs"
  | "Bulls"
  | "Other Livestock"
  | "Farm Equipment"
  | "Hay / Feed"
  | "Other";

const LOAD_TYPES: LoadType[] = [
  "Cattle",
  "Calves",
  "Cow/Calf Pairs",
  "Bulls",
  "Other Livestock",
  "Farm Equipment",
  "Hay / Feed",
  "Other",
];

export default function QuickHaulTool() {
  const [step, setStep] = useState<"fields" | "contact" | "done">("fields");
  const [loadType, setLoadType] = useState<LoadType | "">(" ");
  const [headCount, setHeadCount] = useState("");
  const [equipment, setEquipment] = useState("");
  const [pickupZip, setPickupZip] = useState("");
  const [destZip, setDestZip] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState<"Call" | "Text" | "Either">("Either");

  const isEquipment = loadType === "Farm Equipment";

  function handleCheckAvailability(e: React.FormEvent) {
    e.preventDefault();
    if (!loadType || !pickupZip || !destZip || !date) return;
    setStep("contact");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone) return;
    setStep("done");
  }

  if (step === "done") {
    return (
      <section id="quick-haul" className="bg-brand-charcoal py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
            <Truck size={28} className="text-green-400" />
          </div>
          <h2 className="font-display font-bold text-white text-3xl mb-3">
            REQUEST RECEIVED
          </h2>
          <p className="text-brand-off-white/70">
            We got your hauling request. Someone will be in touch with you shortly to confirm details and availability.
          </p>
          <button
            onClick={() => {
              setStep("fields");
              setLoadType("");
              setHeadCount("");
              setPickupZip("");
              setDestZip("");
              setDate("");
              setName("");
              setPhone("");
            }}
            className="mt-6 text-brand-red text-sm underline"
          >
            Submit another request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="quick-haul" className="bg-brand-charcoal py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-brand-red text-xs font-bold tracking-[0.2em] uppercase mb-2">
            Fast Request
          </p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl">
            NEED A TRUCK?
          </h2>
          <p className="text-brand-off-white/60 mt-2">
            Fill this out in under a minute — right from your phone.
          </p>
        </div>

        {step === "fields" ? (
          <form
            onSubmit={handleCheckAvailability}
            className="bg-brand-dark-gray rounded-xl border border-white/10 p-6 lg:p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Load type */}
              <div className="sm:col-span-2">
                <label className="form-label">What are you moving?</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                  {LOAD_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setLoadType(type)}
                      className={`py-2.5 px-3 text-sm font-semibold rounded border transition-all text-center ${
                        loadType === type
                          ? "bg-brand-red border-brand-red text-white"
                          : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Head count or equipment */}
              <div>
                <label htmlFor="headCount" className="form-label">
                  {isEquipment ? "What Equipment?" : "How Many Head?"}
                </label>
                {isEquipment ? (
                  <input
                    id="headCount"
                    type="text"
                    className="form-input"
                    placeholder="e.g. John Deere tractor"
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                  />
                ) : (
                  <input
                    id="headCount"
                    type="number"
                    inputMode="numeric"
                    className="form-input"
                    placeholder="e.g. 42"
                    value={headCount}
                    onChange={(e) => setHeadCount(e.target.value)}
                    min="1"
                  />
                )}
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="form-label">
                  When do you need it moved?
                </label>
                <input
                  id="date"
                  type="date"
                  className="form-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              {/* Pickup ZIP */}
              <div>
                <label htmlFor="pickupZip" className="form-label">
                  Pickup ZIP
                </label>
                <input
                  id="pickupZip"
                  type="text"
                  inputMode="numeric"
                  className="form-input"
                  placeholder="65556"
                  value={pickupZip}
                  onChange={(e) => setPickupZip(e.target.value)}
                  maxLength={5}
                  required
                />
              </div>

              {/* Destination ZIP */}
              <div>
                <label htmlFor="destZip" className="form-label">
                  Destination ZIP
                </label>
                <input
                  id="destZip"
                  type="text"
                  inputMode="numeric"
                  className="form-input"
                  placeholder="65802"
                  value={destZip}
                  onChange={(e) => setDestZip(e.target.value)}
                  maxLength={5}
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                size="lg"
                fullWidth
                disabled={!loadType || !pickupZip || !destZip || !date}
              >
                CHECK AVAILABILITY <ChevronRight size={18} />
              </Button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-brand-dark-gray rounded-xl border border-white/10 p-6 lg:p-8"
          >
            <h3 className="font-display font-bold text-white text-xl mb-6">
              ALMOST DONE — WHO&apos;S CALLING?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-input"
                  placeholder="John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  className="form-input"
                  placeholder="(573) 555-0100"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="form-label">Preferred Contact Method</label>
                <div className="flex gap-3 mt-2">
                  {(["Call", "Text", "Either"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setContact(opt)}
                      className={`flex-1 py-3 text-sm font-bold rounded border transition-all ${
                        contact === opt
                          ? "bg-brand-red border-brand-red text-white"
                          : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setStep("fields")}
                className="flex-none px-5 py-3 border border-white/20 text-white/60 rounded font-semibold text-sm hover:text-white transition-colors"
              >
                Back
              </button>
              <Button type="submit" size="lg" fullWidth disabled={!name || !phone}>
                SEND HAUL REQUEST
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
