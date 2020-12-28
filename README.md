# BDSX-ZERO

A script-loader for BDSX, inspired by ElementZero.

## Features

- Easy enable / disable scripts using [custom.yaml](custom.yaml) file.
- Any script can have their own config in this file.
- Works with (almost) any bdsx script, or minecraft script (which you would normally find in an addon pack).

## Getting started

Clone this repo, then run `npm i`. This will make sure you have all the necessary packages installed.

Now you can start editing scripts, edit `custom.yaml`, or add your own scripts.

### How to add your own scripts?

Note: supported formats are `.js` and `.ts`.

Add your files to `src/mods/` dir, then build.

#### JSON and YAML files

If your script requires a `.json` file too (eg. for it's own configuration) then you can add this too in `src/mods/`. It will get copied when you `npm run build`. Please note, any edits to these files will not get copied by `build:watch`. You *must* run `build`.

### Build

Run `npm run build` to build typescript project into `dist/`.

While testing, you can also run `npm run build:watch`. This will watch for changes, and rebuild as you edit.

### Start

To start server run `npx bdsx .` in the same directory as this README file. (If this fails with a cryptic error, you may have to run `./node_modules/.bin/bdsx .`)

If you have installed bdsx **globally**, then you can run also run `bdsx .`

Note: this is not recommended as you can only install one version of bdsx globally, and you may experience issues with permissions.

## Planned features / current limitations

- `custom.yaml` should auto fill with any scripts found in the `src/mods/` dir.
- The `defaultEnabled` feature doesn't currently work as expected.
