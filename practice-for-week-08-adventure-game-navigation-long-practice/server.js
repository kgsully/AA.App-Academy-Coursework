const http = require('http');
const fs = require('fs');

const { Player } = require('./game/class/player');
const { World } = require('./game/class/world');

const worldData = require('./game/data/basic-world-data');

let player;
let world = new World();
world.loadWorld(worldData);

const server = http.createServer((req, res) => {

  /* ============== ASSEMBLE THE REQUEST BODY AS A STRING =============== */
  let reqBody = '';
  req.on('data', (data) => {
    reqBody += data;
  });

  req.on('end', () => { // After the assembly of the request body is finished
    /* ==================== PARSE THE REQUEST BODY ====================== */
    if (reqBody) {
      req.body = reqBody
        .split("&")
        .map((keyValuePair) => keyValuePair.split("="))
        .map(([key, value]) => [key, value.replace(/\+/g, " ")])
        .map(([key, value]) => [key, decodeURIComponent(value)])
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
    }

    /* ======================== ROUTE HANDLERS ========================== */

    // Helper function for redirect to homepage:
    function redirect(location) {
      res.statusCode = 302;
      res.setHeader("Location", location);
      return res.end();
    }

    // Phase 1: GET /

    if (req.method === "GET" && req.url === "/") {
      const availableRooms = world.availableRoomsToString();
      // console.log(availableRooms);
      const htmlPage = fs.readFileSync("./views/new-player.html", "utf-8");
      const resBody =  htmlPage.replace(/#{availableRooms}/g, availableRooms);

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.write(resBody);
      return res.end();
    }

    // Phase 2: POST /player
    if (req.method === "POST" && req.url === "/player") {
      // console.log(req.body);
      if (req.body.name !== "" && req.body.roomId in world.rooms) {
        const startingRoom = world.rooms[req.body.roomId];
        // console.log(startingRoom);
        player = new Player(req.body.name, startingRoom);
        // console.log(player);

        res.statusCode = 302;
        res.setHeader("Location", `./rooms/${req.body.roomId}`);
        return res.end();
      }
    }

    // ALL ROUTE HANDLERS AFTER PHASE 2 REQUIRE A PLAYER - IF NO PLAYER, REDIRECT TO THE HOME PAGE
    if (!player) {
      redirect("/");
    }

    // Phase 3: GET /rooms/:roomId          ---------> NEED TO IMPLEMENT REDIRECT TO THE CURRENT ROOM!
    if (req.method === "GET" && req.url.startsWith("/rooms")) {

      // parse URL to determine room #
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const urlRoom = urlParts[2];

        // generate player inventory / item list:
        let inventory = "";
        if (player.items.length < 1) {
          inventory = "<span>Inventory is Empty!</span>";
        } else {
          inventory = "<ul>";
          player.items.forEach(item => {
            inventory += `<li>${item.name}</li>`;
          });
          inventory += "</ul>";
        }

        // generate room item list
        let roomItems = "";
        if (world.rooms[urlRoom].items.length < 1) {
          roomItems = "<span>The room is empty!</span>";
        } else {
          roomItems = "<ul>";
          world.rooms[urlRoom].items.forEach(item => {
            roomItems += `<li>${item.name}</li>`;
          });
          roomItems += "</ul>";
        }

        // generate exit links - format is /rooms/:roomId/:direction
        let exits = "<ul>";
        for(key in world.rooms[urlRoom].exits) {
          const keyLower = key.toLowerCase();
          let allowedDirection = "";
          if (keyLower === 'n') {
            allowedDirection = "North";
          } else if (keyLower === 's') {
            allowedDirection = "South";
          } else if (keyLower === 'w') {
            allowedDirection = "West";
          } else {
            allowedDirection = "East";
          }

          exits += `<li><a href="/rooms/${urlRoom}/${keyLower}">${allowedDirection}</a></li>`;
        }
        exits += "</ul>";

        const htmlPage = fs.readFileSync("./views/room.html", "utf-8");
        const resBody = htmlPage
          .replace(/#{roomName}/g, world.rooms[urlRoom].name)
          .replace(/#{inventory}/g, inventory)
          .replace(/#{roomItems}/g, roomItems)
          .replace(/#{exits}/g, exits);

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(resBody);
        return res.end();
      }

    }

    // Phase 4: GET /rooms/:roomId/:direction

    // Phase 5: POST /items/:itemId/:action

    // Phase 6: Redirect if no matching route handlers

  })
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
