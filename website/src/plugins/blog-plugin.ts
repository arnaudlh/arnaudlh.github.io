import type {LoadContext, Plugin, RouteConfig} from '@docusaurus/types';
import type {BlogContent, PluginOptions} from '@docusaurus/plugin-content-blog';
import blogPlugin from '@docusaurus/plugin-content-blog';

export {validateOptions} from '@docusaurus/plugin-content-blog';

type ItemModule = {content: {__import: true; path: string; query?: Record<string, string | boolean>}};

// Wraps the official blog plugin so that, like WordPress, the most recent post is
// rendered in full on the first page of the blog instead of being truncated.
export default async function expandedLatestBlogPlugin(
  context: LoadContext,
  options: PluginOptions,
): Promise<Plugin<BlogContent>> {
  const plugin = await blogPlugin(context, options);
  const firstPagePath = context.baseUrl + options.routeBasePath.replace(/^\/+/, '');
  const normalize = (p: string) => p.replace(/\/+$/, '') || '/';

  return {
    ...plugin,
    async contentLoaded(args) {
      const addRoute = (route: RouteConfig) => {
        const items = (route.modules as unknown as {items?: ItemModule[]} | undefined)?.items;
        if (normalize(route.path) === normalize(firstPagePath) && items?.length) {
          const [first, ...rest] = items;
          const {truncated: _ignored, ...query} = first.content.query ?? {};
          route = {
            ...route,
            modules: {
              ...route.modules,
              items: [{content: {...first.content, query}}, ...rest],
            } as unknown as RouteConfig['modules'],
          };
        }
        args.actions.addRoute(route);
      };
      return plugin.contentLoaded?.({...args, actions: {...args.actions, addRoute}});
    },
  };
}
