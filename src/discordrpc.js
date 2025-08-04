// Name: Discord RPC
// ID: discordrpc
// Description: Discord RPC extension for TurboWarp projects
// License: MIT

(function (Scratch) {
  'use strict';

  class DiscordRPC {
    constructor() {
      this.presence = {
        state: '',
        details: '',
        largeImageKey: '',
        largeImageText: '',
        smallImageKey: '',
        smallImageText: '',
        startTimestamp: null,
        endTimestamp: null,
      };
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
            opcode: 'setsmallImage',
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
                defaultValue: Date.now(),
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
                defaultValue: Date.now() + 3600000,
              },
            },
          },
        ],
        menus: {},
      };
    }

    initialize(args) {
      discord.initialize(args.ID);
      console.log(`Discord RPC initialized with client ID: ${args.ID}`);
    }

    isAvailable() {
      return discord.isAvailable();
    }

    setText(args) {
      this.presence.state = args.STATE;
      this.presence.details = args.ACTIVITY;
      this._updatePresence();
    }

    setLargeImage(args) {
      this.presence.largeImageKey = args.IMAGE_KEY;
      this.presence.largeImageText = args.IMAGE_TEXT;
      this._updatePresence();
    }

    setsmallImage(args) {
      this.presence.smallImageKey = args.IMAGE_KEY;
      this.presence.smallImageText = args.IMAGE_TEXT;
      this._updatePresence();
    }

    startTimestamp(args) {
      this.presence.startTimestamp = args.TIMESTAMP;
      this._updatePresence();
    }

    endTimestamp(args) {
      this.presence.endTimestamp = args.TIMESTAMP;
      this._updatePresence();
    }

    _updatePresence() {
      const presence = {
        state: this.presence.state,
        details: this.presence.details,
        largeImageKey: this.presence.largeImageKey,
        largeImageText: this.presence.largeImageText,
        smallImageKey: this.presence.smallImageKey,
        smallImageText: this.presence.smallImageText,
        startTimestamp: this.presence.startTimestamp,
        endTimestamp: this.presence.endTimestamp,
      };

      discord.setActivity(presence);
    }
  }

  Scratch.extensions.register(new DiscordRPC());
})(Scratch);
