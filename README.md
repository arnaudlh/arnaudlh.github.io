# Arnaud Lheureux's blog

🌐 **Website: [arnaudlh.github.io](https://arnaudlh.github.io)**

Blogging about Azure, infrastructure as code, networking and security, when time allows. Posts from 2012 onwards were migrated from [lheureuxlabs.com](https://www.lheureuxlabs.com/).

- [Latest posts](https://arnaudlh.github.io)
- [Archives](https://arnaudlh.github.io/archive)
- [About](https://arnaudlh.github.io/about)
- [RSS feed](https://arnaudlh.github.io/rss.xml)

## Local development

The site is built with [Docusaurus](https://docusaurus.io/) and lives in [`website/`](website/).

```bash
cd website
npm ci
npm start   # dev server at http://localhost:3000
npm run build   # production build in website/build
```

Pushing to `main` deploys the site to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
