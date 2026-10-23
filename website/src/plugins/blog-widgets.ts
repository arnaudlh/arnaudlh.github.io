import type {LoadContext, Plugin} from '@docusaurus/types';
import type {BlogContent} from '@docusaurus/plugin-content-blog';

export type BlogWidgetsData = {
  archives: {year: number; month: number; count: number}[];
  tags: {label: string; permalink: string; count: number}[];
  posts: {title: string; permalink: string; date: string; tags: string[]}[];
  latestPermalink?: string;
};

// Exposes archive months and tag counts so the WordPress-style sidebar can render them.
export default function blogWidgetsPlugin(_context: LoadContext): Plugin {
  return {
    name: 'blog-widgets',
    async allContentLoaded({allContent, actions}) {
      const blog = allContent['docusaurus-plugin-content-blog']?.default as BlogContent | undefined;
      if (!blog) return;

      const months = new Map<string, {year: number; month: number; count: number}>();
      for (const post of blog.blogPosts) {
        if (post.metadata.unlisted) continue;
        const d = new Date(post.metadata.date);
        const year = d.getUTCFullYear();
        const month = d.getUTCMonth();
        const key = `${year}-${month}`;
        const entry = months.get(key) ?? {year, month, count: 0};
        entry.count += 1;
        months.set(key, entry);
      }

      const listed = blog.blogPosts.filter((p) => !p.metadata.unlisted);
      const data: BlogWidgetsData = {
        posts: listed.map((p) => ({
          title: p.metadata.title,
          permalink: p.metadata.permalink,
          date: p.metadata.date.toISOString(),
          tags: p.metadata.tags.map((t) => t.label),
        })),
        latestPermalink: listed[0]?.metadata.permalink,
        archives: Array.from(months.values()).sort((a, b) => b.year - a.year || b.month - a.month),
        tags: Object.values(blog.blogTags)
          .filter((t) => !t.unlisted)
          .map((t) => ({label: t.label, permalink: t.permalink, count: t.items.length}))
          .sort((a, b) => a.label.localeCompare(b.label)),
      };
      actions.setGlobalData(data);
    },
  };
}
