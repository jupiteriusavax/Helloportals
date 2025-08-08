import React from 'react';
import WorkspacesTable from '../components/WorkspacesTable';
import '../globals.css';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8">
        <WorkspacesTable />
      </div>
    </div>
  );
}
