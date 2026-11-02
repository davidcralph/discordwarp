// Name: Discord RPC
// ID: discordrpc
// Description: Discord RPC extension for TurboWarp projects
// License: MIT

(function (Scratch) {
  'use strict';

  const MAX_TEXT_LENGTH = 128;
  const hasDiscord = typeof discord !== 'undefined';

  const toText = (value) => Scratch.Cast.toString(value).slice(0, MAX_TEXT_LENGTH);

  const createPresence = () => ({
    state: '',
    details: '',
    largeImageKey: '',
    largeImageText: '',
    smallImageKey: '',
    smallImageText: '',
    startTimestamp: null,
    endTimestamp: null,
    type: 0,
    statusDisplayType: 0,
    partyId: '',
    partySize: undefined,
    partyMax: undefined,
    joinSecret: '',
    spectateSecret: '',
    matchSecret: '',
    buttons: [],
  });

  class DiscordRPC {
    constructor() {
      this.presence = createPresence();
      this.secrets = { join: '', spectate: '' };

      if (hasDiscord) {
        discord.onEvent((type, secret) => {
          this.secrets[type] = secret;
          Scratch.vm.runtime.startHats(
            type === 'join' ? 'discordrpc_whenJoin' : 'discordrpc_whenSpectate',
          );
        });
      }
    }

    getInfo() {
      return {
        id: 'discordrpc',
        name: 'Discord RPC',
        color1: '#5865F2',
        color2: '#000000',
        color3: '#E0E3FF',
        menuIconURI:
          'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20shape-rendering%3D%22geometricPrecision%22%20text-rendering%3D%22geometricPrecision%22%20image-rendering%3D%22optimizeQuality%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20fill%3D%22%235865F2%22%20d%3D%22M256%200c141.385%200%20256%20114.615%20256%20256S397.385%20512%20256%20512%200%20397.385%200%20256%20114.615%200%20256%200z%22%2F%3E%3Cg%20data-name%3D%22%C3%A5%C2%9B%C2%BE%C3%A5%C2%B1%C2%82%202%22%3E%3Cg%20data-name%3D%22Discord%20Logos%22%3E%3Cpath%20fill%3D%22%23fff%22%20fill-rule%3D%22nonzero%22%20d%3D%22M360.932%20160.621a250.49%20250.49%200%2000-62.384-19.182%20174.005%20174.005%200%2000-7.966%2016.243%20232.677%20232.677%200%2000-34.618-2.602c-11.569%200-23.196.879-34.623%202.58-2.334-5.509-5.044-10.972-7.986-16.223a252.55%20252.55%200%2000-62.397%2019.222c-39.483%2058.408-50.183%20115.357-44.833%20171.497a251.546%20251.546%200%200076.502%2038.398c6.169-8.328%2011.695-17.193%2016.386-26.418a161.718%20161.718%200%2001-25.813-12.318c2.165-1.569%204.281-3.186%206.325-4.756%2023.912%2011.23%2050.039%2017.088%2076.473%2017.088%2026.436%200%2052.563-5.858%2076.475-17.09%202.069%201.689%204.186%203.306%206.325%204.756a162.642%20162.642%200%2001-25.859%2012.352%20183.919%20183.919%200%200016.386%2026.396%20250.495%20250.495%200%200076.553-38.391l-.006.006c6.278-65.103-10.724-121.529-44.94-171.558zM205.779%20297.63c-14.908%200-27.226-13.53-27.226-30.174%200-16.645%2011.889-30.294%2027.179-30.294%2015.289%200%2027.511%2013.649%2027.249%2030.294-.261%2016.644-12.007%2030.174-27.202%2030.174zm100.439%200c-14.933%200-27.202-13.53-27.202-30.174%200-16.645%2011.889-30.294%2027.202-30.294%2015.313%200%2027.44%2013.649%2027.178%2030.294-.261%2016.644-11.984%2030.174-27.178%2030.174z%22%20data-name%3D%22Discord%20Logo%20-%20Large%20-%20White%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        blockIconURI:
          'data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20id%3D%22Discord-Logo%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20126.644%2096%22%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill%3A%23fff%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cpath%20id%3D%22Discord-Symbol-White%22%20class%3D%22cls-1%22%20d%3D%22M81.15%2C0c-1.2376%2C2.1973-2.3489%2C4.4704-3.3591%2C6.794-9.5975-1.4396-19.3718-1.4396-28.9945%2C0-.985-2.3236-2.1216-4.5967-3.3591-6.794-9.0166%2C1.5407-17.8059%2C4.2431-26.1405%2C8.0568C2.779%2C32.5304-1.6914%2C56.3725.5312%2C79.8863c9.6732%2C7.1476%2C20.5083%2C12.603%2C32.0505%2C16.0884%2C2.6014-3.4854%2C4.8998-7.1981%2C6.8698-11.0623-3.738-1.3891-7.3497-3.1318-10.8098-5.1523.9092-.6567%2C1.7932-1.3386%2C2.6519-1.9953%2C20.281%2C9.547%2C43.7696%2C9.547%2C64.0758%2C0%2C.8587.7072%2C1.7427%2C1.3891%2C2.6519%2C1.9953-3.4601%2C2.0457-7.0718%2C3.7632-10.835%2C5.1776%2C1.97%2C3.8642%2C4.2683%2C7.5769%2C6.8698%2C11.0623%2C11.5419-3.4854%2C22.3769-8.9156%2C32.0509-16.0631%2C2.626-27.2771-4.496-50.9172-18.817-71.8548C98.9811%2C4.2684%2C90.1918%2C1.5659%2C81.1752.0505l-.0252-.0505ZM42.2802%2C65.4144c-6.2383%2C0-11.4159-5.6575-11.4159-12.6535s4.9755-12.6788%2C11.3907-12.6788%2C11.5169%2C5.708%2C11.4159%2C12.6788c-.101%2C6.9708-5.026%2C12.6535-11.3907%2C12.6535ZM84.3576%2C65.4144c-6.2637%2C0-11.3907-5.6575-11.3907-12.6535s4.9755-12.6788%2C11.3907-12.6788%2C11.4917%2C5.708%2C11.3906%2C12.6788c-.101%2C6.9708-5.026%2C12.6535-11.3906%2C12.6535Z%22%2F%3E%3C%2Fsvg%3E',
        blocks: [
          {
            opcode: 'initialize',
            blockType: Scratch.BlockType.COMMAND,
            text: 'initialize rpc with id [ID]',
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              },
            },
          },

          {
            opcode: 'isAvailable',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'discord rpc available?',
          },

          {
            opcode: 'setText',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set rpc state to [STATE] with details [ACTIVITY]',
            arguments: {
              STATE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello!',
              },
              ACTIVITY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hmm...',
              },
            },
          },

          {
            opcode: 'setLargeImage',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set rpc large image to [IMAGE_KEY] with text [IMAGE_TEXT]',
            arguments: {
              IMAGE_KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              },
              IMAGE_TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "What's your name?",
              },
            },
          },

          {
            opcode: 'setSmallImage',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set rpc small image to [IMAGE_KEY] with text [IMAGE_TEXT]',
            arguments: {
              IMAGE_KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              },
              IMAGE_TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "What's your name?",
              },
            },
          },

          {
            opcode: 'startTimestamp',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set rpc start timestamp to [TIMESTAMP]',
            arguments: {
              TIMESTAMP: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },

          {
            opcode: 'endTimestamp',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set rpc end timestamp to [TIMESTAMP]',
            arguments: {
              TIMESTAMP: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },

          {
            opcode: 'clearTimestamps',
            blockType: Scratch.BlockType.COMMAND,
            text: 'clear rpc timestamps',
          },

          {
            opcode: 'currentTime',
            blockType: Scratch.BlockType.REPORTER,
            text: 'current time (ms)',
            disableMonitor: true,
          },

          {
            opcode: 'setType',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set rpc activity type to [TYPE]',
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'activityType',
              },
            },
          },

          {
            opcode: 'setStatusDisplay',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show rpc [DISPLAY] in member list',
            arguments: {
              DISPLAY: {
                type: Scratch.ArgumentType.STRING,
                menu: 'statusDisplay',
              },
            },
          },

          {
            opcode: 'setButton',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set rpc button [SLOT] to [LABEL] with url [URL]',
            arguments: {
              SLOT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'buttonSlot',
              },
              LABEL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Play',
              },
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://turbowarp.org',
              },
            },
          },

          {
            opcode: 'clearActivity',
            blockType: Scratch.BlockType.COMMAND,
            text: 'clear rpc',
          },

          '---',

          {
            opcode: 'setParty',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set rpc party [ID] size [SIZE] of [MAX]',
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'party',
              },
              SIZE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              MAX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 4,
              },
            },
          },

          {
            opcode: 'setSecrets',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set rpc secrets join [JOIN] spectate [SPECTATE] match [MATCH]',
            arguments: {
              JOIN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              },
              SPECTATE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              },
              MATCH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              },
            },
          },

          {
            opcode: 'whenJoin',
            blockType: Scratch.BlockType.EVENT,
            text: 'when player joins through discord',
            isEdgeActivated: false,
          },

          {
            opcode: 'whenSpectate',
            blockType: Scratch.BlockType.EVENT,
            text: 'when player spectates through discord',
            isEdgeActivated: false,
          },

          {
            opcode: 'joinSecret',
            blockType: Scratch.BlockType.REPORTER,
            text: 'last join secret',
          },

          {
            opcode: 'spectateSecret',
            blockType: Scratch.BlockType.REPORTER,
            text: 'last spectate secret',
          },

          '---',

          {
            opcode: 'getUser',
            blockType: Scratch.BlockType.REPORTER,
            text: 'discord user [THING]',
            arguments: {
              THING: {
                type: Scratch.ArgumentType.STRING,
                menu: 'userInfo',
              },
            },
          },

          {
            opcode: 'lastError',
            blockType: Scratch.BlockType.REPORTER,
            text: 'last rpc error',
          },
        ],
        menus: {
          activityType: {
            acceptReporters: false,
            items: [
              { text: 'playing', value: '0' },
              { text: 'listening', value: '2' },
              { text: 'watching', value: '3' },
              { text: 'competing', value: '5' },
            ],
          },
          statusDisplay: {
            acceptReporters: false,
            items: [
              { text: 'name', value: '0' },
              { text: 'state', value: '1' },
              { text: 'details', value: '2' },
            ],
          },
          buttonSlot: {
            acceptReporters: false,
            items: ['1', '2'],
          },
          userInfo: {
            acceptReporters: false,
            items: [
              { text: 'username', value: 'username' },
              { text: 'id', value: 'userId' },
            ],
          },
        },
      };
    }

    initialize(args) {
      if (hasDiscord) {
        discord.initialize(Scratch.Cast.toString(args.ID));
      }
    }

    isAvailable() {
      return hasDiscord && discord.getStatus().connected;
    }

    setText(args) {
      this.presence.state = toText(args.STATE);
      this.presence.details = toText(args.ACTIVITY);
      this._updatePresence();
    }

    setLargeImage(args) {
      this.presence.largeImageKey = Scratch.Cast.toString(args.IMAGE_KEY);
      this.presence.largeImageText = toText(args.IMAGE_TEXT);
      this._updatePresence();
    }

    setSmallImage(args) {
      this.presence.smallImageKey = Scratch.Cast.toString(args.IMAGE_KEY);
      this.presence.smallImageText = toText(args.IMAGE_TEXT);
      this._updatePresence();
    }

    startTimestamp(args) {
      this.presence.startTimestamp = Scratch.Cast.toNumber(args.TIMESTAMP);
      this._updatePresence();
    }

    endTimestamp(args) {
      this.presence.endTimestamp = Scratch.Cast.toNumber(args.TIMESTAMP);
      this._updatePresence();
    }

    clearTimestamps() {
      this.presence.startTimestamp = null;
      this.presence.endTimestamp = null;
      this._updatePresence();
    }

    currentTime() {
      return Date.now();
    }

    setType(args) {
      this.presence.type = Scratch.Cast.toNumber(args.TYPE);
      this._updatePresence();
    }

    setStatusDisplay(args) {
      this.presence.statusDisplayType = Scratch.Cast.toNumber(args.DISPLAY);
      this._updatePresence();
    }

    setButton(args) {
      const label = Scratch.Cast.toString(args.LABEL);
      const url = Scratch.Cast.toString(args.URL);
      this.presence.buttons[Scratch.Cast.toNumber(args.SLOT) - 1] =
        label && url ? { label, url } : null;
      this._updatePresence();
    }

    clearActivity() {
      this.presence = createPresence();

      if (hasDiscord) {
        discord.clearActivity();
      }
    }

    setParty(args) {
      const max = Scratch.Cast.toNumber(args.MAX);
      this.presence.partyId = Scratch.Cast.toString(args.ID);
      this.presence.partySize = max > 0 ? Scratch.Cast.toNumber(args.SIZE) : undefined;
      this.presence.partyMax = max > 0 ? max : undefined;
      this._updatePresence();
    }

    setSecrets(args) {
      this.presence.joinSecret = Scratch.Cast.toString(args.JOIN);
      this.presence.spectateSecret = Scratch.Cast.toString(args.SPECTATE);
      this.presence.matchSecret = Scratch.Cast.toString(args.MATCH);
      this._updatePresence();
    }

    joinSecret() {
      return this.secrets.join;
    }

    spectateSecret() {
      return this.secrets.spectate;
    }

    getUser(args) {
      return hasDiscord ? discord.getStatus()[args.THING] ?? '' : '';
    }

    lastError() {
      return hasDiscord ? discord.getStatus().lastError : '';
    }

    _updatePresence() {
      if (!hasDiscord) {
        return;
      }

      discord.setActivity({
        ...this.presence,
        buttons: this.presence.buttons.filter(Boolean),
      });
    }
  }

  Scratch.extensions.register(new DiscordRPC());
})(Scratch);
