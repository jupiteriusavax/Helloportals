import React, { useMemo, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import workspacesData from '../data/workspaces';
import { WorkspaceRow } from '../types/workspace';
import { FilterBar } from './FilterBar';
import { TableHeader, SortKey, SortOrder } from './TableHeader';
import TableRow from './TableRow';

function filterByCreatedDate(rows: WorkspaceRow[], range: string): WorkspaceRow[] {
  if (range === 'Any time') return rows;
  const now = new Date();
  const daysMap: Record<string, number> = {
    'Last 7 days': 7,
    'Last 30 days': 30,
    'Last 90 days': 90,
  };
  const days = daysMap[range] ?? 0;
  if (!days) return rows;
  const cutoff = new Date(now);
  cutoff.setDate(now.getDate() - days);
  return rows.filter((r) => new Date(r.createdAt) >= cutoff);
}

function sortRows(rows: WorkspaceRow[], key: SortKey, order: SortOrder): WorkspaceRow[] {
  if (!key) return rows;
  const sorted = [...rows].sort((a, b) => {
    if (key === 'oppAmount') {
      return a.oppAmount - b.oppAmount;
    }
    if (key === 'lastClientView') {
      return new Date(a.lastClientView).getTime() - new Date(b.lastClientView).getTime();
    }
    return 0;
  });
  return order === 'asc' ? sorted : sorted.reverse();
}

export const WorkspacesTable: React.FC = () => {
  const [search, setSearch] = useState('');
  const [owner, setOwner] = useState('All');
  const [created, setCreated] = useState('Any time');
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const onChangeSort = (key: Exclude<SortKey, null>) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let rows = workspacesData.filter((r) => {
      const matchesText = !q ||
        r.account.name.toLowerCase().includes(q) ||
        r.workspaceName.toLowerCase().includes(q);
      const matchesOwner = owner === 'All' || r.owner.name === owner;
      return matchesText && matchesOwner;
    });
    rows = filterByCreatedDate(rows, created);
    return sortRows(rows, sortKey, sortOrder);
  }, [search, owner, created, sortKey, sortOrder]);

  const allSelected = filtered.length > 0 && filtered.every((r) => selected.has(r.id));
  const someSelected = filtered.some((r) => selected.has(r.id));

  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        filtered.forEach((r) => next.delete(r.id));
      } else {
        filtered.forEach((r) => next.add(r.id));
      }
      return next;
    });
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold text-gray-900">Workspaces</h1>
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md">
          <PlusIcon className="h-5 w-5" /> New Workspace
        </button>
      </div>

      <div className="flex items-center gap-2 border-b border-gray-200 mb-2">
        {['Sales Pipeline', 'Customer Onboarding', 'Customer Success', 'Renewal Pipeline'].map((tab, idx) => (
          <button
            key={tab}
            className={
              'px-3 py-2 text-sm font-medium border-b-2 -mb-px ' +
              (idx === 0 ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700')
            }
          >
            {tab}
          </button>
        ))}
        <button className="ml-auto inline-flex items-center gap-1 text-sm text-gray-700 px-3 py-2 hover:bg-gray-50 rounded-md border border-dashed border-gray-300">
          <PlusIcon className="h-4 w-4" /> Add View
        </button>
      </div>

      <FilterBar
        search={search}
        onSearch={setSearch}
        owner={owner}
        onOwnerChange={setOwner}
        created={created}
        onCreatedChange={setCreated}
      />

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader
            allSelected={allSelected}
            someSelected={someSelected}
            onToggleAll={toggleAll}
            sortKey={sortKey}
            sortOrder={sortOrder}
            onChangeSort={onChangeSort}
          />
          <tbody className="divide-y divide-gray-200">
            {filtered.map((row, idx) => (
              <TableRow
                key={row.id}
                row={row}
                index={idx}
                selected={selected.has(row.id)}
                onToggle={toggleOne}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkspacesTable;