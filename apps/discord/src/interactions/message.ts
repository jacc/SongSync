import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Message,
} from "discord.js";
import { z } from "zod";
import getSongs from "../lib/songs";
import { prisma } from "../lib/database/client";
import { wrapRedis } from "../lib/redis";
import { formatEmbed } from "../lib/utils/discord";
import { getCachedSettings } from "../lib/database/util";
import getSongsUncached from "../lib/songs";

const linkSchema = z.string().refine((x) => {
  return (
    x.includes("open.spotify.com/track") ||
    x.includes("open.spotify.com/album") ||
    x.includes("music.apple.com") ||
    x.includes("soundcloud.com")
  );
}, "");

export async function handleChatMessage(message: Message): Promise<void> {
  console.log(message.content);
  if (!message.guild || message.author.bot) return;

  const url = linkSchema.safeParse(message.content);
  if (!url.success) return;

  const matches = url.data.match(/\bhttps?:\/\/\S+/gi);
  if (!matches) return;

  const guildSettings = await getCachedSettings(message.guild.id);

  if (!guildSettings.enabled) return;

  matches.map(async (match) => {
    const matchLinks = await getSongsUncached(match);
    const replyObject = await formatEmbed(matchLinks, guildSettings);
    await message.reply({
      components: [
        replyObject.songButtons as ActionRowBuilder<ButtonBuilder>,
        replyObject.actionButtons as ActionRowBuilder<ButtonBuilder>,
      ],
      embeds: replyObject.embed ? [replyObject.embed] : undefined,
    });
  });
}
