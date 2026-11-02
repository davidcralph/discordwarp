const { contextBridge, ipcRenderer } = require('electron');

let status = { connected: false, username: '', userId: '', lastError: '' };

ipcRenderer.on('discord-status', (event, next) => {
  status = next;
});

contextBridge.exposeInMainWorld('discord', {
  initialize: (id) => {
    ipcRenderer.send('initialize-discord', id);
  },

  getStatus: () => status,

  setActivity: (presence) => {
    ipcRenderer.send('set-activity', presence);
  },

  clearActivity: () => {
    ipcRenderer.send('clear-activity');
  },

  onEvent: (callback) => {
    ipcRenderer.on('discord-event', (event, type, secret) => callback(type, secret));
  },
});
