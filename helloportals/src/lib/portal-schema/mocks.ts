import type { PortalDocument, PortalNode } from "./types";

function node(id: string, name: string, type: PortalNode["type"], props: PortalNode["props"] = {}, children: PortalNode[] = []): PortalNode {
  return { id, name, type, props, children };
}

export function cloneTemplateSMB(id: string): PortalDocument {
  const heroMedia = node("media-hero", "Media", "media", { content: { imageSrc: "https://picsum.photos/1200/240", imageAlt: "Hero", fit: "cover", brightness: 100 }, style: { radius: 16 } });
  const heroTitle = node("text-hero", "Text", "text", { content: { text: "Sync. Strategize. Win" }, style: { color: "#FFFFFF" } });
  const hero = node("section-hero", "Hero", "section", { style: { padding: 24, background: "#3B82F6", radius: 16 } }, [heroTitle, heroMedia]);

  const announcements = node("card-ann", "Announcements", "group", { content: { text: "Welcome to our client portal. Discover updates and resources curated for your project." }, style: { radius: 16 } });
  const todo = node("card-todo", "To-Do-List", "group", { content: { text: "Familiarize with tasks our team will work on." }, style: { radius: 16 } });
  const timeline = node("card-timeline", "Timeline", "group", { content: { text: "Project Timeline guides our collaboration from kickoff to completion." }, style: { radius: 16 } });
  const docs = node("card-docs", "Client Documentation", "group", { content: { text: "A prepared selection of important documents for you." }, style: { radius: 16 } });

  const grid = node("grid-cards", "Grid", "grid", { }, [announcements, todo, timeline, docs]);

  const page = node("page-onboarding", "Onboarding Page", "page", {}, [hero, grid]);

  return {
    id,
    name: "Template SMB",
    pages: [page],
    tokens: { colorPrimary: "#3B82F6", radius: 16 },
    updatedAt: new Date().toISOString(),
  };
}