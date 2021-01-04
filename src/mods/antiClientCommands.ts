/// <reference types="minecraft-scripting-types-server" />

/* -------------------------------------------------------------------------- */
/*                              Anti Client .give                             */
/* -------------------------------------------------------------------------- */
/* Log to console when detects .give                                          */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Imports -------------------------------- */

import {logWithDate} from './logger';
import * as C from '../config';

import { CANCEL, netevent, PacketId } from 'bdsx';

/* ---------------------------------- Main ---------------------------------- */

netevent.raw(PacketId.InventoryTransaction).on((ptr) => {
  ptr.move(3);
  var type2 = ptr.readVarUint();
  ptr.move(1);

  const actionType = ptr.readVarUint();

  if (actionType == 99999) {
    logWithDate('NBT DETECTED', 'antiClientCommands');
    return CANCEL;
  }
})

/* -------------------------------------------------------------------------- */
