/// <reference types="minecraft-scripting-types-server" />

/* -------------------------------------------------------------------------- */
/*                                Index script                                */
/* -------------------------------------------------------------------------- */
/* This script is the entrypoint for bdsx-zero. It finds which mods to run    */
/* from custom.yaml and actually runs them                                    */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Imports -------------------------------- */

import * as C from './config'

/* ---------------------------------- Main ---------------------------------- */

(async () => {

  // Read config (and error if necessary)
  const config = C.readConfig();

  // If not enabled, disable all mods and return.
  if(config.enabled === false) {
    // Mods disabled
    console.log('[BDSX-ZERO] Mods disabled!');
    return(0);
  } else {
    // Mods enabled
    console.log('[BDSX-ZERO] Mods have been enabled!');

    // Loop through mods and enable / disable
    const keys = Object.keys(config.mods);
    for (const key of keys) {
      let modEnabled = eval(`config.mods.${key}.enabled`);

      // If undefined, select default-enabled setting.
      if (modEnabled === undefined) {
        modEnabled = config.defaultEnabled;
        console.log(`[BDSX-ZERO] Mod ${key} has been auto-${(config.defaultEnabled) ? 'enabled' : 'disabled'}`);
      }

      // Nice formatted console message.
      console.log(`[BDSX-ZERO] Mod ${key} is ${(modEnabled) ? 'ENABLED' : 'DISABLED'}`);

      // Import
      if (modEnabled === true) {
        require(`./mods/${key}.js`);
      }
    }
  }

/* -------------------------------------------------------------------------- */

})()
  .catch((err) => {console.error(err)});
