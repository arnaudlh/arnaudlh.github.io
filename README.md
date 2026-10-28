# Arnaud Lheureux's blog

🌐 **Website: [www.lheureuxlabs.com](https://www.lheureuxlabs.com)**

Blogging about Azure, infrastructure as code, networking and security, when time allows. Posts from 2012 onwards were migrated from [lheureuxlabs.com](https://www.lheureuxlabs.com/).

- [Latest posts](https://www.lheureuxlabs.com)
- [Archives](https://www.lheureuxlabs.com/archive)
- [About](https://www.lheureuxlabs.com/about)
- [RSS feed](https://www.lheureuxlabs.com/rss.xml)

## Local development

The site is built with [Docusaurus](https://docusaurus.io/) and lives in [`website/`](website/).

```bash
cd website
npm ci
npm start   # dev server at http://localhost:3000
npm run build   # production build in website/build
```

Pushing to `main` deploys the site to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

## Custom domain

GitHub Pages publishes the generated site from `gh-pages`. The
[`website/static/CNAME`](website/static/CNAME) file keeps `www.lheureuxlabs.com`
configured across deployments; `url` in
[`website/docusaurus.config.ts`](website/docusaurus.config.ts) sets the canonical,
sitemap, and feed URLs. Keep these settings aligned.

The public Azure DNS zone `lheureuxlabs.com` is in resource group
`sharedresources`, subscription `ece04c6f-d78a-4c30-b05e-fd68b5733289`.
The hosting records for GitHub Pages are:

| Name | Type | Value | TTL |
| --- | --- | --- | --- |
| `www` | CNAME | `arnaudlh.github.io` | 900 |
| `@` | A | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` | 900 |

Configure the custom domain in GitHub Pages before switching DNS. GitHub Pages
redirects the apex domain and `arnaudlh.github.io` to `www.lheureuxlabs.com`.
Enable **Enforce HTTPS** after GitHub provisions the domain certificate.
Certificate provisioning and DNS propagation can take up to 24 hours.
Leave unrelated DNS records unchanged.

All 61 published WordPress posts retain their dated article paths. Images are
stored alongside the Markdown posts, all 69 public WordPress comments are archived
in the site, and new comments use GitHub Discussions through Giscus. The RSS feed is
`/rss.xml`; readers using the old WordPress `/feed/` address should update their
subscription.

Keep the WordPress App Service running until the custom domain, HTTPS, article
URLs, and images have been verified. To roll back the hosting records, restore
the apex A record to `20.111.1.3` and the `www` CNAME to
`arnaud-web.azurewebsites.net` (both with TTL 900). These are the pre-cutover
values; retain a fresh DNS snapshot before making any live changes.
