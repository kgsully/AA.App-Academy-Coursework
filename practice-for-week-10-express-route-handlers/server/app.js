// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();

// Your code here
app.use(express.json());

// Used for test purposes
// app.use((req, res, next) => {
//   console.log('Body:', req.body);
//   next();
// });

app.get('/artists', (req, res) => {
  console.log("GET /artists")
  const artistList = getAllArtists();
  console.log(`Result: ${artistList}`);
  res.status(200).send(artistList);
});

app.get('/artists/latest', (req, res) => {
  console.log("GET /artists/latest");
  const latestArtist = getLatestArtist();
  console.log("Result:", latestArtist);
  res.status(200).send(latestArtist);
});

app.get('/artists/latest/albums', (req, res) => {
  console.log("GET /artists/latest/albums");
  const latestArtistAlbums = getAlbumsForLatestArtist();
  console.log("Result:", latestArtistAlbums);
  res.status(200).send(latestArtistAlbums);
});

app.get('/artists/:id', (req, res) => {
  console.log("GET", req.url);
  const urlArr = req.url.split('/');
  const artistId = urlArr[urlArr.length - 1];
  const reqArtist = getArtistByArtistId(artistId);
  res.status(200).send(reqArtist);
});

app.post('/artists', (req, res) => {
  console.log("POST /artists");
  console.log(`Request Body: ${req.body}`);
  const newArtist = addArtist(req.body);
  console.log("New Artist Created:", newArtist);
  res.status(201).send(newArtist);
});

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}
