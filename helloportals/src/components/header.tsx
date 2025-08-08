"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                HelloPortals
              </Link>
            </div>
            <nav className="ml-6 flex space-x-8">
              <Link
                href="/playbooks"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Playbooks
              </Link>
              <Link
                href="/integrations"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Intégrations
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="flex space-x-4">
              <Link
                href="/sign-in"
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Se connecter
              </Link>
              <Link
                href="/sign-up"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}