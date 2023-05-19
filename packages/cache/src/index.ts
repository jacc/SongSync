export const CacheResultType = {
  HIT: 1,
  MISS: 2,
} as const;

export type CacheResultType =
  (typeof CacheResultType)[keyof typeof CacheResultType];

export interface CacheGetHit<T> {
  type: (typeof CacheResultType)["HIT"];
  value: T;
}

export interface CacheGetMiss {
  type: (typeof CacheResultType)["MISS"];
}

export type CacheGetResult<T> = CacheGetHit<T> | CacheGetMiss;

export interface CacheConfig<T> {
  get: () => Promise<CacheGetResult<T>>;
  set: (value: T) => Promise<void>;
  fetch: () => Promise<T>;
}

export async function cache<T>(config: CacheConfig<T>) {
  const result = await config.get();

  if (result.type === CacheResultType.HIT) {
    return result.value;
  }

  const fetched = await config.fetch();
  await config.set(fetched);

  return fetched;
}
