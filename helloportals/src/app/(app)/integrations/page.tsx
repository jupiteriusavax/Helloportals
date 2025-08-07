export default function IntegrationsPage() {
  const items = [
    { key: "salesforce", name: "Salesforce" },
    { key: "notion", name: "Notion" },
    { key: "jira", name: "Jira" },
    { key: "slack", name: "Slack" },
  ];
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Intégrations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((i) => (
          <div key={i.key} className="border rounded p-4">
            <div className="font-medium">{i.name}</div>
            <p className="text-sm text-neutral-600">Connectez {i.name} pour synchroniser données et actions.</p>
            <form method="post" action={`/api/integrations/${i.key}/connect`}>
              <button className="mt-2 px-3 py-1.5 text-sm rounded-md bg-black text-white">Connecter</button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}