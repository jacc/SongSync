import axios from "axios";
import urlcat from "urlcat";
import { env } from "../../env";
import { wrapRedis } from "../redis";
import { LinkResponse, OdlesiResponse } from "../../../types/odlesi";

const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30;

export default async function getSongs(link: string): Promise<LinkResponse> {
  await wrapRedis(`song:${link}`, async () => {}, THIRTY_DAYS_IN_SECONDS);

  const request = await axios.get<OdlesiResponse>(
    urlcat(`https://api.song.link/v1-alpha.1/links?url=:song&key=:key`, {
      song: encodeURIComponent(link),
      key: env.SONG_LINK_API_KEY,
    })
  );

  const json = await request.data;

  return {
    title: json.entitiesByUniqueId[json.entityUniqueId].title,
    artist: json.entitiesByUniqueId[json.entityUniqueId].artistName,
    thumbnail: json.entitiesByUniqueId[json.entityUniqueId].thumbnailUrl,
    links: {
      apple_music: json.linksByPlatform.appleMusic.url,
      soundcloud: json.linksByPlatform.soundcloud.url,
      spotify: json.linksByPlatform.spotify.url,
      tidal: json.linksByPlatform.tidal.url,
      youtube: json.linksByPlatform.youtube.url,
      youtube_music: json.linksByPlatform.youtubeMusic.url,
    },
  } as LinkResponse;
}
