import EditorShell from "../../../components/portal-editor/EditorShell";

export default async function WorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Mock portal data
  const portal = {
    id,
    name: `Workspace ${id}`,
    description: "Description du workspace",
    nodes: [],
    edges: []
  };

  const handleSave = (updatedPortal: any) => {
    console.log("Saving portal:", updatedPortal);
  };

  return <EditorShell portal={portal} onSave={handleSave} />;
}