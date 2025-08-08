import React from 'react';
import WorkspacesTable from './components/WorkspacesTable';

export default function Demo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <WorkspacesTable />
      </div>
    </div>
  );
}
