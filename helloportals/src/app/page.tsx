import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold">HelloPortals</h1>
        <p className="text-neutral-600">Portails client B2B, playbooks et intégrations</p>
        <Link href="/portal" className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-black text-white hover:bg-neutral-800">Accéder au portail</Link>
      </div>
    </main>
  );
}
