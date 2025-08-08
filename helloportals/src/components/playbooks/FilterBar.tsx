"use client";

import React, { useMemo, useState } from "react";

// Icônes SVG inline
const FilterIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const SaveIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export type FilterBarProps = {
  search: string;
  onSearch: (value: string) => void;
};

export function FilterBar({ search, onSearch }: FilterBarProps) {
  const [owners, setOwners] = useState<string>("All");
  const [created, setCreated] = useState<string>("");
  const [open, setOpen] = useState(false);

  const ownerLabel = useMemo(() => `Owners: ${owners}`, [owners]);

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <div className="relative">
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search playbook"
          className="w-64 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
          {ownerLabel}
          <ChevronDownIcon />
        </button>
        <select
          value={owners}
          onChange={(e) => setOwners(e.target.value)}
          className="sr-only"
          aria-label="Owners filter"
        >
          <option>All</option>
          <option>Me</option>
          <option>Team</option>
        </select>

        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
          Created Date
          <ChevronDownIcon />
        </button>
        <select
          value={created}
          onChange={(e) => setCreated(e.target.value)}
          className="sr-only"
          aria-label="Created date filter"
        >
          <option value="">Any</option>
          <option value="last7">Last 7 days</option>
          <option value="last30">Last 30 days</option>
        </select>

        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
        >
          <FilterIcon /> Advanced Filters
        </button>

        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
          <SaveIcon /> Save View
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Advanced Filters</h3>
              <button onClick={() => setOpen(false)} className="text-sm text-gray-500 hover:text-gray-800">Close</button>
            </div>
            <p className="mt-2 text-sm text-gray-500">(À venir) Configurez des filtres avancés.</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}