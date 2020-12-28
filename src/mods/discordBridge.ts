/// <reference types="minecraft-scripting-types-server" />

/* -------------------------------------------------------------------------- */
/*                             Discord Chat Bridge                            */
/* -------------------------------------------------------------------------- */
/* A chat bridge bot for discord, using discord.js@11                         */
/* (Note: @12 breaks things, so don't use it)                                 */
/* REQUIRES LOGGER MOD TO BE ENABLED!                                         */
/* -------------------------------------------------------------------------- */

/* --------------------------------- Imports -------------------------------- */

import { netevent, PacketId, createPacket, sendPacket, NetworkIdentifier, chat } from "bdsx";
import * as Discord from 'discord.js';
import { copyFile } from "fs";

import * as C from '../config';

import { logWithDate } from './logger';

/* ---------------------------------- Main ---------------------------------- */

(async () => {

  const system = server.registerSystem(0, 0);

/* ------------------------------ Configuration ----------------------------- */

  const getConfig = C.readConfig();
  const config = getConfig.mods.discordBridge;

/* -------------------------------- Bot setup ------------------------------- */

  // Client
  const client = new Discord.Client();

  // Channel (in which messages are sent)
  var channel: Discord.TextChannel;

  // On bot becoming ready
  client.once('ready', () => {
    logWithDate('Login successful. Bot enabled.', 'discordBridge')
    channel = client.channels.get(config.channel) as Discord.TextChannel;
    channel.send('Server initialised!');
  });

  // Login client
  if (!config.loginToken) {
    logWithDate('Error: loginToken not supplied in custom.yaml', 'discordBridge');
    return;
  }
  client.login(config.loginToken);

/* ----------------------------- connectionList ----------------------------- */

  // List of connections
  const connectionList = new Map<NetworkIdentifier, string>();

/* --------------------- Connections and disconnections --------------------- */

  if (config.connections.enabled === true) {
    // Enabled
    logWithDate('Enabled Connection logs!', 'discordBridge');

    // CONNECT
    netevent.after(PacketId.Login).on((ptr, networkIdentifier, packetId) => {
      // IP, username and XUID
      const ip = networkIdentifier.getAddress();
      const [xuid, username] = netevent.readLoginPacket(ptr);
      // Log and sent to discord
      channel.send(eval('`' + config.connections.format.connect + '`'));
      logWithDate(eval('`' + config.connections.format.connect + '`'), 'discordBridge');
      // Add username to connectionList
      if (username) connectionList.set(networkIdentifier, username);
    });

    // DISCONNECT
    netevent.close.on((networkIdentifier) => {
      // Get username and remove entry
      const username = connectionList.get(networkIdentifier);
      connectionList.delete(networkIdentifier);
      // Log and send to discord
      logWithDate(eval('`' + config.connections.format.disconnect + '`'), 'discordBridge');
      channel.send(eval('`' + config.connections.format.disconnect + '`'));
    });
  }

/* ---------------------------------- Chat ---------------------------------- */

  // FROM GAME
  if (config.chat.fromGame.enabled === true) {
    // Enabled
    logWithDate('Enabled fromGame chat logs!', 'discordBridge');
    // Chat
    chat.on((event) => {
      const username = event.name;
      const message = event.message;
      channel.send(eval('`' + config.chat.fromGame.format + '`'));
      logWithDate(eval('`' + config.chat.fromGame.format + '`'), 'discordBridge')
    });
  }

  // FROM DISCORD
  if (config.chat.fromDiscord.enabled === true) {
    // Enabled
    logWithDate('Enabled fromDiscord chat logs!', 'discordBridge');
    // Discord
    client.on('message', (discordMessage) => {
      // Return if wrong channel
      if (discordMessage.channel !== channel) {return}
      // Return if bot
      if (discordMessage.author.id === client.user.id) {return}

      const username = discordMessage.author.tag;
      const message = discordMessage.content;

      const commandMessage = eval('`' + config.chat.fromDiscord.format + '`');
      system.executeCommand(`tellraw @a {"rawtext":[{"text":"${commandMessage}"}]}`, () => {});
      logWithDate(commandMessage, 'discordBridge');
    });
  }
/* -------------------------------------------------------------------------- */

})()
  .catch((err) => {console.error(err)});
