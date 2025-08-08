export type RoleType = "INTERNAL" | "CLIENT" | "STAKEHOLDER";

export type Permission =
  | "view:sales-room"
  | "view:success-room"
  | "edit:playbook"
  | "view:portal"
  | "configure:integrations";

export function getDefaultPermissions(roleType: RoleType): Permission[] {
  switch (roleType) {
    case "INTERNAL":
      return [
        "view:portal",
        "edit:playbook",
        "view:sales-room",
        "view:success-room",
        "configure:integrations",
      ];
    case "CLIENT":
      return ["view:portal", "view:success-room"];
    case "STAKEHOLDER":
      return ["view:portal", "view:sales-room"];
    default:
      return ["view:portal"];
  }
}

export function getPortalVariant(roleType: RoleType): "internal" | "client" | "stakeholder" {
  if (roleType === "INTERNAL") return "internal";
  if (roleType === "CLIENT") return "client";
  return "stakeholder";
}