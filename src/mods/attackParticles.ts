/// <reference types="minecraft-scripting-types-server" />

/* -------------------------------------------------------------------------- */
/*                              Attack Particles                              */
/* -------------------------------------------------------------------------- */
/* Adds blood particles on entity hit                                         */
/* -------------------------------------------------------------------------- */

const system = server.registerSystem(0, 0);

import { logWithDate } from "./logger";

/* -------------------------------------------------------------------------- */

system.listenForEvent(ReceiveFromMinecraftServer.PlayerAttackedEntity, ({data: eventData}) => {
  const {
    player: player,
    attacked_entity: attacked
  } = eventData;

  let particleEventData = system.createEventData("minecraft:spawn_particle_attached_entity");

  if (particleEventData == null) {
    return;
  }

  particleEventData.data.effect = "minecraft:redstone_ore_dust_particle";
  particleEventData.data.offset = [ 0, 1, 0 ];
  particleEventData.data.entity = attacked;

  system.broadcastEvent(SendToMinecraftServer.SpawnParticleAttachedEntity, particleEventData);
});

/* -------------------------------------------------------------------------- */
