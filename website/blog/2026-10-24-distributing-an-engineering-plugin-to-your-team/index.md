---
title: "Distributing your engineering plugin to the team"
date: 2026-10-24T01:00:00
draft: true
authors: [arnaud]
tags: ["GitHub Copilot", "Engineering", "Developer Tools", "AI"]
description: "Distribute engineering plugins across VS Code, the Copilot app, and CLI: publish a marketplace, configure repository adoption, and manage updates safely."
---

In [article 1](../2026-10-23-building-an-engineering-plugin-for-copilot-cli/index.md), we built a small engineering toolkit. In [article 2](../2026-11-12-evaluating-engineering-plugin-skills/index.md), we looked at evaluating its skills. Let's now share that package with a team, without asking each engineer to copy a collection of files.

We will continue with Git-Ape: register its marketplace, install the plugin, then declare it in a consuming repository. Finally, we will look at updates and rollback.

The same plugin-marketplace approach supports **VS Code, the Copilot app, and CLI**. We will use CLI commands for concrete examples, then distinguish each client's installation, repository configuration, and update behavior.

<!-- truncate -->

*Engineering plugins series:* [1. Build a plugin](../2026-10-23-building-an-engineering-plugin-for-copilot-cli/index.md) | [2. Evaluate its skills](../2026-11-12-evaluating-engineering-plugin-skills/index.md) | **3. Distribute to the team** | [4. Manage across the enterprise](../2026-10-24-managing-engineering-plugins-across-the-enterprise/index.md)

*Technical references checked October 24, 2026. The examples below are based on documentation and source review; installation and update behavior have not been reproduced end to end.*

## Start with the audience

Before choosing a distribution mechanism, decide what "everyone" means:

| Audience | Distribution approach |
|---|---|
| Engineers who want to try the plugin | Share the marketplace and installation commands. |
| Everyone working in a particular repository | Add repository-level plugin settings, with behavior depending on the client. |
| Users across many repositories | Include installation in developer onboarding or configure user-level settings. |
| Users on an enterprise's Copilot plan | Define enterprise-managed plugin standards, with device management where needed. |

Choose the narrowest scope that reaches your intended users. We will start with individual installation, then repository configuration; the next article covers enterprise policy.

