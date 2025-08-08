"use client";

import Link from "next/link";
import { Badge } from "@/components/playbooks/Badge";
import { StatusDot } from "@/components/playbooks/StatusDot";
import type { Playbook } from "@/data/playbooks";

export function PlaybookCard({ playbook }: { playbook: Playbook }) {
  return (
    <Link
      href={`/playbooks/${playbook.id}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:scale-[1.01] hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{playbook.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{playbook.tasks} Tasks • {playbook.scenarios} Scenarios</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge color="blue" text={playbook.category} />
          <Badge color="green" text={playbook.status} />
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-600">{playbook.description}</p>

      <div className="mt-4 space-y-2">
        {playbook.steps.map((step) => (
          <div key={step.id} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
            <div className="h-6 w-6 shrink-0 rounded-full bg-gray-200" />
            <span className="text-sm text-gray-900">{step.name}</span>
            <StatusDot status={step.status} />
          </div>
        ))}
      </div>
    </Link>
  );
}