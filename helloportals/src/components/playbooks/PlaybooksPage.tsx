"use client";

import React, { useMemo, useState } from "react";
// import Link from "next/link";
import { Plus } from "lucide-react";
import { FilterBar } from "@/components/playbooks/FilterBar";
import { PlaybookCard } from "@/components/playbooks/PlaybookCard";
import { playbooks as mockPlaybooks } from "@/data/playbooks";
import { Button } from "@/components/ui/button";

export default function PlaybooksPage() {
  const [tabOwner, setTabOwner] = useState<"organization" | "personal">("organization");
  const [secondaryTab, setSecondaryTab] = useState<"playbooks" | "scenarios">("playbooks");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return mockPlaybooks;
    return mockPlaybooks.filter((p) =>
      [p.title, p.description].some((f) => f.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTabOwner("organization")}
              className={`rounded-full px-3 py-1.5 text-sm ${
                tabOwner === "organization"
                  ? "bg-gray-100 font-semibold text-gray-900"
                  : "bg-gray-50 text-gray-600 border border-gray-200"
              }`}
            >
              Organization
            </button>
            <button
              onClick={() => setTabOwner("personal")}
              className={`rounded-full px-3 py-1.5 text-sm ${
                tabOwner === "personal"
                  ? "bg-gray-100 font-semibold text-gray-900"
                  : "bg-gray-50 text-gray-600 border border-gray-200"
              }`}
            >
              Personal
            </button>
          </div>

          <Button className="rounded-full bg-blue-600 text-white hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> New Playbook
          </Button>
        </div>

        <div className="mt-6">
          <h1 className="text-2xl font-semibold text-gray-900">Playbooks</h1>
        </div>

        <div className="mt-4 flex items-center gap-6 border-b border-gray-200">
          <button
            onClick={() => setSecondaryTab("playbooks")}
            className={`pb-3 text-sm ${secondaryTab === "playbooks" ? "border-b-2 border-gray-900 font-medium" : "text-gray-500"}`}
          >
            Playbooks
          </button>
          <button
            onClick={() => setSecondaryTab("scenarios")}
            className={`pb-3 text-sm ${secondaryTab === "scenarios" ? "border-b-2 border-gray-900 font-medium" : "text-gray-500"}`}
          >
            Scenarios
          </button>
        </div>

        <FilterBar search={search} onSearch={setSearch} />

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {filtered.map((pb) => (
            <PlaybookCard key={pb.id} playbook={pb} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 text-center text-sm text-gray-500">No playbooks found for this search.</p>
        ) : null}

        <div className="sr-only mt-2 text-xs text-gray-400">Owner tab: {tabOwner}; Secondary tab: {secondaryTab}</div>
      </div>
    </div>
  );
}