import React from "react";
import { twMerge } from "tailwind-merge";

type BadgeProps = {
  color: "blue" | "green" | "gray";
  text: string;
  className?: string;
};

const colorMap: Record<BadgeProps["color"], string> = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  gray: "bg-gray-100 text-gray-700",
};

export function Badge({ color, text, className }: BadgeProps) {
  return (
    <span className={twMerge("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", colorMap[color], className)}>
      {text}
    </span>
  );
}