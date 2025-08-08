import React from 'react';
import WorkspacesTable from './components/WorkspacesTable';

export default function TestWorkspaces() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <WorkspacesTable />
      </div>
    </div>
  );
}
