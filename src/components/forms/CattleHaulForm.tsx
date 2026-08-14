"use client";

import { useState, useRef } from "react";
import { ChevronRight, ChevronLeft, Upload, X, CheckCircle, Truck, MapPin, Calendar, User } from "lucide-react";
import { estimateDemoDistance, classifyMileage } from "@/lib/utils";
import Button from "@/components/ui/Button";
import DemoBadge from "@/components/ui/DemoBadge";

// ─── Types ─────────────────────────────────────────────────────────────────
type LivestockType =
  | "Cattle" | "Calves" | "Bulls" | "Cows" | "Cow/Calf Pairs" | "Feeder Cattle" | "Other Livestock";

type LocationType = "Farm" | "Ranch" | "Sale Barn" | "Feedlot" | "Other";
type Timeline = "ASAP" | "Tomorrow" | "This Week" | "Next Week" | "Flexible" | "Choose Date";
type ContactPref = "Call" | "Text" | "Either";

interface FormData {
  livestock: LivestockType | "";
  headCount: string;
  avgWeight: string;
  additionalDetails: string;

  pickupAddress: string;
  pickupCity: string;
  pickupState: string;
  pickupZip: string;
  pickupLocationType: LocationType | "";
  pickupFacilities: "Yes" | "No" | "Not Sure" | "";

  destAddress: string;
  destCity: string;
  destState: string;
  destZip: string;
  destLocationType: LocationType | "";
  destFacilities: "Yes" | "No" | "Not Sure" | "";

  timeline: Timeline | "";
  chosenDate: string;

  specialNotes: string;
  photos: File[];

  fullName: string;
  farmName: string;
  phone: string;
  email: string;
  contactPref: ContactPref;
}

const LIVESTOCK_OPTIONS: LivestockType[] = [
  "Cattle", "Calves", "Bulls", "Cows", "Cow/Calf Pairs", "Feeder Cattle", "Other Livestock",
];

const LOCATION_TYPES: LocationType[] = ["Farm", "Ranch", "Sale Barn", "Feedlot", "Other"];
const TIMELINES: Timeline[] = ["ASAP", "Tomorrow", "This Week", "Next Week", "Flexible", "Choose Date"];

const STEPS = [
  { label: "What", icon: Truck },
  { label: "How Many", icon: Truck },
  { label: "Pickup", icon: MapPin },
  { label: "Delivery", icon: MapPin },
  { label: "Timeline", icon: Calendar },
  { label: "Details", icon: Upload },
  { label: "You", icon: User },
];

const EMPTY_FORM: FormData = {
  livestock: "",
  headCount: "",
  avgWeight: "",
  additionalDetails: "",
  pickupAddress: "",
  pickupCity: "",
  pickupState: "MO",
  pickupZip: "",
  pickupLocationType: "",
  pickupFacilities: "",
  destAddress: "",
  destCity: "",
  destState: "MO",
  destZip: "",
  destLocationType: "",
  destFacilities: "",
  timeline: "",
  chosenDate: "",
  specialNotes: "",
  photos: [],
  fullName: "",
  farmName: "",
  phone: "",
  email: "",
  contactPref: "Either",
};

