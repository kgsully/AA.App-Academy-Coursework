const http = require('http');
const fs = require('fs');

/* ============================ SERVER DATA ============================ */
let artists = JSON.parse(fs.readFileSync('./seeds/artists.json'));
let albums = JSON.parse(fs.readFileSync('./seeds/albums.json'));
let songs = JSON.parse(fs.readFileSync('./seeds/songs.json'));

let nextArtistId = 2;
let nextAlbumId = 2;
let nextSongId = 2;

// returns an artistId for a new artist
function getNewArtistId() {
  const newArtistId = nextArtistId;
  nextArtistId++;
  return newArtistId;
}

// returns an albumId for a new album
function getNewAlbumId() {
  const newAlbumId = nextAlbumId;
  nextAlbumId++;
  return newAlbumId;
}

// returns an songId for a new song
function getNewSongId() {
  const newSongId = nextSongId;
  nextSongId++;
  return newSongId;
}

/* ======================= PROCESS SERVER REQUESTS ======================= */
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // assemble the request body
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => { // finished assembling the entire request body
    // Parsing the body of the request depending on the "Content-Type" header
    if (reqBody) {
      switch (req.headers['content-type']) {
        case "application/json":

          req.body = JSON.parse(reqBody);
          break;
        case "application/x-www-form-urlencoded":
          req.body = reqBody
            .split("&")
            .map((keyValuePair) => keyValuePair.split("="))
            .map(([key, value]) => [key, value.replace(/\+/g, " ")])
            .map(([key, value]) => [key, decodeURIComponent(value)])
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {});
          break;
        default:
          break;
      }
      console.log(req.body);
    }

    /* ========================== ROUTE HANDLERS ========================== */

    // Your code here

    // 01 - Get all artists
    if (req.method === 'GET' && req.url === '/artists') {
      console.log(artists);

      const resBody = JSON.stringify(artists);

      res.statusCode = 200;  // OK
      res.setHeader("Content-Type", "application/json");
      res.write(resBody);
      return res.end();

    }

    // 02 - Get a specific artist's details based on artistId
    if (req.method === 'GET' && req.url.startsWith('/artists/')) {  // for the URL, could also use match with a regex: req.url.match(/^\/artists\/\d+$/)
      const urlParts = req.url.split('/'); // ['', 'artists', '1']
      if (urlParts.length === 3) {  // if used match with regex, this if statement wouldn't be required and artistId would = req.url.split('/')[2]
        const artistId = urlParts[2];

        let artist;
        for(let key in artists) {
          if (artists[key].artistId === Number(artistId)) {
            artist = artists[key];
          }
        }

        if(artist) {
          console.log(artist);
          res.statusCode = 200;  // OK
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(artist));
        } else {
          console.log("Artist Not Found");
          res.statusCode = 404;  // Not Found
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({message: "artist not found"}))
        }
      }
    }

    // 03 - Add an artist
    if (req.method === "POST" && req.url === '/artists') {
      const {name} = req.body;
      const artistId = getNewArtistId();
      const artist = {artistId, name};

      artists[artistId] = artist;

      res.statusCode = 201;  // Created
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(artist));

    }

    // 04 - Edit a specified artist by artistId
    if ((req.method === "PUT" || req.method === "PATCH") && req.url.startsWith('/artists/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const artistId = Number(urlParts[2]);
        const {name} = req.body;

        let artist;
        for (let key in artists) {
          if (artists[key].artistId === artistId) {
            artist = artists[key];
          }
        }

        if (artist && name) {
          const updDate = new Date().toISOString();
          const artistUpd = {artistId, name, updatedAt: updDate};
          console.log(artistUpd);

          artists[artistId] = artistUpd;

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(artistUpd));
        } else {
          console.log("Artist Not Found or Error in Request Body");
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({message: "Artist Not Found or Error in Request Body"}))
        }
      }
    }

    // 05 - Delete a specified artist by artistId
    if (req.method === 'DELETE' && req.url.startsWith('/artists/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const artistId = urlParts[2];

        let artist;
        for (let key in artists) {
          if (artists[key].artistId === Number(artistId)) {
            artist = artists[key];
          }
        }

        if (artist) {
          delete artists[artistId];
          console.log("Deleted Artist");

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({message: "successfully deleted"}));
        }
      }
    }

    // 06 - Get all albums of a specific artist based on artistId
    if (req.method === 'GET' && req.url.startsWith('/artists/')) {
      const urlParts = req.url.split('/');

      if (urlParts.length === 4 && urlParts[3] === 'albums') {
        const artistId = urlParts[2];

        let artist;
        for (let key in artists) {
          if (artists[key].artistId === Number(artistId)) {
            artist = artists[key];
          }
        }

        if(artist) {
          const artistAlbums = [];
          for (let key in albums) {
            if (albums[key].artistId === Number(artistId)) {
              artistAlbums.push(albums[key]);
            }
          }

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(artistAlbums));
        }
      }
    }

    // 07 - Get a specific album's details based on albumId
    if (req.method === 'GET' && req.url.startsWith('/albums/')) {
      const urlParts = req.url.split('/');

      if (urlParts.length === 3) {
        const albumId = urlParts[2];

        let album;
        for (let key in albums) {
          if (albums[key].albumId === Number(albumId)) {
            album = albums[key];
          }
        }

        if (album) {

          for (let key in artists) {
            if (artists[key].artistId === album.artistId) {
              album.artist = artists[key];
            }
          }

          let albumSongs = [];
          for (let key in songs) {
            if (songs[key].albumId === Number(albumId)) {
              albumSongs.push(songs[key]);
            }
          }
          album.songs = albumSongs;

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(album));
        }
      }
    }

    // 08 - Add an album to a specific artist based on artistId
    if (req.method === 'POST' && req.url.startsWith('/artists/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 4 && urlParts[3] === 'albums') {
        const artistId = Number(urlParts[2]);

        const {name} = req.body;
        const albumId = getNewAlbumId();
        const newAlbum = {name, albumId, artistId};

        albums[albumId] = newAlbum;

        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(newAlbum));
      }
    }

    // 09 - Edit a specified album by albumId
    if ((req.method === 'PATCH' || req.method === 'PUT') && req.url.startsWith('/albums/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const albumId = urlParts[2];
        const {name} = req.body;
        if (!name) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({message: "Problem with request body"}));
        }

        for (let key in albums) {
          if (albums[key].albumId === Number(albumId)) {
            albums[key].name = name;

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify(albums[key]));
          }
        }

        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({message: "Artist Not Found"}));
      }
    }

    // 10 - Delete a specified album by albumId
    if (req.method === 'DELETE' && req.url.startsWith('/albums')) {
      const urlParts = req.url.split('/');

      if (urlParts.length === 3) {
        const albumId = urlParts[2];

        let album;
        for (let key in albums) {
          if (albums[key].albumId === Number(albumId)) {
            album = albums[key];
          }
        }

        if (album) {
          delete albums[albumId];

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({message: "Successfully deleted"}));
        }
      }
    }

    // 11 - Get all songs of a specific artist based on artistId
    if (req.method === 'GET' && req.url.startsWith('/artists')) {
      const urlParts = req.url.split('/');

      if (urlParts.length === 4 && urlParts[3] === 'songs') {
        const artistId = urlParts[2];

        const artistAlbumIds = [];
        const artistSongs = [];

        for (let key in albums) {
          if (albums[key].artistId === Number(artistId)) {
            artistAlbumIds.push(albums[key].albumId);
          }
        }

        for (let key in songs) {
          if (artistAlbumIds.includes(songs[key].albumId)) {
            artistSongs.push(songs[key]);
          }
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(artistSongs));
      }
    }

    // 12 - Get all songs of a specific album based on albumId
    if (req.method === 'GET' && req.url.startsWith('/albums')) {
      const urlParts = req.url.split('/');

      if (urlParts.length === 4 && urlParts[3] === 'songs') {
        const albumId = urlParts[2];

        const albumSongs = [];

        for (let key in songs) {
          if (songs[key].albumId === Number(albumId)) {
            albumSongs.push(songs[key]);
          }
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(albumSongs));
      }
    }

    // 13 - Get all songs of a specified trackNumber
    if (req.method === 'GET' && req.url.startsWith('/trackNumber')) {
      const urlParts = req.url.split('/');

      if (urlParts.length === 4 && urlParts[3] === 'songs') {
        const trackId = urlParts[2];

        const tracks = [];
        for (let key in songs) {
          if (songs[key].trackNumber === Number(trackId)) {
            tracks.push(songs[key]);
          }
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify(tracks));
      }
    }

    // 14 - Get a specific song's details based on songId
    if (req.method === 'GET' && req.url.startsWith('/songs/')) {
      const urlParts = req.url.split('/');

      if (urlParts.length === 3) {
        const songId = urlParts[2];

        let song;
        for (let key in songs) {
          if (songs[key].songId === Number(songId)) {
            song = songs[key];
          }
        }

        if(song) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(song));
        }
      }
    }

    // 15 - Add a song to a specific album based on albumId
    if (req.method === 'POST' && req.url.startsWith('/albums/')) {
      const urlParts = req.url.split('/');

      if (urlParts.length === 4 && urlParts[3] === 'songs') {
        const albumId = Number(urlParts[2]);

        let album;
        for (let key in albums) {
          if (albums[key].albumId === albumId) {
            album = albums[key];
          }
        }

        if (album) {
          const {name, lyrics, trackNumber} = req.body;
          const songId = getNewSongId();
          const newSong = {name, lyrics, trackNumber, songId};

          songs.songId = newSong;

          res.statusCode = 201;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(newSong));
        }
      }
    }

    // 16 - Edit a specified song by songId
    if ((req.method === "PUT" || req.method === "PATCH") && req.url.startsWith('/songs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const songId = Number(urlParts[2]);

        for (let key in songs) {
          if (songs[key].songId === songId) {
            const {name, lyrics, trackNumber} = req.body;
            const timeStamp = new Date().toISOString();

            if (!name || !lyrics || !trackNumber) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify({message: "Problem with request body"}));
            }

            songs[key].name = name;
            songs[key].lyrics = lyrics;
            songs[key].trackNumber = trackNumber;
            songs[key].updatedAt = timeStamp;

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify(songs[key]));
          }
        }
      }
    }

    // 17 - Delete a specified song by songId
    if (req.method === 'DELETE' && req.url.startsWith('/songs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const songId = Number(urlParts[2]);

        for (let key in songs) {
          if (songs[key].songId === songId) {
            delete songs[key];

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify({message: "Deleted Successfully"}));
          }
        }
      }
    }


    // Default - handle unfound endpoints

    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.write("Endpoint not found");
    return res.end();
  });
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
