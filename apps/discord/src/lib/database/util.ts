import { Guild } from "@prisma/client";
import { wrapRedis } from "../redis";
import { prisma } from "./client";

export async function getCachedSettings(guildId: string): Promise<Guild> {
  return await wrapRedis(
    `settings:${guildId}`,
    async () => {
      try {
        return await prisma.guild.findFirstOrThrow({
          where: { id: guildId },
        });
      } catch (e) {
        return await prisma.guild.create({
          data: {
            id: guildId,
          },
        });
      }
    },
    6000
  );
}
