import React from 'react';
import WorkspacesTable from './components/WorkspacesTable';

export default function TestSimple() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Test Simple - WorkspacesTable</h1>
        <WorkspacesTable />
      </div>
    </div>
  );
}
