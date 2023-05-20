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

  let guildSettings = await wrapRedis(
    `settings:${message.guild.id}`,
    async () => {
      try {
        return await prisma.guild.findFirstOrThrow({
          where: { id: message.guild!.id },
        });
      } catch (e) {
        return await prisma.guild.create({
          data: {
            id: message.guild!.id,
          },
        });
      }
    },
    6000
  );

  console.log(guildSettings);

  if (!guildSettings.enabled) return;

  matches.map(async (match) => {
    const matchLinks = await getSongs(match);
    const replyObject = await formatEmbed(matchLinks, guildSettings);
    console.log(replyObject);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(
          "https://open.spotify.com/track/6tEpOijHrGLidCtHeoMhlC?si=61c9f214d4894ba2"
        )
        .setEmoji("🎵")
    );

    console.log(replyObject);

    await message.reply({ components: [replyObject] });
  });
}
