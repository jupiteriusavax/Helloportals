import React from 'react';
import { cn } from '../utils/cn';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';

export type SortKey = 'oppAmount' | 'lastClientView' | null;
export type SortOrder = 'asc' | 'desc';

interface TableHeaderProps {
  allSelected: boolean;
  someSelected: boolean;
  onToggleAll: () => void;
  sortKey: SortKey;
  sortOrder: SortOrder;
  onChangeSort: (key: Exclude<SortKey, null>) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  allSelected,
  someSelected,
  onToggleAll,
  sortKey,
  sortOrder,
  onChangeSort,
}) => {
  const sortIndicator = (key: Exclude<SortKey, null>) => (
    <ArrowsUpDownIcon
      className={cn(
        'h-4 w-4 ml-1 inline-block align-middle',
        sortKey === key ? 'text-gray-900' : 'text-gray-400'
      )}
    />
  );

  return (
    <thead className="bg-gray-50">
      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        <th className="px-4 py-3 w-8">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={allSelected}
            ref={(input) => {
              if (input) input.indeterminate = !allSelected && someSelected;
            }}
            onChange={onToggleAll}
          />
        </th>
        <th className="px-4 py-3">Account</th>
        <th className="px-4 py-3">Workspace</th>
        <th className="px-4 py-3">Owner</th>
        <th className="px-4 py-3 cursor-pointer select-none" onClick={() => onChangeSort('oppAmount')}>
          <span className="inline-flex items-center">Opp Amount {sortIndicator('oppAmount')}</span>
        </th>
        <th className="px-4 py-3 cursor-pointer select-none" onClick={() => onChangeSort('lastClientView')}>
          <span className="inline-flex items-center">Last Client View {sortIndicator('lastClientView')}</span>
        </th>
        <th className="px-4 py-3">Views</th>
        <th className="px-4 py-3">Order Form Status</th>
        <th className="px-4 py-3">Plan Status</th>
      </tr>
    </thead>
  );
};

export default TableHeader;