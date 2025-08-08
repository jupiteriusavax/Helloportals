"use client";

export default function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1">
      <label className="hp-label">{label}</label>
      <input type="color" className="hp-input" value={value || "#000000"} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}