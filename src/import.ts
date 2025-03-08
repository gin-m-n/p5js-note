export const importModulesMyProject = () => {
  const modules = import.meta.glob('./sketch/my-project/*.ts', { eager: true });

  const defaultExports: Record<string, any> = {};
  for (const path in modules) {
    const module = modules[path] as any;
    const fileName = path.split('/').pop()?.replace(/\.(ts|tsx)$/, '') || '';
    if (module.default) {
      defaultExports[fileName] = module.default;
    }
  }

  return defaultExports;
}

