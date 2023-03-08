export type Frontmatter = {
  title: string;
  description: string;
  layout: string;
  image?: { src: string; alt: string };
  isMdx?: boolean;
  tags?: string[];
  author?: string;
};
