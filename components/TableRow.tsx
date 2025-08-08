import React from 'react';
import { WorkspaceRow } from '../types/workspace';
import { formatDateLong, formatUSD } from '../utils/format';
import StatusBadge from './StatusBadge';

interface TableRowProps {
  row: WorkspaceRow;
  selected: boolean;
  onToggle: (id: string) => void;
  index: number;
}

export const TableRow: React.FC<TableRowProps> = ({ row, selected, onToggle, index }) => {
  return (
    <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
      <td className="px-4 py-3 w-8 align-middle">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          checked={selected}
          onChange={() => onToggle(row.id)}
        />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={row.account.logo} alt={row.account.name} className="h-6 w-6 rounded" />
          <span className="text-gray-900 text-sm font-medium">{row.account.name}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">{row.workspaceName}</td>
      <td className="px-4 py-3">
        <img src={row.owner.avatar} alt={row.owner.name} className="h-7 w-7 rounded-full" />
      </td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatUSD(row.oppAmount)}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{formatDateLong(row.lastClientView)}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{row.views}</td>
      <td className="px-4 py-3"><StatusBadge status={row.orderFormStatus} /></td>
      <td className="px-4 py-3">
        {row.planProgress === null ? (
          <span className="text-gray-400">—</span>
        ) : (
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ width: `${Math.max(0, Math.min(100, row.planProgress))}%` }}
            />
          </div>
        )}
      </td>
    </tr>
  );
};

export default TableRow;