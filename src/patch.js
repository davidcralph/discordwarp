const fs = require('fs');
const path = require('path');

const MARKER = '// discordwarp';
const BUNDLE_NAME = 'discordwarp-main.js';

function findFile(dir, name) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isFile() && entry.name === name) {
      return entryPath;
    }

    if (entry.isDirectory()) {
      const found = findFile(entryPath, name);

      if (found) {
        return found;
      }
    }
  }

  return null;
}

module.exports.patch = (buildDir, bundlePath) => {
  const mainPath = findFile(buildDir, 'electron-main.js');

  if (!mainPath) {
    throw new Error(`No electron-main.js in ${buildDir}, is it an Electron build?`);
  }

  if (fs.readFileSync(mainPath, 'utf8').includes(MARKER)) {
    return false;
  }

  const resourcesDir = path.dirname(mainPath);
  const preload = fs.readFileSync(path.join(__dirname, 'backend', 'preload.js'), 'utf8');

  fs.copyFileSync(bundlePath, path.join(resourcesDir, BUNDLE_NAME));

  fs.appendFileSync(
    mainPath,
    `\n${MARKER}\ntry {\n  require('./${BUNDLE_NAME}').main();\n} catch (error) {\n  console.error(error);\n}\n`,
  );

  fs.appendFileSync(
    path.join(resourcesDir, 'electron-preload.js'),
    `\n${MARKER}\n{\n${preload}}\n`,
  );

  return true;
};
