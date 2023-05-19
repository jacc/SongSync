import {
  ActivityType,
  Client,
  GatewayIntentBits,
  REST,
  Routes,
} from "discord.js";
import { chatCommandsMap } from "./commands";
import { log } from "./lib/logger/log";
import { handleInteraction, handleMessageInteraction } from "./interactions";
import { handleChatMessage } from "./interactions/message";
import { env } from "./env";
import { countSongs } from "./lib/redis/redis";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const restClient = new REST({ version: "10" }).setToken(
  env.DISCORD_TOKEN as string
);

client.on("ready", async () => {
  const songs = await countSongs();

  await client.user?.setPresence({
    activities: [
      {
        name: `with ${songs} songs`,
        type: ActivityType.Playing,
      },
    ],
    status: "online",
  });

  log.success(`Logged in as ${client.user!.tag}!`);
});

client.on("interactionCreate", handleInteraction);
client.on("messageCreate", handleChatMessage);

void client.login(env.DISCORD_TOKEN as string).then(async () => {
  try {
    const commandsRegistered = (await restClient.put(
      Routes.applicationGuildCommands(
        env.DISCORD_APPLICATION_ID as string,
        env.DISCORD_GUILD_ID as string
      ),
      { body: [...chatCommandsMap.values()] }
    )) as Array<unknown>;
    log.info(
      `Successfully registered ${commandsRegistered.length} application commands.`
    );
  } catch (error) {
    log.fatal(error);
  }
});
