import React from "react";

export type Status = "draft" | "published" | "archived";

export function StatusDot({ status }: { status: Status }) {
  const getColor = (status: Status) => {
    switch (status) {
      case "published":
        return "bg-green-500";
      case "draft":
        return "bg-yellow-500";
      case "archived":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <span
      aria-label={status}
      className={`ml-auto inline-block h-2.5 w-2.5 rounded-full ${getColor(status)}`}
    />
  );
}