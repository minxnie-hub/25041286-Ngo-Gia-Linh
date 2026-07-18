const isGitHubPages =
  process.env.GITHUB_ACTIONS === 'true' || process.env.GITHUB_PAGES === 'true';
const repositoryName = (process.env.GITHUB_REPOSITORY || '/25041286-Ngo-Gia-Linh')
  .split('/')
  .pop();
const basePath = isGitHubPages ? `/${repositoryName}` : '';

module.exports = {
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};
