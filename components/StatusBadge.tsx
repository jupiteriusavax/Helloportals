import React from 'react';
import { OrderFormStatus } from '../types';

interface StatusBadgeProps {
  status: OrderFormStatus;
}

const colorByStatus: Record<OrderFormStatus, string> = {
  '': 'bg-transparent',
  Draft: 'bg-gray-50 text-gray-600 border border-gray-200',
  Viewed: 'bg-blue-50 text-blue-600 border border-blue-200',
  'Needs Approval': 'bg-pink-50 text-pink-600 border border-pink-200',
  Signed: 'bg-green-50 text-green-600 border border-green-200',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  if (!status) return <span className="text-gray-400">-</span>;
  return (
    <span
      className={
        'inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ' +
        colorByStatus[status]
      }
    >
      {status}
    </span>
  );
}

export default StatusBadge;