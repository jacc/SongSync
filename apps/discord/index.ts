import {
  ActivityType,
  Client,
  GatewayIntentBits,
  REST,
  Routes,
} from "discord.js";
import { chatCommandsMap } from "./commands";
import { log } from "./lib/logger/log";
import { handleInteraction } from "./interactions";
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const restClient = new REST({ version: "10" }).setToken(
  process.env.DISCORD_TOKEN as string
);

client.on("ready", async () => {
  await client.user?.setPresence({
    activities: [
      {
        name: "with your mom",
        type: ActivityType.Playing,
      },
    ],
    status: "online",
  });

  try {
    const commandsRegistered = (await restClient.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_APPLICATION_ID as string,
        process.env.DISCORD_GUILD_ID as string
      ),
      { body: [...chatCommandsMap.values()] }
    )) as Array<unknown>;
    log.info(
      `Successfully registered ${commandsRegistered.length} application commands.`
    );
  } catch (error) {
    log.fatal(error);
  }

  log.success(`Logged in as ${client.user!.tag}!`);
});

client.on("interactionCreate", handleInteraction);

void client.login(process.env.DISCORD_TOKEN as string);
