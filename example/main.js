const { app, BrowserWindow } = require('electron');
const rpc = require('../src');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 960,
    height: 720,
    webPreferences: {
      preload: rpc.preloadPath,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

rpc.main();
