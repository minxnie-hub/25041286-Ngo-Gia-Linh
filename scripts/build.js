const { spawnSync } = require('child_process');

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

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}
