import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Privacy(): ReactNode {
  return (
    <Layout title="Privacy" description="Optional analytics and privacy on this blog.">
      <main className="wp-page">
        <article className="wp-page-content">
          <Heading as="h1">Privacy and analytics</Heading>
          <p>
            This blog uses Microsoft Clarity only if you accept optional analytics.
            Declining does not affect access to articles.
          </p>
          <Heading as="h2">What Clarity collects</Heading>
          <p>
            Clarity collects page visits, device and browser information, clicks and scrolling.
            It uses heatmaps and session recordings to help me understand which content is useful
            and improve the site. Clarity cookies link activity across visits. Advertising
            consent is always denied by this site, and comment sections are masked.
          </p>
          <p>
            Microsoft processes this information. Read the{' '}
            <a href="https://privacy.microsoft.com/privacystatement">Microsoft Privacy Statement</a>{' '}
            and{' '}
            <a href="https://learn.microsoft.com/clarity/setup-and-installation/clarity-data">
              Clarity data collection information
            </a>{' '}
            for details.
          </p>
          <Heading as="h2">Your choice</Heading>
          <p>
            No Clarity script loads before you accept. The site stores your choice in a
            first-party preference cookie for 180 days. Use the Analytics preferences button
            at the bottom of any page to change it. Withdrawing consent clears Clarity&apos;s
            cookies and reloads the page to stop tracking; previously collected data is not
            deleted by this action.
          </p>
          <Heading as="h2">Other services</Heading>
          <p>
            GitHub Pages hosts this site, and new comments use Giscus backed by GitHub
            Discussions. These services operate separately from optional Clarity analytics.
            See the{' '}
            <a href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement">
              GitHub Privacy Statement
            </a>.
          </p>
        </article>
      </main>
    </Layout>
  );
}
