import React, { useMemo, useState } from 'react';
import { CreatedRange, FilterBar } from './FilterBar';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { SortDirection, SortKey, WorkspaceRow } from '../types';
import { workspaces, uniqueOwners } from '../data/workspaces';
import { PlusIcon } from '@heroicons/react/24/outline';

const dateFmt = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
});

function formatDate(iso: string) {
  return dateFmt.format(new Date(iso));
}

export function WorkspacesTable() {
  const [search, setSearch] = useState('');
  const [owner, setOwner] = useState<string | 'All'>('All');
  const [createdRange, setCreatedRange] = useState<CreatedRange>('All');
  const [sortBy, setSortBy] = useState<SortKey>('lastClientView');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const searchLower = search.trim().toLowerCase();

    let rows = workspaces.filter((w) => {
      const matchText =
        w.account.name.toLowerCase().includes(searchLower) ||
        w.workspace.toLowerCase().includes(searchLower);

      const matchOwner = owner === 'All' ? true : w.owner.name === owner;

      const now = new Date();
      const created = new Date(w.createdAt);
      let matchDate = true;
      if (createdRange === 'Last 7 days') {
        const d = new Date(now);
        d.setDate(d.getDate() - 7);
        matchDate = created >= d;
      } else if (createdRange === 'Last 30 days') {
        const d = new Date(now);
        d.setDate(d.getDate() - 30);
        matchDate = created >= d;
      } else if (createdRange === 'This year') {
        matchDate = created.getFullYear() === now.getFullYear();
      }

      return matchText && matchOwner && matchDate;
    });

    if (sortBy) {
      rows = rows.slice().sort((a, b) => {
        if (sortBy === 'oppAmount') {
          return sortDirection === 'asc'
            ? a.oppAmount - b.oppAmount
            : b.oppAmount - a.oppAmount;
        }
        if (sortBy === 'lastClientView') {
          const ta = new Date(a.lastClientView).getTime();
          const tb = new Date(b.lastClientView).getTime();
          return sortDirection === 'asc' ? ta - tb : tb - ta;
        }
        return 0;
      });
    }

    return rows;
  }, [search, owner, createdRange, sortBy, sortDirection]);

  const allSelected = selected.size > 0 && filtered.every((r) => selected.has(r.id));
  const someSelected = selected.size > 0 && !allSelected;

  function toggleAll() {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((r) => r.id)));
    }
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleRequestSort(key: Exclude<SortKey, null>) {
    if (sortBy === key) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDirection('asc');
    }
  }

  const tabs = [
    'Sales Pipeline',
    'Customer Onboarding',
    'Customer Success',
    'Renewal Pipeline',
  ];
  const [activeTab, setActiveTab] = useState('Sales Pipeline');

  return (
    <div className="font-sans text-gray-900 bg-white">
      <div className="flex items-center justify-between py-6 px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded"></div>
          <h1 className="text-2xl font-semibold text-gray-900">Workspaces</h1>
        </div>
        <button className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
          <PlusIcon className="mr-2 h-4 w-4" /> New Workspace
        </button>
      </div>

      <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-200 bg-gray-50">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={
              'relative whitespace-nowrap px-4 py-2 text-sm font-medium rounded-md transition-colors ' +
              (activeTab === t
                ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50')
            }
          >
            {t}
          </button>
        ))}
        <div className="ml-2">
          <button className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <PlusIcon className="h-4 w-4" /> Add View
          </button>
        </div>
      </div>

      <div className="px-6 py-4">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          owners={uniqueOwners}
          selectedOwner={owner}
          onOwnerChange={setOwner}
          createdRange={createdRange}
          onCreatedRangeChange={setCreatedRange}
        />
      </div>

      <div className="px-6 pb-6">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHeader
              allSelected={allSelected}
              someSelected={someSelected}
              onToggleAll={toggleAll}
              sortBy={sortBy}
              sortDirection={sortDirection}
              onRequestSort={handleRequestSort}
            />
            <tbody className="divide-y divide-gray-200 bg-white">
              {filtered.map((row, index) => (
                <TableRow
                  key={row.id}
                  row={row}
                  selected={selected.has(row.id)}
                  onToggle={toggleRow}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Showing {filtered.length} of {workspaces.length} workspaces
        </div>
      </div>
    </div>
  );
}

export default WorkspacesTable;