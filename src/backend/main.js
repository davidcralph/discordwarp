const { ipcMain } = require('electron');
const { Client } = require('@xhayper/discord-rpc');

let discordClient;

module.exports.main = () => {
  ipcMain.on('initialize-discord', (event, id) => {
    if (!discordClient) {
      discordClient = new Client({ clientId: id });
      discordClient.login();
    }
  });

  ipcMain.handle('is-discord-available', async () => {
    // todo
  });

  ipcMain.on('set-activity', (event, presence) => {
    if (!discordClient) return;

    discordClient.on('ready', async () => {
      discordClient.user?.setActivity(presence).catch(console.error);
    });
  });
};
