import { getRoutes } from "./helper";

/**
 * modules: Array<{ mod: any, name?: string }>
 * Returns flattened children routes and logs warnings in dev for empty modules.
 */
export function buildChildrenRoutes(modules = []) {
  const result = [];
  for (const item of modules) {
    const mod = item?.mod;
    const name = item?.name || "UnknownRouteModule";
    const routes = getRoutes(mod);
    if (import.meta.env.DEV && routes.length === 0) {
      console.warn(`${name} kosong atau tidak ditemukan`);
    }
    result.push(...routes);
  }
  return result;
}
