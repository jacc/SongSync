import IORedis from "ioredis";
import { env } from "../../env";

export const redis = new IORedis(env.REDIS_URL as string);

export const countSongs = async () => {
  const keys = await redis.keys("song:*");
  return keys.length;
};
