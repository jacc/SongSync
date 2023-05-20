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
import { getAverageColor } from "fast-average-color-node";
import { PlatformEmoji } from "../../../types/bot";

export async function formatEmbed(
  song: LinkResponse,
  guildSettings: Guild
): Promise<{
  embed: EmbedBuilder | null;
  songButtons: ActionRowBuilder<AnyComponentBuilder>;
  actionButtons: ActionRowBuilder<AnyComponentBuilder>;
}> {
  const songButtons = new ActionRowBuilder();

  for (const [key, value] of Object.entries(song.links)) {
    if (value) {
      songButtons.addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setURL(value)
          .setEmoji(PlatformEmoji[key])
      );
    }
  }

  const actionButtons = new ActionRowBuilder().addComponents([
    new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setCustomId("play")
      .setLabel("Play Now")
      .setEmoji("▶️"),
    new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setCustomId("queue")
      .setLabel("Add to Queue")
      .setEmoji("📃"),
    new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setCustomId("add")
      .setLabel("Add to Playlist")
      .setEmoji("➕"),
  ]);

  if (guildSettings.format === Format.DEFAULT) {
    // const color = await getAverageColor(song.thumbnail, {
    //   algorithm: "simple",
    // });
    // console.log(color);
    const embed = new EmbedBuilder().setAuthor({
      name: `${song.title} by ${song.artist}`,
      iconURL: song.thumbnail,
    });
    // .setColor(`${color.hex}`);

    return { embed, songButtons, actionButtons };
  }

  return { embed: null, songButtons, actionButtons };
}