Git-Ape is useful as a concrete example, but its [README](https://github.com/Azure/git-ape#readme) currently labels the project **experimental and not production-ready**. Use sandbox environments for this walkthrough. Distributing a deployment plugin does not authorize it to deploy resources or grant its users Azure access.

## Package versus catalog

The plugin and the marketplace have different responsibilities:

| File | Purpose |
|---|---|
| `plugin.json` | Describes the plugin and, in Git-Ape's legacy format, locates its component directories. |
| `.github/plugin/marketplace.json` | Describes a catalog and tells users where to find its plugins. |
| `.github/copilot/settings.json` | Can declare marketplaces and plugins for a consuming repository. |

A marketplace does not need to be a web application or a hosted service. It can be a Git repository containing a JSON catalog. The plugin may live in that same repository or be referenced from another supported source.

Git-Ape keeps its plugin at the repository root and its marketplace catalog under `.github/plugin/`:

```text
git-ape/
├── plugin.json
└── .github/
    ├── plugin/
    │   └── marketplace.json
    ├── agents/
    ├── skills/
    └── evals/
```

Here is a shortened version of its catalog, showing only the Git-Ape entry:

```json
{
  "name": "git-ape",
  "owner": {
    "name": "Microsoft",
    "url": "https://github.com/Azure/git-ape"
  },
  "metadata": {
    "description": "Git-Ape Azure deployment agents and skills"
  },
  "plugins": [
    {
      "name": "git-ape",
      "description": "Azure deployment workflows for GitHub Copilot",
      "source": "."
    }
  ]
}
```

The `"source": "."` points to the repository root, not to the directory containing `marketplace.json`. This is where Copilot finds the plugin's `plugin.json`. If you host several plugins in one repository, entries can instead point to directories such as `"./plugins/platform-review"`. GitHub's [marketplace creation guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-marketplace) documents this repository-relative resolution.

Keep version metadata aligned when releasing a plugin. The complete [Git-Ape catalog](https://github.com/Azure/git-ape/blob/main/.github/plugin/marketplace.json) includes version information and another plugin entry; the example above intentionally omits those details to focus on the distribution structure.

## Give users a short installation path

Before installing, review the publisher, bundled scripts, hooks, and external connections. Do this for packages from a marketplace as well as direct installations.

For Copilot CLI, [Git-Ape's installation guide](https://github.com/Azure/git-ape#option-c-copilot-cli-plugin) documents the following flow, with an extra browse step so users can inspect the catalog:

```shell
copilot plugin marketplace add Azure/git-ape
copilot plugin marketplace browse git-ape
copilot plugin install git-ape@git-ape
copilot plugin list
```

There are two names in `git-ape@git-ape`: the plugin name comes before `@`, and the registered marketplace name comes after it. The repository name used when adding the marketplace is a source; the marketplace's own `name` becomes its registration key. See GitHub's [installation guide](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing) for the complete command flow.

Start a new CLI session and inspect the available components:

```text
/skills list
/agent
```

Checking the inventory is only the first step. Try a low-risk prompt such as "Use /prereq-check to report which required tools are missing. Do not install tools or deploy anything." Inspect the proposed actions and confirm that the expected skill loads. Do not use a real deployment as the installation smoke test.

For a private internal marketplace, intended users need access to its Git repository and any separately referenced plugin repositories. Publishing a catalog does not bypass authentication or grant repository access. Explain required tools, network access, and sign-in steps in the onboarding documentation.

### Installing in the Copilot app

In the **GitHub Copilot app**, open **Customize > Plugins** to browse marketplaces and install plugins. Use the **Installed** view to confirm the plugin's source, version, and enabled state:

![Git-Ape installed and enabled in the Copilot app, with its version and marketplace source visible.](../2026-10-23-building-an-engineering-plugin-for-copilot-cli/copilot-app-git-ape.png)

Check the app's inventory and try the same read-only prerequisite task there. GitHub's [plugin overview](https://docs.github.com/en/copilot/concepts/customizations/plugins#where-can-i-get-plugins) documents the app's entry point.

### Installing in VS Code

In the Extensions view, search `@agentPlugins` to discover agent plugins. Configure your team's marketplace using `chat.plugins.marketplaces`, then install through the editor's plugin interface. This accepts an agent-plugin catalog; you do not need to create a VS Code extension.

VS Code currently labels `chat.plugins.marketplaces` experimental. It also documents automatic discovery of plugins installed by Copilot CLI under `~/.copilot/installed-plugins/`, so separate clients do not always mean separate copies of the plugin. Its `/plugin` commands and Agent Customizations editor currently use separate inventories; manage the plugin through the interface where you installed it.

Projects can also recommend the same plugin through `.github/copilot/settings.json`, as shown below. VS Code surfaces these as workspace recommendations, available through `@agentPlugins @recommended`; do not promise the CLI's identical auto-install behavior. See [agent plugins in VS Code](https://code.visualstudio.com/docs/agent-customization/agent-plugins).

## Make adoption part of the repository

Sharing commands works for early adopters. For a project team, put the intended plugin configuration under source control so it can be reviewed with the rest of the engineering environment.

For example, a consuming repository can include `.github/copilot/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "git-ape": {
      "source": {
        "source": "github",
        "repo": "Azure/git-ape"
      }
    }
  },
  "enabledPlugins": {
    "git-ape@git-ape": true
  }
}
```

Current Copilot CLI documentation describes `enabledPlugins` as declarative auto-install configuration. A plugin enabled only through this repository setting installs and activates for that repository, rather than becoming globally active in unrelated projects.

The keys do different jobs: `extraKnownMarketplaces` makes the catalog available, while `enabledPlugins` requests a specific plugin from that catalog. Registering a marketplace alone does not install every plugin it lists. Keep the marketplace key consistent with its catalog name, and use the complete `plugin@marketplace` identity.

The plugin-related keys in this file are also read by **Copilot cloud agent**, as documented in GitHub's [plugin overview](https://docs.github.com/en/copilot/concepts/customizations/plugins#where-can-i-get-plugins). This lets a repository declare the same plugin for CLI and cloud-agent work, without copying the skill files into each environment. Check component compatibility, dependencies, network access, and authentication on each surface.

In VS Code, the same keys produce [workspace plugin recommendations](https://code.visualstudio.com/docs/agent-customization/agent-plugins#_workspace-plugin-recommendations) for the user to install. Check the intended client versions before documenting your team's onboarding flow.

For the CLI, repository entries override the same keys in user settings, but `.github/copilot/settings.local.json` can supply personal repository overrides. Keep that local file out of source control. Enterprise-managed plugin entries take precedence over conflicting local configuration; we will cover those requirements in the next article.

Review changes to `.github/copilot/settings.json` through pull requests, and protect it with CODEOWNERS and repository rulesets where appropriate. A repository template can seed the file for new projects, but existing repositories still need the change. An ordinary repository's settings do not automatically become policy for other repositories; enterprise governance uses a separate mechanism, covered in the next article.

Keep normal tool approvals, repository access controls, and deployment confirmations in place when using the installed plugin. See the [repository settings reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference#repository-settings-githubcopilotsettingsjson) for supported keys and scope.

## Reach users across repositories

For users who need the toolkit in their everyday environment, add the installation commands to the developer onboarding process. Run them in the intended user's environment rather than installing once as an administrator and assuming every account receives the plugin.

If you need an enterprise standard rather than voluntary onboarding, GitHub provides [enterprise-managed plugin standards](https://docs.github.com/en/copilot/concepts/enterprise/plugin-standards). These apply to users receiving Copilot through the enterprise on supported clients. You do not need to copy `.github/copilot/settings.json` into every project to deliver this central policy. We will cover the governance repository, mandatory plugins, and team pilots in [the next article](../2026-10-24-managing-engineering-plugins-across-the-enterprise/index.md).

## Update the catalog and the installed plugin

After publishing changes, users can refresh the catalog and update the installed plugin:

```shell
copilot plugin marketplace update git-ape
copilot plugin update git-ape
copilot plugin list
```

The first command refreshes marketplace information. The second updates the plugin itself. Start a new session and check the loaded skills and agents before relying on the new behavior.

In VS Code, use **Extensions: Check for Extension Updates**. Background updates follow the editor's settings, and some external package sources require confirmation. Manage the plugin through the interface where you installed it; the [VS Code guide](https://code.visualstudio.com/docs/agent-customization/agent-plugins) documents the editor-specific lifecycle.

Choose an explicit update policy for custom marketplaces. The [CLI update reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference#copilot-plugin-update-options) documents session-start auto-update through user or managed settings for interactive and `-p` sessions. This mechanism does not apply to SDK or server sessions, and a repository-level marketplace `autoUpdate` entry is currently ignored.

For a broad rollout, I would keep the release process simple:

1. Review changes to instructions, scripts, hooks, dependencies, and external connections.
2. Run the skill evaluations and compare results with the previous release.
3. Publish a versioned release with notes explaining behavior and prerequisite changes.
4. Test installation and upgrade with a pilot group before updating the wider audience.

Version strings help identify a release, but they are not the same as pinning the downloaded code. The CLI supports a marketplace source using `OWNER/REPO#ref`; managed GitHub sources also accept a `ref` field. Where reproducibility matters, use a reviewed full commit SHA and test the resolved plugin source. An external plugin referenced by the catalog needs its own revision control as well. Do not assume that a `version` field alone freezes a Git source.

## Keep a way back

If the plugin causes a problem, users can stop using an unmanaged installation without deleting their engineering project:

```shell
copilot plugin disable git-ape
```

Or remove it:

```shell
copilot plugin uninstall git-ape
```

If repository settings or managed policy control activation, change the controlling configuration instead. The [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference#cli-commands) documents rejection of conflicting activation toggles. Simply uninstalling a required plugin is not a durable opt-out: the requirement still exists. For a release rollback, restore a reviewed source revision and verify the loaded version; disabling a plugin stops its use but does not restore an older release.

Keep a short record of the plugin version, source revision, client version, and observed failure. That gives maintainers something useful to reproduce, and connects the rollout back to the [evaluations in article 2](../2026-11-12-evaluating-engineering-plugin-skills/index.md).

## Now it's your turn

Start by publishing a small marketplace and testing it with one other engineer. Then add repository configuration or managed rollout where that scope makes sense. Keep the installation simple, the update policy explicit, and the evaluation results attached to each release.

In the [final article](../2026-10-24-managing-engineering-plugins-across-the-enterprise/index.md), we will use a governance repository and an enterprise-team pilot to introduce required plugins.

Happy sharing!

Arnaud
