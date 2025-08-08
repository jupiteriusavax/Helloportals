export type OrderFormStatus = 'Draft' | 'Viewed' | 'Needs Approval' | 'Signed' | '';

export interface WorkspaceRow {
  id: string;
  account: {
    name: string;
    logo: string; // path under /public/logos
  };
  workspaceName: string;
  owner: {
    name: string;
    avatar: string; // path under /public/avatars
  };
  oppAmount: number; // in USD
  lastClientView: string; // ISO date string
  views: number;
  orderFormStatus: OrderFormStatus;
  planProgress: number | null; // 0..100, null means no plan
  createdAt: string; // ISO date string for Created Date filter
}