import type { PortalDocument, PortalNode } from "./types";

export function findNodeById(root: PortalDocument | PortalNode, id: string): PortalNode | null {
  const stack: PortalNode[] = ("pages" in root ? (root as PortalDocument).pages : [(root as PortalNode)]) as PortalNode[];
  while (stack.length) {
    const n = stack.pop()!;
    if (n.id === id) return n;
    if (n.children) stack.push(...n.children);
  }
  return null;
}

export function updateNodeById(doc: PortalDocument, id: string, mutator: (node: PortalNode) => void): PortalDocument {
  const clone = structuredClone(doc);
  const apply = (nodes?: PortalNode[]): boolean => {
    if (!nodes) return false;
    for (const n of nodes) {
      if (n.id === id) {
        mutator(n);
        return true;
      }
      if (n.children && apply(n.children)) return true;
    }
    return false;
  };
  apply(clone.pages);
  return clone;
}

export function removeNode(doc: PortalDocument, id: string): PortalDocument {
  const clone = structuredClone(doc);
  const walk = (nodes?: PortalNode[]) => {
    if (!nodes) return;
    const idx = nodes.findIndex((n) => n.id === id);
    if (idx >= 0) {
      nodes.splice(idx, 1);
      return true;
    }
    for (const n of nodes) if (walk(n.children)) return true;
    return false;
  };
  walk(clone.pages);
  return clone;
}

export function insertNodeAfter(doc: PortalDocument, targetId: string, newNode: PortalNode): PortalDocument {
  const clone = structuredClone(doc);
  const walk = (nodes?: PortalNode[]) => {
    if (!nodes) return false;
    const idx = nodes.findIndex((n) => n.id === targetId);
    if (idx >= 0) {
      nodes.splice(idx + 1, 0, newNode);
      return true;
    }
    for (const n of nodes) if (walk(n.children)) return true;
    return false;
  };
  walk(clone.pages);
  return clone;
}

export function getParentMap(doc: PortalDocument): Map<string, string> {
  const map = new Map<string, string>();
  const walk = (parentId: string, nodes?: PortalNode[]) => {
    if (!nodes) return;
    for (const n of nodes) {
      map.set(n.id, parentId);
      if (n.children) walk(n.id, n.children);
    }
  };
  walk("root", doc.pages);
  return map;
}

export function reorderSibling(doc: PortalDocument, parentId: string, activeId: string, overId: string): PortalDocument {
  const clone = structuredClone(doc);
  const walk = (node: PortalNode) => {
    if (!node.children) return false;
    const ids = node.children.map((n) => n.id);
    const i1 = ids.indexOf(activeId);
    const i2 = ids.indexOf(overId);
    if (i1 >= 0 && i2 >= 0) {
      const [moved] = node.children.splice(i1, 1);
      node.children.splice(i2, 0, moved);
      return true;
    }
    for (const c of node.children) if (walk(c)) return true;
    return false;
  };
  if (parentId === "root") {
    const ids = clone.pages.map((p) => p.id);
    const i1 = ids.indexOf(activeId);
    const i2 = ids.indexOf(overId);
    if (i1 >= 0 && i2 >= 0) {
      const [moved] = clone.pages.splice(i1, 1);
      clone.pages.splice(i2, 0, moved);
    }
    return clone;
  }
  const parent = findNodeById(clone, parentId);
  if (parent) walk(parent);
  return clone;
}

export function getPathToNode(doc: PortalDocument, id: string): PortalNode[] {
  const path: PortalNode[] = [];
  let found = false;
  const dfs = (nodes: PortalNode[], stack: PortalNode[]) => {
    for (const n of nodes) {
      stack.push(n);
      if (n.id === id) {
        path.push(...stack);
        found = true;
        return;
      }
      if (n.children && !found) dfs(n.children, stack);
      stack.pop();
      if (found) return;
    }
  };
  dfs(doc.pages, []);
  return path;
}