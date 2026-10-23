import type {ReactNode} from 'react';
import Giscus from '@giscus/react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import archive from '@site/src/data/wp-comments.json';

type ArchivedComment = {author: string; date: string; paragraphs: string[]};

const URL_RE = /(https?:\/\/[^\s<>"')]+)/g;

function Linkified({text}: {text: string}): ReactNode {
  return text.split(URL_RE).map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={part} rel="nofollow ugc noopener noreferrer" target="_blank">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

const formatDate = (iso: string): string | null => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? null
    : new Intl.DateTimeFormat('en-US', {day: 'numeric', month: 'long', year: 'numeric'}).format(date);
};

function ArchivedComments({comments}: {comments: ArchivedComment[]}): ReactNode {
  return (
    <section className="wp-comments-archive">
      <h3 className="wp-comments-title">
        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        <span> from the original blog</span>
      </h3>
      <ol>
        {comments.map((c) => (
          <li key={`${c.author}-${c.date}-${c.paragraphs[0]?.slice(0, 20)}`}>
            <div className="wp-comment-meta">
              <strong>{c.author}</strong>{' '}
              {formatDate(c.date) && <time dateTime={c.date}>{formatDate(c.date)}</time>}
            </div>
            {c.paragraphs.map((p, i) => (
              <p key={i}>
                <Linkified text={p} />
              </p>
            ))}
          </li>
        ))}
      </ol>
    </section>
  );
}

// Archived WordPress comments followed by live comments stored in GitHub Discussions.
export default function Comments({permalink}: {permalink: string}): ReactNode {
  const key = permalink.replace(/\/+$/, '');
  const archived = (archive as Record<string, ArchivedComment[]>)[key];

  return (
    <div className="wp-comments">
      {archived && <ArchivedComments comments={archived} />}
      <section className="wp-comments-live">
        <h3 className="wp-comments-title">Leave a Reply</h3>
        <BrowserOnly fallback={<p>Loading comments…</p>}>
          {() => (
            <Giscus
              repo="arnaudlh/arnaudlh.github.io"
              repoId="R_kgDOL0Q-tw"
              category="Announcements"
              categoryId="DIC_kwDOL0Q-t84DJam3"
              mapping="pathname"
              strict="1"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme="light"
              lang="en"
              loading="lazy"
            />
          )}
        </BrowserOnly>
      </section>
    </div>
  );
}
