#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const { patch } = require('../src/patch');

const [command, buildDir] = process.argv.slice(2);
const bundlePath = path.join(__dirname, '../dist/discordwarp-main.js');

if (command !== 'patch' || !buildDir) {
  console.error('Usage: discordwarp patch <extracted-electron-build>');
  process.exit(1);
}

if (!fs.existsSync(bundlePath)) {
  console.error('Missing dist/discordwarp-main.js, run "bun run build" first.');
  process.exit(1);
}

try {
  console.log(patch(buildDir, bundlePath) ? 'Patched.' : 'Already patched.');
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
