import React from "react";

export type Status = "done" | "pending";

export function StatusDot({ status }: { status: Status }) {
  const isDone = status === "done";
  return (
    <span
      aria-label={isDone ? "done" : "pending"}
      className={`ml-auto inline-block h-2.5 w-2.5 rounded-full ${isDone ? "bg-green-500" : "bg-red-500"}`}
    />
  );
}