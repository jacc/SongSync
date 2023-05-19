import type { CommandInteraction } from "discord.js";
import { ApplicationCommandType } from "discord.js";
import { wrapRedis } from "../../lib/redis";
import { ChatCommand } from "../../../types/command";
import getSongs from "../../lib/songs";
import { log } from "../../lib/logger/log";

export const ping: ChatCommand = {
  name: "ping",
  description: "Checks that the bot is online. hi twitch",
  type: ApplicationCommandType.ChatInput,
  inhibitors: [],
  async run(interaction: CommandInteraction) {
    await interaction.reply({ content: "Pong!", ephemeral: true });
  },
};
