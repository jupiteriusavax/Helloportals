import { notFound } from "next/navigation";

export default function PlaybookDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">Playbook {id}</h1>
      <p className="mt-2 text-sm text-gray-500">Page détail/éditeur à venir.</p>
    </div>
  );
}