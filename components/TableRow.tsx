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
          <div className="h-8 w-8 rounded border border-gray-200 bg-gray-50 flex items-center justify-center">
            <img
              src={row.account.logo}
              alt=""
              className="h-6 w-6 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="text-xs font-medium text-gray-600 hidden">
              {row.account.name.charAt(0)}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-900">{row.account.name}</span>
        </div>
      </td>
      <td className="px-3 py-3 align-middle text-sm text-gray-700">{row.workspace}</td>
      <td className="px-3 py-3 align-middle">
        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-1 ring-gray-200">
          <img
            src={row.owner.avatar}
            alt={row.owner.name}
            title={row.owner.name}
            className="h-8 w-8 rounded-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <span className="text-xs font-medium text-gray-600 hidden">
            {row.owner.name.charAt(0)}
          </span>
        </div>
      </td>
      <td className="px-3 py-3 align-middle text-right text-sm font-medium text-gray-900">
        {currency.format(row.oppAmount)}
      </td>
      <td className="px-3 py-3 align-middle text-sm text-gray-700">{formattedDate}</td>
      <td className="px-3 py-3 align-middle text-right text-sm text-gray-700">{row.views}</td>
      <td className="px-3 py-3 align-middle text-sm"><StatusBadge status={row.orderFormStatus} /></td>
      <td className="px-3 py-3 align-middle">
        <div className="w-20 h-1.5 rounded-full bg-gray-200">
          <div
            className="h-1.5 rounded-full bg-green-500 transition-all duration-200"
            style={{ width: `${Math.max(0, Math.min(100, row.planStatus))}%` }}
          />
        </div>
      </td>
    </tr>
  );
}

export default TableRow;