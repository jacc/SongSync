import { Message } from "discord.js";

export async function handleChatMessage(message: Message): Promise<void> {
  console.log(message.content);
  if (!message.guild || message.author.bot) return;
}
