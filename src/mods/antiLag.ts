/// <reference types="minecraft-scripting-types-server" />

/* -------------------------------------------------------------------------- */
/*                               ANTI-LAG Script                              */
/* -------------------------------------------------------------------------- */
/* Prevents lag                                                               */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Imports -------------------------------- */

import * as C from '../config';

import { logWithDate } from './logger';

/* --------------------------------- system --------------------------------- */

const system = server.registerSystem(0, 0);

/* --------------------------------- Config --------------------------------- */

const config = C.readConfig().mods.antiLag

/* -------------------------------- Functions ------------------------------- */

export const clearGroundItemsNow = async () => {
  logWithDate('Clearing ground items..', 'antiLag');
  system.executeCommand('tellraw @a {"rawtext":[{"text":"[antiLag] Clearing ground items now.."}]}', () => {});
  system.executeCommand('kill @e[type=item]', () => {});
  logWithDate('Cleared ground items', 'antiLag');
}

export const clearGroundItems = async () => {
  system.executeCommand(`tellraw @a {"rawtext":[{"text":"[antiLag] Clearing ground items in ${config.clearGroundItems.warning} seconds.."}]}`, () => {});
  setTimeout(clearGroundItemsNow, (config.clearGroundItems.warning * 1000));
}

/* ---------------------------------- Main ---------------------------------- */

(async () => {

  if (config.clearGroundItems.enabled === true) {
    setInterval(clearGroundItems, (config.clearGroundItems.interval * 1000));
  }

/* -------------------------------------------------------------------------- */

})()
  .catch((err) => {throw err})
