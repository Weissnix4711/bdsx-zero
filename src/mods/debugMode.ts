/* -------------------------------------------------------------------------- */
/*                                 Debug Mode                                 */
/* -------------------------------------------------------------------------- */
/* From BDSX example scripts.                                                 */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Imports -------------------------------- */

import { PacketId, netevent } from 'bdsx';

/* ---------------------------------- Main ---------------------------------- */

// Filter
const tooLoudFilter = new Set([
  PacketId.UpdateBlock,
  PacketId.ClientCacheBlobStatus, 
  PacketId.NetworkStackLatencyPacket, 
  PacketId.LevelChunk,
  PacketId.ClientCacheMissResponse,
  PacketId.MoveEntityDelta,
  PacketId.SetEntityMotion,
  PacketId.SetEntityData,
  PacketId.NetworkChunkPublisherUpdate,
]);

// Network Hooking: Print all packets
for (let i = 2; i <= 136; i++) {
  if (tooLoudFilter.has(i)) continue;
  netevent.raw(i).on((ptr, size, networkIdentifier, packetId) => {
      console.assert(size !== 0, 'invalid packet size');
      console.log('RECV ' + PacketId[packetId] + ': ' + ptr.readHex(Math.min(16, size)));
  });
  netevent.send(i).on((ptr, networkIdentifier, packetId) => {
      console.log('SEND ' + PacketId[packetId] + ': ' + ptr.readHex(16));
  });
}

/* -------------------------------------------------------------------------- */
