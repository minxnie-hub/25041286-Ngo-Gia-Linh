const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// The repository previously contained pages from the old template.
// They are not part of this portfolio and break static export on GitHub Pages.
const legacyRoutes = [
  path.join(process.cwd(), 'pages', 'api'),
  path.join(process.cwd(), 'pages', 'projects'),
  path.join(process.cwd(), 'pages', '404.js'),
];

for (const target of legacyRoutes) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
    console.log(`[build] Removed legacy route: ${path.relative(process.cwd(), target)}`);
  }
}

const nextBin = require.resolve('next/dist/bin/next');
const env = {
  ...process.env,
  NODE_OPTIONS: [process.env.NODE_OPTIONS, '--openssl-legacy-provider']
    .filter(Boolean)
    .join(' '),
};

for (const command of ['build', 'export']) {
  const result = spawnSync(process.execPath, [nextBin, command], {
    stdio: 'inherit',
    env,
  });

  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}
