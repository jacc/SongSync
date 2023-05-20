import { Message } from "discord.js";
import { z } from "zod";
import getSongs from "../lib/songs";
import database from "../lib/database/client";

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

  const serverObject = await database
    .insertInto("Guild")
    .values({
      id: message.guild.id,
    })
    .ignore()
    .returning("Guild.enabled")
    .execute();

  console.log(serverObject);

  matches.map(async (match) => {
    const matchLinks = await getSongs(match);

    await message.reply(JSON.stringify(matchLinks, null, 2));
  });
}
