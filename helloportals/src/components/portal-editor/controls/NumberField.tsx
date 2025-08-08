"use client";

export default function NumberField({ label, value, onChange, min, max, step = 1 }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number }) {
  return (
    <div className="space-y-1">
      <label className="hp-label">{label}</label>
      <input type="number" className="hp-input" value={Number.isFinite(value) ? value : 0} min={min} max={max} step={step} onChange={(e) => onChange(parseFloat(e.target.value))} />
    </div>
  );
}