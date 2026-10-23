import React from 'react';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

export default function BlogPostItemHeaderInfo(): JSX.Element {
  const {metadata} = useBlogPost();
  const {date, permalink, authors} = metadata;
  const formatted = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
  const author = authors[0];

  return (
    <div className="entry-meta">
      Posted on{' '}
      <Link to={permalink}>
        <time dateTime={date}>{formatted}</time>
      </Link>
      {author?.name && (
        <>
          {' '}by <Link to="/about">{author.name.split(' ')[0]}</Link>
        </>
      )}
    </div>
  );
}
