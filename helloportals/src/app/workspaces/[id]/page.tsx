import EditorShell from "@/components/portal-editor/EditorShell";

export default async function WorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditorShell workspaceId={id} />;
}