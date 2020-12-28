/* -------------------------------------------------------------------------- */
/*                               Console Colours                              */
/* -------------------------------------------------------------------------- */
/* Replaces §x codes with nodejs escape codes.                                */
/* Credit to Rjlintkh for having some portion of this code.                   */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Imports -------------------------------- */

import { logWithDate } from './logger';
import * as C from '../config';

/* ---------------------------------- Main ---------------------------------- */

// Config
const getConfig = C.readConfig();
const config = getConfig.mods.consoleColours;

// Matches
const matches: { [index: string]: string} = {
  '§0': '\x1b[38;2;0;0;0m', // black
  '§1': '\x1b[38;2;0;0;170m', // dark_blue
  '§2': '\x1b[38;2;0;170;0m', // dark_green
  '§3': '\x1b[38;2;0;170;170m', // dark_aqua
  '§4': '\x1b[38;2;170;0;0m', // dark_red
  '§5': '\x1b[38;2;170;0;170m', // dark_purple
  '§6': '\x1b[38;2;255;170;0m', // gold
  '§7': '\x1b[38;2;170;170;170m', // gray
  '§8': '\x1b[38;2;85;85;85m', // dark_gray
  '§9': '\x1b[38;2;85;85;255m', // blue
  '§a': '\x1b[38;2;85;255;85m', // green
  '§b': '\x1b[38;2;85;255;255m', // aqua
  '§c': '\x1b[38;2;255;85;85m', // red
  '§d': '\x1b[38;2;255;85;255m', // light_purple
  '§e': '\x1b[38;2;255;255;85m', // yellow
  '§f': '\x1b[38;2;255;255;255m', // white
  '§g': '\x1b[38;2;221;214;5m', // minecoin_gold
  '§k': '\x1b[7m', // obfuscated - Unavailable, so reverse video is used instead.
  '§l': '\x1b[1m', // bold
  '§m': '\x1b[9m', // strikethrough
  '§n': '\x1b[4m', // underline
  '§o': '\x1b[3m', // italic
  '§r': '\x1b[0m' // reset
}

// Original write()
var _write = process.stdout.write;

// New write()
process.stdout.write = (() => {
  return (originalString: string, ...args: any[]) => {
    const newString = originalString.replace(/§./g, (match) => {
      let output: string = matches[match];
      if (config.displayCode) {
        output = '\x1b[38;2;85;85;85m' + match + '\x1b[0m' + output;
      }
      return output;
    }) + '\x1b[0m'
    const newArgs: any = [newString].concat(args);
    return _write.apply(process.stdout, newArgs);
  };
})();

// Tests
logWithDate('§0T§1h§2i§3s §4i§5s §6a§7n §8e§9x§aa§bm§cp§dl§ee §fs§ge§r§kn§r§lt§r§me§r§nn§r§oc§re', 'consoleColours');

/* -------------------------------------------------------------------------- */
