import React from "react";

type Status = "draft" | "published" | "archived";

type BadgeProps = {
  status: Status;
  className?: string;
};

const statusMap: Record<Status, { color: string; text: string }> = {
  draft: { color: "bg-yellow-100 text-yellow-800", text: "Brouillon" },
  published: { color: "bg-green-100 text-green-800", text: "Publié" },
  archived: { color: "bg-gray-100 text-gray-700", text: "Archivé" },
};

export function Badge({ status, className = "" }: BadgeProps) {
  const { color, text } = statusMap[status];
  
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${color} ${className}`}>
      {text}
    </span>
  );
}