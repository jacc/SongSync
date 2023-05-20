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
import { AnyComponentBuilder } from "discord.js";

export async function formatEmbed(
  song: LinkResponse,
  guildSettings: Guild
): Promise<{
  embed: EmbedBuilder | null;
  songButtons: ActionRowBuilder<AnyComponentBuilder>;
}> {
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

  if (guildSettings.format === Format.DEFAULT) {
    const embed = new EmbedBuilder()
      .setTitle(`${song.title} - ${song.artist}`)
      .setThumbnail(song.thumbnail)
      .setTimestamp();

    return { embed, songButtons };
  }

  return { embed: null, songButtons };
}
