# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Analytics

[Microsoft Clarity dashboard](https://clarity.microsoft.com/projects/view/zcdex5g68p/dashboard)
provides visitor insights for the blog. The public project ID is configured in
`src/utils/clarity.ts`; it is not a secret.

Clarity loads only in production on `www.lheureuxlabs.com` or `lheureuxlabs.com`,
after explicit acceptance through the site-wide Analytics preferences control.
The first-party `site_analytics` cookie remembers acceptance or refusal for 180 days.
Advertising consent is always denied. Withdrawal uses Clarity's cookie-erasure API
and reloads the page to unload tracking. Comments are masked in recordings.

In Clarity **Settings > Setup**, disable cookies by default (Consent Mode).
Keep sensitive-content masking enabled. Local development and preview hosts never
send Clarity telemetry. The `/privacy` page describes the integration to visitors.

Run `npm run test:analytics` for focused consent and tracking checks.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
