declare const CacheResultType: {
  readonly HIT: 1;
  readonly MISS: 2;
};
type CacheResultType = (typeof CacheResultType)[keyof typeof CacheResultType];
interface CacheGetHit<T> {
  type: (typeof CacheResultType)["HIT"];
  value: T;
}
interface CacheGetMiss {
  type: (typeof CacheResultType)["MISS"];
}
type CacheGetResult<T> = CacheGetHit<T> | CacheGetMiss;
interface CacheConfig<T> {
  get: () => Promise<CacheGetResult<T>>;
  set: (value: T) => Promise<void>;
  fetch: () => Promise<T>;
}
declare function cache<T>(config: CacheConfig<T>): Promise<T>;

export {
  CacheConfig,
  CacheGetHit,
  CacheGetMiss,
  CacheGetResult,
  CacheResultType,
  cache,
};
