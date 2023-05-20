import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  ComponentBuilder,
  EmbedBuilder,
  Message,
} from "discord.js";
import { LinkResponse } from "../../../types/odlesi";
import { Format, Guild } from "@prisma/client";

export async function formatEmbed(
  song: LinkResponse,
  guildSettings: Guild
): Promise<any> {
  const songButtons = new ActionRowBuilder();

  for (const [key, value] of Object.entries(song.links)) {
    if (value) {
      songButtons.addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel(key)
          .setURL(value)
          .setEmoji("🎵")
      );
    }
  }

  //   if (guildSettings.format === Format.DEFAULT) {
  //     const embed = new EmbedBuilder()
  //       .setTitle(`${song.title} - ${song.artist}`)
  //       .setThumbnail(song.thumbnail)
  //       .setTimestamp();

  //     return embed, songButtons;
  //   }

  return songButtons;
}
