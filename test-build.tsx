import React from 'react';
import WorkspacesTable from './components/WorkspacesTable';

export default function TestBuild() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Test Build - WorkspacesTable</h1>
        <WorkspacesTable />
      </div>
    </div>
  );
}
