/// <reference types="minecraft-scripting-types-server" />

/* -------------------------------------------------------------------------- */
/*                             Custom Chat script                             */
/* -------------------------------------------------------------------------- */
/* This script will reformat chat messages. This is an example and it's only  */
/* purpose is to show what bdsx is capable of.                                */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Imports -------------------------------- */

import { chat } from 'bdsx';

/* ---------------------------------- Main ---------------------------------- */

// I suggest using self-executing async function,
// in case you wish to use top level awaits.
(async () => {

/* --------------- Convert message to uppercase and add 'YEY!' -------------- */

  chat.on(ev=>{
    ev.setMessage(ev.message.charAt(0).toUpperCase() + ev.message.slice(1) + '.');
  });

/* -------------------------------------------------------------------------- */

})();
