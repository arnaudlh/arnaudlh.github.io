import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {usePluginData} from '@docusaurus/useGlobalData';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import ShareButtons from '@site/src/components/ShareButtons';
import Comments from '@site/src/components/Comments';
import type {BlogWidgetsData} from '@site/src/plugins/blog-widgets';

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-US', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'}).format(
    new Date(iso),
  );

function RelatedPosts({permalink, tags}: {permalink: string; tags: string[]}): ReactNode {
  const {posts} = usePluginData('blog-widgets') as BlogWidgetsData;
  const related = posts
    .filter((p) => p.permalink !== permalink)
    .map((p) => ({...p, shared: p.tags.filter((t) => tags.includes(t))}))
    .filter((p) => p.shared.length > 0)
    .sort((a, b) => b.shared.length - a.shared.length || b.date.localeCompare(a.date))
    .slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="wp-related">
      <h3 className="wp-share-title">Related</h3>
      <div className="wp-related-grid">
        {related.map((p) => (
          <p key={p.permalink}>
            <Link to={p.permalink}>{p.title}</Link>
            <time dateTime={p.date}>{formatDate(p.date)}</time>
            <span>In &quot;{p.shared[0]}&quot;</span>
          </p>
        ))}
      </div>
    </section>
  );
}

// WordPress-style post footer: share buttons, "Tagged" chips and related posts.
export default function BlogPostItemFooter(): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {siteConfig} = useDocusaurusContext();
  const {pathname} = useLocation();
  const {latestPermalink} = usePluginData('blog-widgets') as BlogWidgetsData;
  const {tags, title, permalink, hasTruncateMarker} = metadata;

  // On the home page the latest post is rendered in full, like WordPress.
  const expandedOnHome = pathname === siteConfig.baseUrl && permalink === latestPermalink;
  const truncated = !isBlogPostPage && hasTruncateMarker && !expandedOnHome;

  return (
    <footer className="wp-entry-footer">
      {truncated && (
        <p>
          <Link to={permalink} className="wp-more-link" aria-label={`Read more about ${title}`}>
            Continue reading →
          </Link>
        </p>
      )}
      <ShareButtons url={siteConfig.url + permalink} title={title} />
      {tags.length > 0 && (
        <div className="wp-entry-tags">
          Tagged{' '}
          {tags.map((t) => (
            <Link key={t.permalink} to={t.permalink} className="wp-tag" rel="tag">
              {t.label}
            </Link>
          ))}
        </div>
      )}
      {isBlogPostPage && <RelatedPosts permalink={permalink} tags={tags.map((t) => t.label)} />}
      {isBlogPostPage && <Comments permalink={permalink} />}
    </footer>
  );
}
