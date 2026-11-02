const path = require('path');
const esbuild = require('esbuild');

esbuild.buildSync({
  entryPoints: [path.join(__dirname, '../src/backend/main.js')],
  outfile: path.join(__dirname, '../dist/discordwarp-main.js'),
  bundle: true,
  platform: 'node',
  target: 'node16', // packager uses electron 22
  external: ['electron', 'bufferutil', 'utf-8-validate'],
  alias: { '@discordjs/rest': path.join(__dirname, 'rest-stub.js') },
  logLevel: 'warning',
});
