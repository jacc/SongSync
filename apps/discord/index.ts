import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import { chatCommandsMap } from "./commands";

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

client.once("ready", async () => {
  try {
    await restClient.put(
      Routes.applicationGuildCommands(
        process.env.APPLICATION_ID as string,
        process.env.GUILD_ID as string
      ),
      { body: chatCommandsMap }
    );
    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error(error);
  }

  console.log(`Logged in as ${client.user!.tag}!`);
});

void client.login(process.env.DISCORD_TOKEN as string);
