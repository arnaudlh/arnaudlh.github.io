import React, {memo, useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import {useVisibleBlogSidebarItems} from '@docusaurus/plugin-content-blog/client';
import type {Props} from '@theme/BlogSidebar/Desktop';
import type {BlogWidgetsData} from '@site/src/plugins/blog-widgets';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function Widget({title, children}: {title?: string; children: React.ReactNode}) {
  return (
    <section className="wp-widget">
      {title && <h2 className="wp-widget-title">{title}</h2>}
      {children}
    </section>
  );
}

function BlogSidebarDesktop({sidebar}: Props) {
  const items = useVisibleBlogSidebarItems(sidebar.items);
  const {archives, tags} = usePluginData('blog-widgets') as BlogWidgetsData;
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items.filter((i) => i.title.toLowerCase().includes(q)).slice(0, 10);
  }, [items, query]);

  const maxTag = Math.max(1, ...tags.map((t) => t.count));

  return (
    <aside className="col col--4 wp-widget-area">
      <nav aria-label="Blog sidebar">
        <Widget>
          <a className="wp-rss" href="/rss.xml" title="RSS feed" aria-label="RSS feed">
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <rect width="24" height="24" rx="4" fill="#f78422" />
              <circle cx="6.5" cy="17.5" r="2" fill="#fff" />
              <path d="M4.5 10.5a9 9 0 0 1 9 9h-2.6a6.4 6.4 0 0 0-6.4-6.4z" fill="#fff" />
              <path d="M4.5 4.5a15 15 0 0 1 15 15h-2.6A12.4 12.4 0 0 0 4.5 7.1z" fill="#fff" />
            </svg>
          </a>
        </Widget>

        <Widget>
          <form className="wp-search" role="search" onSubmit={(e) => e.preventDefault()}>
            <label>
              <span className="sr-only">Search for:</span>
              <input
                type="search"
                placeholder="Search …"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <button type="submit">Search</button>
          </form>
          {query.trim() && (
            <ul className="wp-search-results">
              {results.length === 0 && <li>Nothing found.</li>}
              {results.map((i) => (
                <li key={i.permalink}>
                  <Link to={i.permalink}>{i.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </Widget>

        <Widget title={sidebar.title}>
          <ul>
            {items.slice(0, 5).map((i) => (
              <li key={i.permalink}>
                <Link to={i.permalink}>{i.title}</Link>
              </li>
            ))}
          </ul>
        </Widget>

        <Widget title="Archives">
          <ul>
            {archives.map((a) => (
              <li key={`${a.year}-${a.month}`}>
                <Link to={`/archive#${a.year}`}>
                  {MONTHS[a.month]} {a.year}
                </Link>
              </li>
            ))}
          </ul>
        </Widget>

        <Widget title="Tags">
          <div className="wp-tagcloud">
            {tags.map((t) => (
              <Link
                key={t.permalink}
                to={t.permalink}
                title={`${t.count} post${t.count > 1 ? 's' : ''}`}
                style={{fontSize: `${(8 + (14 * (t.count - 1)) / Math.max(1, maxTag - 1)).toFixed(1)}pt`}}>
                {t.label}
              </Link>
            ))}
          </div>
        </Widget>

        <Widget title="Meta">
          <ul>
            <li>
              <a href="/rss.xml">Entries feed</a>
            </li>
            <li>
              <a href="/atom.xml">Atom feed</a>
            </li>
            <li>
              <Link href="https://github.com/arnaudlh/arnaudlh.github.io">Source on GitHub</Link>
            </li>
          </ul>
        </Widget>
      </nav>
    </aside>
  );
}

export default memo(BlogSidebarDesktop);
