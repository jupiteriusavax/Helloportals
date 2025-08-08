import React from 'react';
import { OrderFormStatus } from '../types';

interface StatusBadgeProps {
  status: OrderFormStatus;
}

const colorByStatus: Record<OrderFormStatus, string> = {
  '': 'bg-transparent',
  Draft: 'bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200',
  Viewed: 'bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-200',
  'Needs Approval': 'bg-rose-100 text-rose-700 ring-1 ring-inset ring-rose-200',
  Signed: 'bg-green-100 text-green-700 ring-1 ring-inset ring-green-200',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  if (!status) return <span className="text-gray-400">-</span>;
  return (
    <span
      className={
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ' +
        colorByStatus[status]
      }
    >
      {status}
    </span>
  );
}

export default StatusBadge;