/* -------------------------------------------------------------------------- */
/*                           Extended tools for BDSX                          */
/* -------------------------------------------------------------------------- */
/* Adds functions for easy logging, and more.                                 */
/* Does not need to be enabled in custom.yaml                                 */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Imports -------------------------------- */

import * as bdsx from 'bdsx';
import * as C from '../config';

/* --------------------------------- Config --------------------------------- */

const getConfig = C.readConfig();
const config = getConfig.mods.logger;

/* --------------------------------- Logging -------------------------------- */

export const logWithDate = (msg: string, origin: string) => {
  // Current date
  const now = new Date(Date.now());
  // Formatting
  let date;
  if (config.logWithDateFormat === undefined) {
    date = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  } else {
    date = eval('`' + config.logWithDateFormat + '`');
  }
  // Print to console
  console.log(`[${date}] [${origin}] ${msg}`);
}

/* -------------------------------------------------------------------------- */
