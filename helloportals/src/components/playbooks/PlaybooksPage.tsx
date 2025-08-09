"use client";

import React, { useState } from "react";
import { FilterBar } from "./FilterBar";
import { PlaybookCard } from "./PlaybookCard";
import { Button } from "../ui/button";

// Icône SVG inline
const PlusIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

interface Playbook {
  id: string;
  title: string;
  description: string;
  status: "draft" | "published" | "archived";
  lastModified: string;
  views: number;
  author: {
    name: string;
    avatar: string;
  };
}

const mockPlaybooks: Playbook[] = [
  {
    id: "1",
    title: "Customer Onboarding Flow",
    description: "Complete guide for new customer onboarding process",
    status: "published",
    lastModified: "2024-01-15",
    views: 1247,
    author: {
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
    },
  },
  {
    id: "2",
    title: "Sales Qualification Checklist",
    description: "Step-by-step qualification process for sales team",
    status: "draft",
    lastModified: "2024-01-10",
    views: 892,
    author: {
      name: "Mike Chen",
      avatar: "/avatars/mike.jpg",
    },
  },
  {
    id: "3",
    title: "Product Demo Script",
    description: "Standardized demo script for product presentations",
    status: "published",
    lastModified: "2024-01-08",
    views: 2156,
    author: {
      name: "Emily Davis",
      avatar: "/avatars/emily.jpg",
    },
  },
  {
    id: "4",
    title: "Customer Success Playbook",
    description: "Best practices for customer success management",
    status: "archived",
    lastModified: "2023-12-20",
    views: 567,
    author: {
      name: "David Wilson",
      avatar: "/avatars/david.jpg",
    },
  },
];

export function PlaybooksPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlaybooks = mockPlaybooks.filter((playbook) => {
    const matchesSearch = playbook.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      playbook.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Playbooks</h1>
            <p className="mt-2 text-gray-600">
              Create and manage your sales and customer success playbooks
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <PlusIcon />
            <span className="ml-2">New Playbook</span>
          </Button>
        </div>

        <FilterBar
          search={searchTerm}
          onSearch={setSearchTerm}
        />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlaybooks.map((playbook) => (
            <PlaybookCard key={playbook.id} playbook={playbook} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaybooksPage;