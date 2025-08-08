import React, { useMemo, useState } from 'react';
import { ChevronDownIcon, FunnelIcon, MagnifyingGlassIcon, BookmarkSquareIcon } from '@heroicons/react/24/outline';

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
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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
            <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-500" />
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
            <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-500" />
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
          <FunnelIcon className="h-4 w-4" /> Advanced Filters
        </button>
      </div>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <BookmarkSquareIcon className="h-5 w-5 text-gray-600" /> Save View
      </button>
    </div>
  );
}

export default FilterBar;