export default function CattleHaulForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({ ...EMPTY_FORM });
  const [submitted, setSubmitted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFiles(files: FileList | null) {
    if (!files) return;
    const arr = Array.from(files).slice(0, 6 - form.photos.length);
    const newPreviews = arr.map((f) => URL.createObjectURL(f));
    setForm((prev) => ({ ...prev, photos: [...prev.photos, ...arr] }));
    setPreviews((prev) => [...prev, ...newPreviews]);
  }

  function removePhoto(idx: number) {
    URL.revokeObjectURL(previews[idx]);
    setForm((prev) => ({ ...prev, photos: prev.photos.filter((_, i) => i !== idx) }));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  }

  function canAdvance(): boolean {
    switch (step) {
      case 0: return !!form.livestock;
      case 1: return !!form.headCount;
      case 2: return !!form.pickupCity && !!form.pickupZip;
      case 3: return !!form.destCity && !!form.destZip;
      case 4: return !!form.timeline;
      case 5: return true;
      case 6: return !!form.fullName && !!form.phone;
      default: return true;
    }
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  const estimatedMiles = estimateDemoDistance(form.pickupZip, form.destZip);
  const mileageInfo = estimatedMiles > 0 ? classifyMileage(estimatedMiles) : null;

  if (submitted) {
    return (
      <div className="text-center py-16 px-4" id="quote-form">
        <div className="max-w-lg mx-auto">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h2 className="font-display font-bold text-white text-4xl mb-3">
            YOUR HAUL REQUEST IS READY
          </h2>
          <div className="bg-brand-charcoal rounded-xl border border-white/10 p-6 text-left mt-6 space-y-3">
            <Row label="Livestock" value={form.livestock} />
            <Row label="Head Count" value={form.headCount} />
            <Row label="Pickup" value={`${form.pickupCity}, ${form.pickupState}`} />
            <Row label="Destination" value={`${form.destCity}, ${form.destState}`} />
            <Row label="Requested" value={form.timeline === "Choose Date" ? form.chosenDate : form.timeline} />
            {mileageInfo && (
              <>
                <Row label="Est. Distance" value={`~${estimatedMiles} Miles (Demo)`} />
                <Row label="Haul Type" value={mileageInfo.label} />
              </>
            )}
          </div>
          <p className="text-brand-off-white/50 text-sm mt-4">
            This is a demo submission. In production, this triggers an immediate CRM notification and customer confirmation.
          </p>
          <div className="flex gap-3 justify-center mt-6">
            <Button size="lg" onClick={() => { setSubmitted(false); setStep(0); setForm({ ...EMPTY_FORM }); setPreviews([]); }}>
              NEW REQUEST
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="quote-form" className="max-w-2xl mx-auto px-4 py-12">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center gap-1 flex-1 ${
                i < step ? "cursor-pointer" : ""
              }`}
              onClick={() => i < step && setStep(i)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step
                    ? "bg-brand-red text-white"
                    : i === step
                    ? "bg-brand-red text-white ring-4 ring-brand-red/30"
                    : "bg-white/10 text-white/40"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-[10px] font-semibold tracking-wide hidden sm:block ${
                i === step ? "text-brand-red" : i < step ? "text-white/60" : "text-white/30"
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-red rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="bg-brand-charcoal rounded-xl border border-white/10 p-6 lg:p-8 min-h-[380px]">
        {step === 0 && <Step0 form={form} update={update} />}
        {step === 1 && <Step1 form={form} update={update} />}
        {step === 2 && <Step2 form={form} update={update} />}
        {step === 3 && <Step3 form={form} update={update} />}
        {step === 4 && <Step4 form={form} update={update} />}
        {step === 5 && (
          <Step5
            form={form}
            update={update}
            dragging={dragging}
            setDragging={setDragging}
            previews={previews}
            handleFiles={handleFiles}
            removePhoto={removePhoto}
            fileRef={fileRef}
          />
        )}
        {step === 6 && <Step6 form={form} update={update} />}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3 mt-5">
        {step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-2 px-5 py-3.5 border border-white/20 text-white/60 rounded-md font-semibold text-sm hover:text-white hover:border-white/40 transition-colors"
          >
            <ChevronLeft size={16} /> Back
          </button>
        )}
        <div className="flex-1" />
        {step < STEPS.length - 1 ? (
          <Button size="lg" onClick={() => setStep((s) => s + 1)} disabled={!canAdvance()}>
            NEXT <ChevronRight size={18} />
          </Button>
        ) : (
          <Button size="lg" onClick={handleSubmit} disabled={!canAdvance()}>
            SEND HAUL REQUEST <CheckCircle size={18} />
          </Button>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-2">
      <span className="text-brand-off-white/50 text-sm">{label}</span>
      <span className="text-white font-semibold text-sm">{value}</span>
    </div>
  );
}

function Step0({ form, update }: { form: FormData; update: <K extends keyof FormData>(k: K, v: FormData[K]) => void }) {
  return (
    <div>
      <h3 className="font-display font-bold text-white text-2xl mb-1">WHAT ARE WE MOVING?</h3>
      <p className="text-brand-off-white/50 text-sm mb-6">Select the type of livestock.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {LIVESTOCK_OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => update("livestock", opt)}
            className={`py-4 px-3 rounded-lg border text-sm font-bold text-center transition-all ${
              form.livestock === opt
                ? "bg-brand-red border-brand-red text-white shadow-brand"
                : "border-white/15 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step1({ form, update }: { form: FormData; update: <K extends keyof FormData>(k: K, v: FormData[K]) => void }) {
  return (
    <div>
      <h3 className="font-display font-bold text-white text-2xl mb-1">HOW MANY HEAD?</h3>
      <p className="text-brand-off-white/50 text-sm mb-6">Tell us about the load.</p>
      <div className="space-y-5">
        <div>
          <label className="form-label">Number of Head *</label>
          <input
            type="number"
            inputMode="numeric"
            className="form-input text-xl font-bold"
            placeholder="42"
            value={form.headCount}
            onChange={(e) => update("headCount", e.target.value)}
            min="1"
            required
          />
        </div>
        <div>
          <label className="form-label">Average Weight (Optional)</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. 650 lbs"
            value={form.avgWeight}
            onChange={(e) => update("avgWeight", e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Additional Details (Optional)</label>
          <textarea
            className="form-input resize-none"
            rows={3}
            placeholder="Anything else we should know about the load..."
            value={form.additionalDetails}
            onChange={(e) => update("additionalDetails", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function Step2({ form, update }: { form: FormData; update: <K extends keyof FormData>(k: K, v: FormData[K]) => void }) {
  return (
    <div>
      <h3 className="font-display font-bold text-white text-2xl mb-1">WHERE ARE THEY AT?</h3>
      <p className="text-brand-off-white/50 text-sm mb-6">Pickup location details.</p>
      <div className="space-y-4">
        <div>
          <label className="form-label">Pickup Address (Optional)</label>
          <input type="text" className="form-input" placeholder="Street address" value={form.pickupAddress}
            onChange={(e) => update("pickupAddress", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">City *</label>
            <input type="text" className="form-input" placeholder="Lebanon" value={form.pickupCity}
              onChange={(e) => update("pickupCity", e.target.value)} required />
          </div>
          <div>
            <label className="form-label">State</label>
            <input type="text" className="form-input" value={form.pickupState}
              onChange={(e) => update("pickupState", e.target.value)} maxLength={2} />
          </div>
        </div>
        <div>
          <label className="form-label">ZIP *</label>
          <input type="text" inputMode="numeric" className="form-input" placeholder="65536" value={form.pickupZip}
            onChange={(e) => update("pickupZip", e.target.value)} maxLength={5} required />
        </div>
        <div>
          <label className="form-label">Location Type</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {LOCATION_TYPES.map((t) => (
              <button key={t} type="button"
                onClick={() => update("pickupLocationType", t)}
                className={`px-4 py-2 text-sm font-semibold rounded border transition-all ${
                  form.pickupLocationType === t
                    ? "bg-brand-red border-brand-red text-white"
                    : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="form-label">Loading Facilities Available?</label>
          <div className="flex gap-3 mt-1">
            {(["Yes", "No", "Not Sure"] as const).map((opt) => (
              <button key={opt} type="button"
                onClick={() => update("pickupFacilities", opt)}
                className={`flex-1 py-2.5 text-sm font-bold rounded border transition-all ${
                  form.pickupFacilities === opt
                    ? "bg-brand-red border-brand-red text-white"
                    : "border-white/20 text-white/60 hover:text-white"
                }`}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3({ form, update }: { form: FormData; update: <K extends keyof FormData>(k: K, v: FormData[K]) => void }) {
  return (
    <div>
      <h3 className="font-display font-bold text-white text-2xl mb-1">WHERE ARE THEY GOING?</h3>
      <p className="text-brand-off-white/50 text-sm mb-6">Destination details.</p>
      <div className="space-y-4">
        <div>
          <label className="form-label">Destination Address (Optional)</label>
          <input type="text" className="form-input" placeholder="Street address" value={form.destAddress}
            onChange={(e) => update("destAddress", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">City *</label>
            <input type="text" className="form-input" placeholder="Springfield" value={form.destCity}
              onChange={(e) => update("destCity", e.target.value)} required />
          </div>
          <div>
            <label className="form-label">State</label>
            <input type="text" className="form-input" value={form.destState}
              onChange={(e) => update("destState", e.target.value)} maxLength={2} />
          </div>
        </div>
        <div>
          <label className="form-label">ZIP *</label>
          <input type="text" inputMode="numeric" className="form-input" placeholder="65802" value={form.destZip}
            onChange={(e) => update("destZip", e.target.value)} maxLength={5} required />
        </div>
        <div>
          <label className="form-label">Destination Type</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {LOCATION_TYPES.map((t) => (
              <button key={t} type="button"
                onClick={() => update("destLocationType", t)}
                className={`px-4 py-2 text-sm font-semibold rounded border transition-all ${
                  form.destLocationType === t
                    ? "bg-brand-red border-brand-red text-white"
                    : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="form-label">Unloading Facilities Available?</label>
          <div className="flex gap-3 mt-1">
            {(["Yes", "No", "Not Sure"] as const).map((opt) => (
              <button key={opt} type="button"
                onClick={() => update("destFacilities", opt)}
                className={`flex-1 py-2.5 text-sm font-bold rounded border transition-all ${
                  form.destFacilities === opt
                    ? "bg-brand-red border-brand-red text-white"
                    : "border-white/20 text-white/60 hover:text-white"
                }`}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step4({ form, update }: { form: FormData; update: <K extends keyof FormData>(k: K, v: FormData[K]) => void }) {
  return (
    <div>
      <h3 className="font-display font-bold text-white text-2xl mb-1">WHEN DO THEY NEED MOVED?</h3>
      <p className="text-brand-off-white/50 text-sm mb-6">Select a timeframe.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {TIMELINES.map((t) => (
          <button key={t} type="button"
            onClick={() => update("timeline", t)}
            className={`py-4 px-3 rounded-lg border text-sm font-bold text-center transition-all ${
              form.timeline === t
                ? "bg-brand-red border-brand-red text-white shadow-brand"
                : "border-white/15 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/5"
            }`}>
            {t}
          </button>
        ))}
      </div>
      {form.timeline === "Choose Date" && (
        <div className="mt-5">
          <label className="form-label">Select Date</label>
          <input
            type="date"
            className="form-input"
            value={form.chosenDate}
            onChange={(e) => update("chosenDate", e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

function Step5({
  form, update, dragging, setDragging, previews, handleFiles, removePhoto, fileRef,
}: {
  form: FormData;
  update: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
  dragging: boolean;
  setDragging: (v: boolean) => void;
  previews: string[];
  handleFiles: (f: FileList | null) => void;
  removePhoto: (i: number) => void;
  fileRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div>
      <h3 className="font-display font-bold text-white text-2xl mb-1">ADDITIONAL DETAILS</h3>
      <p className="text-brand-off-white/50 text-sm mb-6">Notes, photos, and anything else that helps.</p>
      <div className="space-y-5">
        <div>
          <label className="form-label">Notes (Loading, Unloading, Access, Special Handling)</label>
          <textarea
            className="form-input resize-none"
            rows={4}
            placeholder="Any special handling notes, loading/unloading info, access concerns..."
            value={form.specialNotes}
            onChange={(e) => update("specialNotes", e.target.value)}
          />
        </div>

        <div>
          <label className="form-label flex items-center gap-2">
            GOT PICTURES?
          </label>
          <p className="text-brand-off-white/40 text-xs mb-3">
            Photos can help us understand the load, facilities, access, or equipment before we call you.
          </p>
          <div
            className={`drop-zone p-8 text-center cursor-pointer rounded-lg transition-all ${dragging ? "active" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
            onClick={() => fileRef.current?.click()}
          >
            <Upload size={32} className="text-brand-red mx-auto mb-2" />
            <p className="text-white/70 text-sm font-semibold">Drop photos here or tap to browse</p>
            <p className="text-white/30 text-xs mt-1">Up to 6 photos • JPG, PNG, HEIC</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              {previews.map((src, i) => (
                <div key={i} className="relative group aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="w-full h-full object-cover rounded-md" />
                  <button
                    onClick={() => removePhoto(i)}
                    className="absolute -top-1.5 -right-1.5 bg-brand-red rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Step6({ form, update }: { form: FormData; update: <K extends keyof FormData>(k: K, v: FormData[K]) => void }) {
  return (
    <div>
      <h3 className="font-display font-bold text-white text-2xl mb-1">ALMOST DONE</h3>
      <p className="text-brand-off-white/50 text-sm mb-6">Who should we contact?</p>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Full Name *</label>
            <input type="text" className="form-input" placeholder="John Smith"
              value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required />
          </div>
          <div>
            <label className="form-label">Farm / Ranch Name</label>
            <input type="text" className="form-input" placeholder="Smith Farms"
              value={form.farmName} onChange={(e) => update("farmName", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Phone *</label>
            <input type="tel" inputMode="tel" className="form-input" placeholder="(573) 555-0100"
              value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
          </div>
          <div>
            <label className="form-label">Email (Optional)</label>
            <input type="email" className="form-input" placeholder="john@smithfarms.com"
              value={form.email} onChange={(e) => update("email", e.target.value)} />
          </div>
        </div>
        <div>
          <label className="form-label">Preferred Contact Method</label>
          <div className="flex gap-3 mt-1">
            {(["Call", "Text", "Either"] as const).map((opt) => (
              <button key={opt} type="button"
                onClick={() => update("contactPref", opt)}
                className={`flex-1 py-3 text-sm font-bold rounded border transition-all ${
                  form.contactPref === opt
                    ? "bg-brand-red border-brand-red text-white"
                    : "border-white/20 text-white/60 hover:text-white"
                }`}>
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-brand-dark-gray rounded-lg p-4 border border-white/5">
          <p className="text-brand-off-white/40 text-xs leading-relaxed">
            By submitting this request, you agree that Pemberton Cattle Company may contact you regarding your hauling request. This is a demo — no data is actually transmitted.
          </p>
        </div>
      </div>
    </div>
  );
}
