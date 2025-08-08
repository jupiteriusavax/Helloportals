import React from 'react';
import { OrderFormStatus } from '../types/workspace';
import { cn } from '../utils/cn';

interface StatusBadgeProps {
  status: OrderFormStatus;
}

const colorMap: Record<Exclude<OrderFormStatus, ''>, { bg: string; text: string } > = {
  Draft: { bg: 'bg-gray-100', text: 'text-gray-700' },
  Viewed: { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Needs Approval': { bg: 'bg-rose-100', text: 'text-rose-700' },
  Signed: { bg: 'bg-green-100', text: 'text-green-700' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  if (!status) return <span className="text-gray-400">-</span>;
  const colors = colorMap[status as Exclude<OrderFormStatus, ''>];
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-transparent',
        colors.bg,
        colors.text
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;