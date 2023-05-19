const request = await axios.get<any>( // TODO: make this not use any.
  urlcat(`https://api.song.link/v1-alpha.1/links?url=:title&key=:key`, {
    title: req.input.link,
    key: env.SONG_LINK_API_KEY,
  })
);
