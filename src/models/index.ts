export type Frontmatter = {
  title: string;
  description: string;
  layout: string;
  image?: { src: string; alt: string };
  isMdx?: boolean;
  tags?: string[];
  author?: string;
};
export type PaginatorProps = {
  /** url of the current page */
  current: string;
  /** url of the previous page (if there is one) */
  prev: string | undefined;
  /** url of the next page (if there is one) */
  next: string | undefined;
};
export type Page<T = any> = {
  /** result */
  data: T[];
  /** metadata */
  /** the count of the first item on the page, starting from 0 */
  start: number;
  /** the count of the last item on the page, starting from 0 */
  end: number;
  /** total number of results */
  total: number;
  /** the current page number, starting from 1 */
  currentPage: number;
  /** number of items per page (default: 25) */
  size: number;
  /** number of last page */
  lastPage: number;

  url: PaginatorProps;
};
