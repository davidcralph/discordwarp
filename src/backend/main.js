const { ipcMain } = require('electron');
const { Client } = require('@xhayper/discord-rpc');

const RECONNECT_DELAY = 15000;
const SEND_DELAY = 200;
const SEND_INTERVAL = 4000;
const INVALID_CLIENT_ID = 4000;

const senders = new Set();

let discordClient = null;
let clientId = null;
let connected = false;
let lastError = '';
let activity = null;
let activityChanged = false;
let subscribed = new Set();
let lastSentAt = 0;
let sendTimer = null;
let reconnectTimer = null;

const broadcast = (channel, ...args) => {
  for (const sender of senders) {
    if (sender.isDestroyed()) {
      senders.delete(sender);
    } else {
      sender.send(channel, ...args);
    }
  }
};

const pushStatus = () => {
  broadcast('discord-status', {
    connected,
    username: discordClient?.user?.username ?? '',
    userId: discordClient?.user?.id ?? '',
    lastError,
  });
};

const fail = (error) => {
  lastError = error?.message || String(error);
  console.error(`Discord RPC: ${lastError}`);
  pushStatus();
};

const subscribe = (key, event) => {
  if (activity?.[key] && !subscribed.has(event)) {
    subscribed.add(event);
    discordClient.subscribe(event).catch(fail);
  }
};

const sendActivity = () => {
  sendTimer = null;

  if (!connected || !activityChanged) {
    return;
  }

  activityChanged = false;
  lastSentAt = Date.now();

  subscribe('joinSecret', 'ACTIVITY_JOIN');
  subscribe('spectateSecret', 'ACTIVITY_SPECTATE');

  const request = activity
    ? discordClient.user.setActivity(activity)
    : discordClient.user.clearActivity();

  request.then(() => {
    if (lastError) {
      lastError = '';
      pushStatus();
    }
  }, fail);
};

const queueActivity = () => {
  if (connected && activityChanged && !sendTimer) {
    const wait = Math.max(SEND_DELAY, lastSentAt + SEND_INTERVAL - Date.now());
    sendTimer = setTimeout(sendActivity, wait);
  }
};

const setActivity = (presence) => {
  activity = presence;
  activityChanged = true;
  queueActivity();
};

const disconnect = () => {
  clearTimeout(sendTimer);
  clearTimeout(reconnectTimer);

  sendTimer = null;
  connected = false;

  discordClient?.destroy().catch(() => {});
  discordClient = null;
};

const connect = () => {
  const client = new Client({ clientId });

  discordClient = client;
  subscribed = new Set();

  const onLost = (error, retry = true) => {
    if (client !== discordClient) {
      return;
    }

    disconnect();
    activityChanged = activity !== null;

    if (error) {
      fail(error);
    } else {
      pushStatus();
    }

    if (retry) {
      reconnectTimer = setTimeout(connect, RECONNECT_DELAY);
    } else {
      clientId = null;
    }
  };

  client.on('ACTIVITY_JOIN', (data) => broadcast('discord-event', 'join', data?.secret ?? ''));
  client.on('ACTIVITY_SPECTATE', (data) => {
    broadcast('discord-event', 'spectate', data?.secret ?? '');
  });
  client.on('disconnected', () => onLost());

  client.transport.on('close', (reason) => {
    if (!connected) {
      onLost(new Error(reason?.message ?? reason), reason?.code !== INVALID_CLIENT_ID);
    }
  });

  client.login().then(
    () => {
      if (client !== discordClient) {
        return;
      }

      connected = true;
      lastError = '';
      pushStatus();
      queueActivity();
    },
    (error) => onLost(error),
  );
};

module.exports.main = () => {
  ipcMain.on('initialize-discord', (event, id) => {
    senders.add(event.sender);

    if (!id) {
      fail(new Error('Client ID is required'));
    } else if (id === clientId) {
      pushStatus();
    } else {
      disconnect();
      clientId = id;
      connect();
    }
  });

  ipcMain.on('set-activity', (event, presence) => {
    setActivity(presence);
  });

  ipcMain.on('clear-activity', () => {
    setActivity(null);
  });
};
