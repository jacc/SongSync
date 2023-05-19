import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { DB } from "../../../prisma/generated/types";
import { env } from "../../env";

const database = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    useSharedConnection: true,
  }),
});

export default database;
