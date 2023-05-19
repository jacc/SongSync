import type { ColumnType, GeneratedAlways } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const Format = {
    DEFAULT: "DEFAULT",
    MINIMAL: "MINIMAL"
} as const;
export type Format = (typeof Format)[keyof typeof Format];
export type Guild = {
    id: string;
    enabled: Generated<number>;
    format: Generated<Format>;
};
export type User = {
    id: Generated<number>;
};
export type DB = {
    Guild: Guild;
    User: User;
};
