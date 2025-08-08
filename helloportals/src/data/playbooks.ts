export type PlaybookStep = {
  id: string;
  name: string;
  ownerAvatar: string;
  status: "done" | "pending";
};

export type Playbook = {
  id: string;
  title: string;
  category: string;
  status: string;
  tasks: number;
  scenarios: number;
  description: string;
  steps: PlaybookStep[];
};

export const playbooks: Playbook[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `pb-${i + 1}`,
  title: "Sales playbook SMB",
  category: "Sales",
  status: "Active",
  tasks: 42,
  scenarios: 4,
  description: "Steps for selling new SMB clients (between 20 and 100 employees)",
  steps: [
    { id: "st-1", name: "Sales handoff prep", ownerAvatar: "/avatars/user1.jpg", status: "pending" },
    { id: "st-2", name: "Sales introduces CSM", ownerAvatar: "/avatars/user2.jpg", status: "done" },
  ],
}));