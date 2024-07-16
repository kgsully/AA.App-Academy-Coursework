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

// 01
app.get('/artists', (req, res) => {
  // console.log("GET /artists");
  const artistList = getAllArtists();
  // console.log(`Result: ${artistList}`);
  res.status(200).send(artistList);
});

// 02
app.post('/artists', (req, res) => {
  // console.log("POST /artists");
  // console.log(`Request Body: ${req.body}`);
  const newArtist = addArtist(req.body);
  // console.log("New Artist Created:", newArtist);
  res.status(201).send(newArtist);
});

// 03
app.get('/artists/latest', (req, res) => {
  // console.log("GET /artists/latest");
  const latestArtist = getLatestArtist();
  // console.log("Result:", latestArtist);
  res.status(200).send(latestArtist);
});

// 04
app.get('/artists/latest/albums', (req, res) => {
  // console.log("GET /artists/latest/albums");
  const latestArtistAlbums = getAlbumsForLatestArtist();
  // console.log("Result:", latestArtistAlbums);
  res.status(200).send(latestArtistAlbums);
});

// 05
app.get('/artists/:artistId', (req, res) => {
  // console.log("GET", req.url);
  const artistId = req.params.artistId;
  const reqArtist = getArtistByArtistId(artistId);
  res.status(200).send(reqArtist);
});

// 06
app.put('/artists/:artistId', (req, res) => {
  const artistId = req.params.artistId;
  const updArtist = editArtistByArtistId(artistId, req.body);
  res.status(200).send(updArtist);
});

app.patch('/artists/:artistId', (req, res) => {
  const artistId = req.params.artistId;
  const updArtist = editArtistByArtistId(artistId, req.body);
  res.status(200).send(updArtist);
});

// 07
app.delete('/artists/:artistId', (req, res) => {
  const artistId = req.params.artistId;
  deleteArtistByArtistId(artistId);
  res.status(200).send({message: "Successfully deleted"});
});

// 08
app.get('/artists/:artistId/albums', (req, res) => {
  const artistId = req.params.artistId;
  const albums = getAlbumsByArtistId(artistId);
  res.status(200).send(albums);
});

// 09
app.get('/albums/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  const album = getAlbumByAlbumId(albumId);
  res.status(200).send(album);
});

// 10
app.post('/artists/:artistId/albums', (req, res) => {
  const album = addAlbumByArtistId(req.params.artistId, req.body);
  res.status(201).send(album);
});

// 11
app.put('/albums/:albumId', (req, res) => {
  const updAlbum = editAlbumByAlbumId(req.params.albumId, req.body);
  res.status(200).send(updAlbum);
});

app.patch('/albums/:albumId', (req, res) => {
  const updAlbum = editAlbumByAlbumId(req.params.albumId, req.body);
  res.status(200).send(updAlbum);
});

// 12
app.delete('/albums/:albumId', (req, res) => {
  deleteAlbumByAlbumId(req.params.albumId);
  res.status(200).json({message: "Successfully deleted"});
});

// 13
app.get('/albums', (req, res) => {
  const filter = req.query;
  // console.log("FILTER---------->", filter);
  const filteredAlbums = getFilteredAlbums(filter.startsWith)
  res.status(200).send(filteredAlbums);
})

// 14
app.get('/songs/:songId', (req, res) => {
  const song = getSongBySongId(req.params.songId);
  res.status(200).send(song);
});

// 15
app.post('/albums/:albumId/songs', (req, res) => {
  const song = addSongByAlbumId(req.params.albumId, req.body);
  res.status(201).send(song);
});

// 16
app.get('/artists/:artistId/songs', (req, res) => {
  const songs = getSongsByArtistId(req.params.artistId);
  res.status(200).send(songs);
});

// 17
app.get('/albums/:albumId/songs', (req, res) => {
  const songs = getSongsByAlbumId(req.params.albumId);
  res.status(200).send(songs);
});

// 18
app.put('/songs/:songId', (req, res) => {
  const updSong = editSongBySongId(req.params.songId, req.body);
  res.status(200).send(updSong);
});

app.patch('/songs/:songId', (req, res) => {
  const updSong = editSongBySongId(req.params.songId, req.body);
  res.status(200).send(updSong);
});

// 19
app.delete('/songs/:songId', (req, res) => {
  deleteSongBySongId(req.params.songId);
  res.status(200).send({message: "Successfully deleted"});
});





























// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}
