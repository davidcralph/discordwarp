const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('discord', {
  initialize: (id) => {
    ipcRenderer.send('initialize-discord', id);
  },

  isAvailable: () => {
    return ipcRenderer.invoke('is-discord-available');
  },

  setActivity: (presence) => {
    ipcRenderer.send('set-activity', presence);
  },
});
