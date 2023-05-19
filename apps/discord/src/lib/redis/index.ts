import { cache, CacheResultType } from "@streamticker/cache";
import { redis } from "./redis";

export const SIX_HOURS_IN_SECONDS = 1 * 60 * 60 * 6;

export function wrapRedis<T>(
  key: string,
  fetch: () => Promise<T>,
  ttl = SIX_HOURS_IN_SECONDS
) {
  return cache<T>({
    fetch,

    get: async () => {
      const value = await redis.get(key);

      if (value === null) {
        return {
          type: CacheResultType.MISS,
        };
      }

      return {
        type: CacheResultType.HIT,
        value: JSON.parse(value),
      };
    },

    set: async (value) => {
      await redis.set(key, JSON.stringify(value), "EX", ttl);
    },
  });
}
