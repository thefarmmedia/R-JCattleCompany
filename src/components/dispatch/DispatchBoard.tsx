"use client";

import { useState } from "react";
import { Phone, MessageSquare, FileText, Calendar, X, Truck, MapPin, User, Clock, DollarSign, ChevronRight } from "lucide-react";
import DemoBadge from "@/components/ui/DemoBadge";

// ─── Data ───────────────────────────────────────────────────────────────────────────────
type Column =
  | "NEW HAUL REQUEST"
  | "CONTACTING"
  | "PRICING NEEDED"
  | "QUOTE SENT"
  | "SCHEDULED"
  | "DRIVER ASSIGNED"
  | "IN TRANSIT"
  | "DELIVERED"
  | "PAID";

interface Lead {
  id: string;
  customer: string;
  farm: string;
  phone: string;
  email: string;
  loadType: string;
  head: string | null;
  pickup: string;
  dest: string;
  distance: string;
  requested: string;
  notes: string;
  column: Column;
  urgency: "high" | "normal" | "low";
}

const COLUMNS: Column[] = [
  "NEW HAUL REQUEST",
  "CONTACTING",
  "PRICING NEEDED",
  "QUOTE SENT",
  "SCHEDULED",
  "DRIVER ASSIGNED",
  "IN TRANSIT",
  "DELIVERED",
  "PAID",
];

const COLUMN_COLORS: Record<Column, string> = {
  "NEW HAUL REQUEST": "border-blue-500/40 bg-blue-900/10",
  "CONTACTING": "border-purple-500/40 bg-purple-900/10",
  "PRICING NEEDED": "border-amber-500/40 bg-amber-900/10",
  "QUOTE SENT": "border-yellow-500/40 bg-yellow-900/10",
  "SCHEDULED": "border-green-500/40 bg-green-900/10",
  "DRIVER ASSIGNED": "border-emerald-500/40 bg-emerald-900/10",
  "IN TRANSIT": "border-brand-red/40 bg-red-900/10",
  "DELIVERED": "border-gray-500/40 bg-gray-900/10",
  "PAID": "border-green-800/40 bg-green-900/20",
};

const INITIAL_LEADS: Lead[] = [
  {
    id: "L-001",
    customer: "John Smith",
    farm: "Smith Farms",
    phone: "[Phone — Demo]",
    email: "[Email — Demo]",
    loadType: "Cattle",
    head: "42",
    pickup: "Lebanon, MO",
    dest: "Springfield, MO",
    distance: "58 Miles",
    requested: "Friday",
    notes: "Needs early morning pickup. Has loading chute.",
    column: "PRICING NEEDED",
    urgency: "high",
  },
  {
    id: "L-002",
    customer: "Bob Johnson",
    farm: "Johnson Cattle Co.",
    phone: "[Phone — Demo]",
    email: "[Email — Demo]",
    loadType: "Cattle",
    head: "76",
    pickup: "Rolla, MO",
    dest: "Sedalia, MO",
    distance: "~115 Miles",
    requested: "Next Week",
    notes: "",
    column: "NEW HAUL REQUEST",
    urgency: "normal",
  },
  {
    id: "L-003",
    customer: "Mike Miller",
    farm: "Miller Farms",
    phone: "[Phone — Demo]",
    email: "[Email — Demo]",
    loadType: "Farm Equipment — Tractor",
    head: null,
    pickup: "Camdenton, MO",
    dest: "Jefferson City, MO",
    distance: "~90 Miles",
    requested: "This Week",
    notes: "John Deere 9620RX. Needs lowboy.",
    column: "QUOTE SENT",
    urgency: "high",
  },
  {
    id: "L-004",
    customer: "Sarah Davis",
    farm: "Davis Ranch",
    phone: "[Phone — Demo]",
    email: "[Email — Demo]",
    loadType: "Feeder Cattle",
    head: "50",
    pickup: "Waynesville, MO",
    dest: "Lebanon, MO",
    distance: "~35 Miles",
    requested: "Tomorrow",
    notes: "Sale barn pickup. Needs to be there by 10am.",
    column: "SCHEDULED",
    urgency: "high",
  },
  {
    id: "L-005",
    customer: "Tom Williams",
    farm: "Williams Cattle",
    phone: "[Phone — Demo]",
    email: "[Email — Demo]",
    loadType: "Cow/Calf Pairs",
    head: "28",
    pickup: "Lake of the Ozarks",
    dest: "Richland, MO",
    distance: "~40 Miles",
    requested: "Flexible",
    notes: "",
    column: "CONTACTING",
    urgency: "normal",
  },
  {
    id: "L-006",
    customer: "Jim Hayes",
    farm: "Hayes Farm",
    phone: "[Phone — Demo]",
    email: "[Email — Demo]",
    loadType: "Cattle",
    head: "30",
    pickup: "Rolla, MO",
    dest: "Richland, MO",
    distance: "~45 Miles",
    requested: "Aug 22",
    notes: "",
    column: "DRIVER ASSIGNED",
    urgency: "normal",
  },
  {
    id: "L-007",
    customer: "Randy Cole",
    farm: "Cole Cattle",
    phone: "[Phone — Demo]",
    email: "[Email — Demo]",
    loadType: "Cattle",
    head: "65",
    pickup: "Springfield, MO",
    dest: "Camdenton, MO",
    distance: "~110 Miles",
    requested: "Aug 14",
    notes: "",
    column: "IN TRANSIT",
    urgency: "high",
  },
  {
    id: "L-008",
    customer: "Carol Baker",
    farm: "Baker Family Farm",
    phone: "[Phone — Demo]",
    email: "[Email — Demo]",
    loadType: "Hay",
    head: null,
    pickup: "Lebanon, MO",
    dest: "Waynesville, MO",
    distance: "~50 Miles",
    requested: "Aug 10",
    notes: "",
    column: "DELIVERED",
    urgency: "low",
  },
];

