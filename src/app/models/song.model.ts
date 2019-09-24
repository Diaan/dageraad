export interface Song {
  wpId: number;
  slug: string;
  title: string;
  trackNumber: number;
  imageUrl: string;
  x: number;
  y: number;
  rotation: number;
  text?: string;
  videoId?: string;
  detail?: any;
  spotify?: string;
  links?: {
    next: string;
    prev: string;
  };
}

export interface WordpressPage {
  id: number;
  date: string;
  date_gmt: string;
  guid: RenderedContent;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: RenderedContent;
  content: RenderedContent;
  excerpt: RenderedContent;
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta?: PageMatadata;
  _links: any;
}

export interface PageMatadata {
  video?: string;
  spotify?: string;
}

export interface RenderedContent {
  rendered: string;
  protected?: boolean;
}
