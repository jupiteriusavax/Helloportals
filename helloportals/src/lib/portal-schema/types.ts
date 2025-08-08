export type NodeType = 'page' | 'section' | 'grid' | 'area' | 'group' | 'text' | 'media' | 'widget';

export interface StyleProps {
  width?: number | 'auto';
  maxWidth?: number;
  padding?: number | [number, number, number, number];
  color?: string;
  background?: string;
  radius?: number;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  position?: 'static' | 'relative' | 'absolute';
  transform?: { scale?: number; rotate?: number };
}

export interface BehaviorProps {
  visibility?: 'always' | 'roles' | 'conditions';
  conditions?: Array<{ field: string; op: 'eq'|'neq'|'gt'|'lt'|'in'; value: unknown }>;
  actions?: Array<{ event: 'click'|'mount'; type: 'openLink'|'emitEvent'|'toggle'; payload?: unknown }>;
}

export interface ContentProps {
  text?: string;
  richText?: string;
  imageSrc?: string;
  imageAlt?: string;
  fit?: 'cover'|'contain';
  brightness?: number; // 0-100
}

export interface PortalNode {
  id: string;
  name: string;
  type: NodeType;
  props: {
    content?: ContentProps;
    behavior?: BehaviorProps;
    style?: StyleProps;
  };
  children?: PortalNode[];
}

export interface PortalDocument {
  id: string;
  name: string;
  pages: PortalNode[];   // node.type === 'page'
  tokens?: { colorPrimary: string; radius: number };
  updatedAt: string;
}