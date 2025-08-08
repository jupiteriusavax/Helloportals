import React from 'react';
import { WorkspaceRow } from '../types';
import StatusBadge from './StatusBadge';

interface TableRowProps {
  row: WorkspaceRow;
  selected: boolean;
  onToggle: (id: string) => void;
}

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const dateFmt = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
});

export function TableRow({ row, selected, onToggle }: TableRowProps) {
  const formattedDate = dateFmt.format(new Date(row.lastClientView));

  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50">
      <td className="w-10 px-3 py-3 align-middle">
        <input
          aria-label={`Select ${row.account.name}`}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          checked={selected}
          onChange={() => onToggle(row.id)}
        />
      </td>
      <td className="px-3 py-3 align-middle">
        <div className="flex items-center gap-3">
          <img
            src={row.account.logo}
            alt=""
            className="h-7 w-7 rounded border border-gray-200 object-cover"
          />
          <span className="text-sm font-medium text-gray-900">{row.account.name}</span>
        </div>
      </td>
      <td className="px-3 py-3 align-middle text-sm text-gray-700">{row.workspace}</td>
      <td className="px-3 py-3 align-middle">
        <img
          src={row.owner.avatar}
          alt={row.owner.name}
          title={row.owner.name}
          className="h-7 w-7 rounded-full object-cover ring-1 ring-gray-200"
        />
      </td>
      <td className="px-3 py-3 align-middle text-right text-sm font-medium text-gray-900">
        {currency.format(row.oppAmount)}
      </td>
      <td className="px-3 py-3 align-middle text-sm text-gray-700">{formattedDate}</td>
      <td className="px-3 py-3 align-middle text-right text-sm text-gray-700">{row.views}</td>
      <td className="px-3 py-3 align-middle text-sm"><StatusBadge status={row.orderFormStatus} /></td>
      <td className="px-3 py-3 align-middle">
        <div className="w-24 h-2 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-emerald-500"
            style={{ width: `${Math.max(0, Math.min(100, row.planStatus))}%` }}
          />
        </div>
      </td>
    </tr>
  );
}

export default TableRow;