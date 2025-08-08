import React, { useMemo, useState } from 'react';

// Icônes SVG inline
const MagnifyingGlassIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const FunnelIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const BookmarkSquareIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

export type CreatedRange = 'All' | 'Last 7 days' | 'Last 30 days' | 'This year';

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  owners: string[];
  selectedOwner: string | 'All';
  onOwnerChange: (owner: string | 'All') => void;
  createdRange: CreatedRange;
  onCreatedRangeChange: (range: CreatedRange) => void;
}

export function FilterBar({
  search,
  onSearchChange,
  owners,
  selectedOwner,
  onOwnerChange,
  createdRange,
  onCreatedRangeChange,
}: FilterBarProps) {
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const ownerOptions = useMemo(() => ['All', ...owners], [owners]);
  const dateOptions: CreatedRange[] = ['All', 'Last 7 days', 'Last 30 days', 'This year'];

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative w-80">
          <div className="pointer-events-none absolute left-3 top-2.5">
            <MagnifyingGlassIcon />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search workspace"
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOwnerOpen((v) => !v)}
            onBlur={() => setOwnerOpen(false)}
            className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Owners : {selectedOwner}
            <ChevronDownIcon />
          </button>
          {ownerOpen && (
            <div className="absolute z-10 mt-1 w-56 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
              {ownerOptions.map((o) => (
                <button
                  key={o}
                  className={
                    'block w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ' +
                    (o === selectedOwner ? 'bg-gray-50 font-medium' : '')
                  }
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onOwnerChange(o as any)}
                >
                  {o}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setDateOpen((v) => !v)}
            onBlur={() => setDateOpen(false)}
            className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Created Date
            <ChevronDownIcon />
          </button>
          {dateOpen && (
            <div className="absolute z-10 mt-1 w-44 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
              {dateOptions.map((o) => (
                <button
                  key={o}
                  className={
                    'block w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ' +
                    (o === createdRange ? 'bg-gray-50 font-medium' : '')
                  }
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onCreatedRangeChange(o)}
                >
                  {o}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <FunnelIcon /> Advanced Filters
        </button>
      </div>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <BookmarkSquareIcon /> Save View
      </button>
    </div>
  );
}

export default FilterBar;