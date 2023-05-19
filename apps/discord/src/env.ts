import { envsafe, str, url } from "envsafe";
require("dotenv").config();

export const env = envsafe({
  DATABASE_HOST: str(),
  DATABASE_USERNAME: str(),
  DATABASE_PASSWORD: str(),
  DISCORD_TOKEN: str(),
  DISCORD_APPLICATION_ID: str(),
  DISCORD_GUILD_ID: str(),
  SONG_LINK_API_KEY: str(),
  REDIS_URL: str(),
});
