import React from 'react';
import { SortDirection, SortKey } from '../types';

// Icône ChevronDown SVG inline
const ChevronDownIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

interface TableHeaderProps {
  allSelected: boolean;
  someSelected: boolean;
  onToggleAll: () => void;
  sortBy: SortKey;
  sortDirection: SortDirection;
  onRequestSort: (key: Exclude<SortKey, null>) => void;
}

export function TableHeader({
  allSelected,
  someSelected,
  onToggleAll,
  sortBy,
  sortDirection,
  onRequestSort,
}: TableHeaderProps) {
  const sortIcon = (key: Exclude<SortKey, null>) => (
    <span className="ml-1 inline-flex">
      <ChevronDownIcon />
    </span>
  );

  const headerCell = (
    text: string,
    opts?: { sortable?: boolean; sortKey?: Exclude<SortKey, null>; align?: 'left' | 'right' }
  ) => {
    const sortable = opts?.sortable;
    const key = opts?.sortKey;
    const align = opts?.align ?? 'left';
    const isActive = key && sortBy === key;

    return (
      <th
        scope="col"
        className={
          'px-3 py-2 text-sm font-semibold text-gray-700 whitespace-nowrap ' +
          (align === 'right' ? 'text-right' : 'text-left')
        }
      >
        {sortable && key ? (
          <button
            type="button"
            className={
              'inline-flex items-center hover:text-gray-900 ' +
              (isActive ? 'text-gray-900' : '')
            }
            onClick={() => onRequestSort(key)}
          >
            {text}
            {sortIcon(key)}
          </button>
        ) : (
          text
        )}
      </th>
    );
  };

  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="w-10 px-3 py-2">
          <input
            aria-label="Select all rows"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={allSelected}
            ref={(input) => {
              if (input) input.indeterminate = !allSelected && someSelected;
            }}
            onChange={onToggleAll}
          />
        </th>
        {headerCell('Account')}
        {headerCell('Workspace')}
        {headerCell('Owner')}
        {headerCell('Opp Amount', { sortable: true, sortKey: 'oppAmount', align: 'right' })}
        {headerCell('Last Client View', { sortable: true, sortKey: 'lastClientView' })}
        {headerCell('Views', { align: 'right' })}
        {headerCell('Order Form Status')}
        {headerCell('Plan Status')}
      </tr>
    </thead>
  );
}

export default TableHeader;