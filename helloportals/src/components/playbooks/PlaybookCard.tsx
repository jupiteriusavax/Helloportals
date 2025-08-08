"use client";

import React from "react";
import { Badge } from "./Badge";
import { StatusDot } from "./StatusDot";

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

interface PlaybookCardProps {
  playbook: Playbook;
}

export function PlaybookCard({ playbook }: PlaybookCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">
              {playbook.title.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{playbook.title}</h3>
            <p className="text-sm text-gray-500">{playbook.description}</p>
          </div>
        </div>
        <StatusDot status={playbook.status} />
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <img
            src={playbook.author.avatar}
            alt={playbook.author.name}
            className="w-5 h-5 rounded-full"
          />
          <span>{playbook.author.name}</span>
        </div>
        <span>{playbook.views} views</span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Badge status={playbook.status} />
        <span className="text-xs text-gray-400">
          Modified {new Date(playbook.lastModified).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}