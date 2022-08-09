export const getEnv = (): any => {
  const envs = {};

  for (const envMap of (window as any).envMaps) {
    envs[envMap.name] = localStorage.getItem(`erxes_env_${envMap.name}`);
  }

  return envs;
};
