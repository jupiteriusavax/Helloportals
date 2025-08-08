import { describe, it, expect } from "vitest";
import { cloneTemplateSMB } from "../../portal-schema/mocks";
import { updateNodeById, insertNodeAfter, findNodeById } from "../transforms";

describe("transforms", () => {
  it("updateNodeById updates node props", () => {
    const doc = cloneTemplateSMB("test");
    const heroTextId = "text-hero";
    const updated = updateNodeById(doc, heroTextId, (n) => { n.props.content = { ...(n.props.content ?? {}), text: "New" }; });
    expect(findNodeById(updated, heroTextId)?.props.content?.text).toBe("New");
  });

  it("insertNodeAfter inserts sibling after target", () => {
    const doc = cloneTemplateSMB("test");
    const newNode = { id: "card-new", name: "New", type: "group" as const, props: {}, children: [] };
    const updated = insertNodeAfter(doc, "card-todo", newNode);
    const grid = findNodeById(updated, "grid-cards")!;
    const ids = grid.children!.map((c) => c.id);
    expect(ids.indexOf("card-new")).toBe(ids.indexOf("card-todo") + 1);
  });
});