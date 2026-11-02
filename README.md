# discordwarp

Discord RPC extension for TurboWarp projects

## Installation

Load `src/discordrpc.js` as an unsandboxed custom extension, then set up the backend. This only works in Electron builds.

### TurboWarp Packager

Package your project for Electron, extract the zip and run:

```sh
bun install
bun run build
node bin/discordwarp.js patch path/to/build
```

### Electron

See the example project for a basic setup.

## Notes

- Timestamps are in milliseconds, 0 removes them
- Updates are sent at most once every 4 seconds
- Check `last rpc error` if something isn't working

## License

[MIT](LICENSE)

I'd be interested in hearing about your game if you use this extension, so feel free to get in touch!
