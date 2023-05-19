export interface LinkResponse {
  title: string;
  artist: string;
  thumbnail: string;
  links: {
    apple_music: string;
    soundcloud: string;
    spotify: string;
    tidal: string;
    youtube: string;
    youtube_music: string;
  };
}

export type OdlesiResponse = {
  entityUniqueId: string;

  userCountry: string;

  pageUrl: string;
  linksByPlatform: {
    [K in Platform]: {
      entityUniqueId: string;

      url: string;

      nativeAppUriMobile?: string;
      nativeAppUriDesktop?: string;
    };
  };
  entitiesByUniqueId: {
    [T in string]: {
      id: string;

      type: "song" | "album";

      title?: string;
      artistName?: string;
      thumbnailUrl?: string;
      thumbnailWidth?: number;
      thumbnailHeight?: number;

      apiProvider: APIProvider;
      platforms: Platform[];
    };
  };
};

type Platform =
  | "spotify"
  | "itunes"
  | "appleMusic"
  | "youtube"
  | "youtubeMusic"
  | "google"
  | "googleStore"
  | "pandora"
  | "deezer"
  | "tidal"
  | "amazonStore"
  | "amazonMusic"
  | "soundcloud"
  | "napster"
  | "yandex"
  | "spinrilla"
  | "audius"
  | "audiomack"
  | "anghami"
  | "boomplay";

type APIProvider =
  | "spotify"
  | "itunes"
  | "youtube"
  | "google"
  | "pandora"
  | "deezer"
  | "tidal"
  | "amazon"
  | "soundcloud"
  | "napster"
  | "yandex"
  | "spinrilla"
  | "audius"
  | "audiomack"
  | "anghami"
  | "boomplay";
