"use client";

export default function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: Array<{ label: string; value: string }> }) {
  return (
    <div className="space-y-1">
      <label className="hp-label">{label}</label>
      <select className="hp-input" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}