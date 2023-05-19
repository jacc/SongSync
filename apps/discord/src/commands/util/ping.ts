import type { ChatCommand } from "../../types/command";
import type { CommandInteraction } from "discord.js";
import { ApplicationCommandType } from "discord.js";
import { wrapRedis } from "../../lib/redis";

export const ping: ChatCommand = {
  name: "ping",
  description: "Checks that the bot is online. hi twitch",
  type: ApplicationCommandType.ChatInput,
  inhibitors: [],
  async run(interaction: CommandInteraction) {
    await wrapRedis(`user:${interaction.user.id}`, async () => {
      return {
        id: interaction.user.id,
        username: interaction.user.username,
        discriminator: interaction.user.discriminator,
        avatar: interaction.user.avatar,
        bot: interaction.user.bot,
      };
    });
    await interaction.reply({ content: "Pong! hoe 2", ephemeral: true });
  },
};
