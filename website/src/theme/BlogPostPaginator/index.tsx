import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/BlogPostPaginator';

// WordPress-style "Previous Post / Next Post" navigation (older on the left).
export default function BlogPostPaginator({nextItem, prevItem}: Props): ReactNode {
  if (!nextItem && !prevItem) return null;
  return (
    <nav className="wp-post-navigation" aria-label="Post navigation">
      <div className="wp-nav-previous">
        {nextItem && (
          <Link to={nextItem.permalink} rel="prev">
            <span className="wp-meta-nav">Previous Post</span>
            {nextItem.title}
          </Link>
        )}
      </div>
      <div className="wp-nav-next">
        {prevItem && (
          <Link to={prevItem.permalink} rel="next">
            <span className="wp-meta-nav">Next Post</span>
            {prevItem.title}
          </Link>
        )}
      </div>
    </nav>
  );
}
