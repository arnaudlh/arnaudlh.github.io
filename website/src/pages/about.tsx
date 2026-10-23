import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

type Item = {title: string; href: string; description: string};

const projects: Item[] = [
  {
    title: 'Azure landing zones',
    href: 'https://github.com/arnaudlh/landingzone_template',
    description:
      'Cloud Adoption Framework (CAF) landing zones with Terraform: templates, modules and the rover toolchain to scaffold enterprise-scale Azure environments.',
  },
  {
    title: 'Secure my code',
    href: 'https://github.com/arnaudlh/securemycode',
    description:
      'Security guidance, guardrails and agents for GitHub Copilot to help developers ship secure code by default.',
  },
  {
    title: 'Git-Ape',
    href: 'https://github.com/arnaudlh/git-ape-demo',
    description:
      'Agent-driven Azure deployments from GitHub: requirements, ARM templates, policy checks and deployment in one guided flow.',
  },
];

const socialLinks = [
  {label: 'GitHub', href: 'https://github.com/arnaudlh'},
  {label: 'LinkedIn', href: 'https://www.linkedin.com/in/arnaudlheureux/'},
  {label: 'YouTube', href: 'https://www.youtube.com/channel/UClUc0s40AA5FjjA-TRCQaeA'},
  {label: 'X / Twitter', href: 'https://x.com/ArnaudLheureux'},
];

export default function About(): ReactNode {
  return (
    <Layout
      title="About"
      description="Arnaud Lheureux — Azure Architect at Microsoft, working on Azure, infrastructure as code and AI-assisted developer tooling.">
      <main className="wp-page">
        <article className="wp-page-content">
          <Heading as="h1">About</Heading>
          <img
            className="wp-avatar"
            src="https://github.com/arnaudlh.png?size=320"
            alt="Arnaud Lheureux"
            width={160}
            height={160}
          />
          <p>
            Hi, I&apos;m Arnaud. I build a thing or two @ Microsoft — Azure, infrastructure as code
            and AI-assisted developer tooling. I&apos;m based in Singapore.
          </p>
          <p>
            This blog has been running since 2012, first in French while I was an infrastructure
            architect at Microsoft France, then in English covering Azure networking, security,
            governance and Cloud Adoption Framework landing zones with Terraform.
          </p>

          <Heading as="h2">What I work on</Heading>
          <ul>
            {projects.map((p) => (
              <li key={p.title}>
                <Link href={p.href}>{p.title}</Link> — {p.description}
              </li>
            ))}
          </ul>

          <Heading as="h2">Get in touch</Heading>
          <div className="wp-buttons">
            {socialLinks.map((l) => (
              <Link key={l.label} href={l.href} className="wp-button">
                {l.label}
              </Link>
            ))}
          </div>
        </article>
      </main>
    </Layout>
  );
}