const URGENCY_COLORS = {
  high: "border-l-4 border-l-brand-red",
  normal: "border-l-4 border-l-white/20",
  low: "border-l-4 border-l-white/10",
};

export default function DispatchBoard() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<Column | null>(null);

  function moveCard(id: string, to: Column) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, column: to } : l)));
  }

  function handleDrop(col: Column) {
    if (dragId) moveCard(dragId, col);
    setDragId(null);
    setDragOver(null);
  }

  const byColumn = (col: Column) => leads.filter((l) => l.column === col);

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Board header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-white/40 text-xs font-bold tracking-widest uppercase">
            {leads.length} Active Leads
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <DemoBadge label="DEMO DATA" />
          <span className="text-white/30 text-xs">Drag cards between columns</span>
        </div>
      </div>

      {/* Kanban */}
      <div className="overflow-x-auto pb-6">
        <div className="flex gap-4 min-w-max">
          {COLUMNS.map((col) => {
            const cards = byColumn(col);
            const colStyle = COLUMN_COLORS[col];
            return (
              <div
                key={col}
                className={`kanban-column flex flex-col transition-all ${
                  dragOver === col ? "border-brand-red/50 bg-brand-red/5" : ""
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(col); }}
                onDragLeave={() => setDragOver(null)}
                onDrop={() => handleDrop(col)}
              >
                {/* Column header */}
                <div className={`px-3 py-2.5 border-b border-white/10 rounded-t-lg ${colStyle}`}>
                  <p className="text-[10px] font-bold tracking-widest text-white/70 uppercase">
                    {col}
                  </p>
                  <p className="text-white/40 text-xs">{cards.length} haul{cards.length !== 1 ? "s" : ""}</p>
                </div>

                {/* Cards */}
                <div className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[calc(100vh-240px)]">
                  {cards.map((lead) => (
                    <div
                      key={lead.id}
                      className={`kanban-card p-3 ${URGENCY_COLORS[lead.urgency]}`}
                      draggable
                      onDragStart={() => setDragId(lead.id)}
                      onDragEnd={() => { setDragId(null); setDragOver(null); }}
                      onClick={() => setSelected(lead)}
                    >
                      <div className="flex items-start justify-between gap-1 mb-1.5">
                        <p className="text-white font-bold text-sm leading-tight">{lead.farm}</p>
                        <p className="text-white/30 text-[10px] font-mono shrink-0">{lead.id}</p>
                      </div>
                      <p className="text-brand-off-white/70 text-xs mb-2">
                        {lead.head ? `${lead.head} Head — ` : ""}{lead.loadType}
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={10} className="text-brand-red shrink-0" />
                          <p className="text-white/50 text-[11px] truncate">{lead.pickup}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={10} className="text-green-500 shrink-0" />
                          <p className="text-white/50 text-[11px] truncate">{lead.dest}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                        <span className="text-white/30 text-[10px]">{lead.distance}</span>
                        <span className="text-white/30 text-[10px]">{lead.requested}</span>
                      </div>
                    </div>
                  ))}
                  {cards.length === 0 && (
                    <div className="py-6 text-center">
                      <p className="text-white/20 text-xs">No hauls</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lead detail panel */}
      {selected && (
        <LeadPanel
          lead={selected}
          onClose={() => setSelected(null)}
          onMove={(to) => { moveCard(selected.id, to); setSelected(null); }}
        />
      )}
    </div>
  );
}

function LeadPanel({
  lead,
  onClose,
  onMove,
}: {
  lead: Lead;
  onClose: () => void;
  onMove: (col: Column) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end" onClick={onClose}>
      <div
        className="relative h-full w-full max-w-md bg-brand-charcoal border-l border-white/10 overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel header */}
        <div className="sticky top-0 bg-brand-charcoal border-b border-white/10 px-5 py-4 flex items-start justify-between z-10">
          <div>
            <p className="font-display font-bold text-white text-base">{lead.farm}</p>
            <p className="text-white/40 text-xs font-mono mt-0.5">{lead.id}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white p-1 ml-4">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${lead.phone}`}
              className="flex items-center justify-center gap-2 bg-brand-red text-white py-2.5 rounded-md font-bold text-sm tracking-wide uppercase hover:bg-brand-red-dark transition-colors"
            >
              <Phone size={14} /> CALL
            </a>
            <button className="flex items-center justify-center gap-2 bg-brand-dark-gray border border-white/15 text-white py-2.5 rounded-md font-bold text-sm tracking-wide uppercase hover:bg-white/5 transition-colors">
              <MessageSquare size={14} /> TEXT
            </button>
            <button className="flex items-center justify-center gap-2 bg-brand-dark-gray border border-white/15 text-white py-2.5 rounded-md font-bold text-sm tracking-wide uppercase hover:bg-white/5 transition-colors">
              <FileText size={14} /> QUOTE
            </button>
            <button className="flex items-center justify-center gap-2 bg-brand-dark-gray border border-white/15 text-white py-2.5 rounded-md font-bold text-sm tracking-wide uppercase hover:bg-white/5 transition-colors">
              <Calendar size={14} /> SCHEDULE
            </button>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">Load Details</h3>
            {[
              { icon: Truck, label: "Load Type", v: `${lead.head ? lead.head + " Head — " : ""}${lead.loadType}` },
              { icon: MapPin, label: "Pickup", v: lead.pickup },
              { icon: MapPin, label: "Destination", v: lead.dest },
              { icon: Clock, label: "Distance", v: lead.distance },
              { icon: Calendar, label: "Requested", v: lead.requested },
            ].map(({ icon: Icon, label, v }) => (
              <div key={label} className="flex items-start gap-3 bg-brand-dark-gray rounded-lg p-3">
                <Icon size={14} className="text-brand-red mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider">{label}</p>
                  <p className="text-white text-sm font-semibold">{v}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Customer info */}
          <div className="space-y-3">
            <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase">Customer</h3>
            {[
              { icon: User, label: "Name", v: lead.customer },
              { icon: Phone, label: "Phone", v: lead.phone },
              { icon: MessageSquare, label: "Email", v: lead.email },
            ].map(({ icon: Icon, label, v }) => (
              <div key={label} className="flex items-center gap-3 bg-brand-dark-gray rounded-lg p-3">
                <Icon size={14} className="text-white/30 shrink-0" />
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider">{label}</p>
                  <p className="text-white text-sm">{v}</p>
                </div>
              </div>
            ))}
          </div>

          {lead.notes && (
            <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
              <p className="text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-1">Notes</p>
              <p className="text-white/70 text-sm leading-relaxed">{lead.notes}</p>
            </div>
          )}

          {/* Move column */}
          <div>
            <h3 className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-2">Move to Stage</h3>
            <div className="space-y-1.5">
              {COLUMNS.filter((c) => c !== lead.column).map((col) => (
                <button
                  key={col}
                  onClick={() => onMove(col)}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-brand-dark-gray border border-white/10 rounded-lg text-white/60 text-xs font-semibold hover:text-white hover:border-white/20 transition-colors"
                >
                  {col}
                  <ChevronRight size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
