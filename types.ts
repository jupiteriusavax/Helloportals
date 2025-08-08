export type OrderFormStatus = 'Draft' | 'Viewed' | 'Needs Approval' | 'Signed' | '';

export interface WorkspaceRow {
  id: string;
  account: {
    name: string;
    logo: string; // path under /public/logos
  };
  workspace: string;
  owner: {
    name: string;
    avatar: string; // path under /public/avatars
  };
  oppAmount: number; // in USD cents or dollars; here: dollars
  lastClientView: string; // ISO date string
  views: number;
  orderFormStatus: OrderFormStatus;
  planStatus: number; // 0-100
  createdAt: string; // ISO date string
}

export type SortKey = 'oppAmount' | 'lastClientView' | null;
export type SortDirection = 'asc' | 'desc';