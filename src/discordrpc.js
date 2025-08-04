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
        blocks: [
          {
            opcode: 'initialize',
            blockType: Scratch.BlockType.COMMAND,
            text: 'initialize discord rpc with id [ID]',
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
            text: 'set discord state to [STATE] with details [ACTIVITY]',
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
            text: 'set discord rpc large image to [IMAGE_KEY] with text [IMAGE_TEXT]',
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
            text: 'set discord rpc small image to [IMAGE_KEY] with text [IMAGE_TEXT]',
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
            text: 'set discord rpc start timestamp to [TIMESTAMP]',
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
            text: 'set discord rpc end timestamp to [TIMESTAMP]',
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
