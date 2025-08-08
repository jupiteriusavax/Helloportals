import React from 'react';
import { MagnifyingGlassIcon, FunnelIcon, ChevronDownIcon, BookmarkSquareIcon } from '@heroicons/react/24/outline';

interface FilterBarProps {
  search: string;
  onSearch: (v: string) => void;
  owner: string;
  onOwnerChange: (v: string) => void;
  created: string;
  onCreatedChange: (v: string) => void;
}

const ownerOptions = ['All', 'Ava Daniels', 'Ren Park', 'Maya Chen', 'Leo Patel', 'Kai & Lee'];
const createdOptions = ['Any time', 'Last 7 days', 'Last 30 days', 'Last 90 days'];

export const FilterBar: React.FC<FilterBarProps> = ({ search, onSearch, owner, onOwnerChange, created, onCreatedChange }) => {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="relative flex-1 max-w-sm">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search workspace"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            className="appearance-none pr-8 pl-3 py-2 text-sm border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            value={owner}
            onChange={(e) => onOwnerChange(e.target.value)}
          >
            {ownerOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <ChevronDownIcon className="h-4 w-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            className="appearance-none pr-8 pl-3 py-2 text-sm border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            value={created}
            onChange={(e) => onCreatedChange(e.target.value)}
          >
            {createdOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <ChevronDownIcon className="h-4 w-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <button className="inline-flex items-center gap-1 text-sm px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          <FunnelIcon className="h-4 w-4" />
          Advanced Filters
        </button>
      </div>

      <div className="ml-auto">
        <button className="inline-flex items-center gap-1 text-sm px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          <BookmarkSquareIcon className="h-4 w-4" />
          Save View
        </button>
      </div>
    </div>
  );
};

export default FilterBar;