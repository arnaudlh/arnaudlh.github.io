import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Arnaud Lheureux",
  tagline: "Azure Architect @ Microsoft",
  favicon: "img/favicon.jpg",

  // Set the production url of your site here
  url: "https://arnaudlh.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "arnaudlh", // Usually your GitHub org/user name.
  projectName: "arnaudlh.github.io", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Posts imported from WordPress are plain Markdown (not MDX).
  markdown: {
    format: "detect",
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: {
          routeBasePath: "/",
          tagsBasePath: "tag",
          showReadingTime: false,
          blogTitle: "Arnaud Lheureux",
          blogDescription: "Azure, infrastructure as code, networking and security",
          blogSidebarTitle: "Recent Posts",
          blogSidebarCount: "ALL",
          postsPerPage: 10,
          feedOptions: { type: "all", limit: 20 },
          onInlineAuthors: "throw",
          onUntruncatedBlogPosts: "ignore",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: ["./src/plugins/blog-widgets.ts"],

  themeConfig: {
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    // Replace with your project's social card
    image: "img/header.jpg",
    navbar: {
      title: "Arnaud Lheureux",
      style: "dark",
      items: [
        { to: "/", label: "Home", position: "right", activeBaseRegex: "^/(page/\\d+/?)?$" },
        { to: "/about", label: "About", position: "right" },
        { to: "/archive", label: "Archives", position: "right" },
        { href: "https://github.com/arnaudlh", label: "GitHub", position: "right" },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Reach out",
          items: [
            {
              label: "Youtube",
              href: "https://www.youtube.com/channel/UClUc0s40AA5FjjA-TRCQaeA",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/arnaudlheureux/",
            },
            {
              label: "Twitter",
              href: "https://x.com/ArnaudLheureux",
            },
          ],
        },
        {
          title: "Meta",
          items: [
            {
              label: "Archives",
              to: "/archive",
            },
            {
              label: "GitHub",
              href: "https://github.com/arnaudlh",
            },
            {
              label: "RSS feed",
              href: "pathname:///rss.xml",
            },
          ],
        },
      ],
      copyright: `<h3 class="wp-footer-brand">Arnaud Lheureux</h3>© ${new Date().getFullYear()} All rights reserved.<br/>Theme inspired by <a href="https://www.themealley.com/">ThemeAlley</a> Alexandria.<br/>Powered by <a href="https://docusaurus.io">Docusaurus</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
