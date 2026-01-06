export function getRoutes(mod) {
  // modul bisa mengekspor default, named (AuthRoutes / routes), atau langsung object/array
  const exported = mod?.default ?? mod?.AuthRoutes ?? mod?.routes ?? mod;
  if (!exported) return [];
  return Array.isArray(exported) ? exported : [exported];
}
