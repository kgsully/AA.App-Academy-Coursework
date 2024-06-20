const http = require("http");
const fs = require("fs");

const { Player } = require("./game/class/player");
const { World } = require("./game/class/world");

const worldData = require("./game/data/basic-world-data");

let player;
let world = new World();
world.loadWorld(worldData);

const server = http.createServer((req, res) => {
  /* ============== ASSEMBLE THE REQUEST BODY AS A STRING =============== */
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => { // After the assembly of the request body is finished
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
      console.log("\nRequest - Home / Player Setup Page");

      const availableRooms = world.availableRoomsToString();
      // console.log(availableRooms);
      const htmlPage = fs.readFileSync("./views/new-player.html", "utf-8");
      const resBody = htmlPage.replace(/#{availableRooms}/g, availableRooms);

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
        // console.log(player.currentRoom.id);

        console.log("\nCreating Player: ");
        console.log(player);

        res.statusCode = 302;
        res.setHeader("Location", `/rooms/${req.body.roomId}`);
        return res.end();
      }
    }

    // ALL ROUTE HANDLERS AFTER PHASE 2 REQUIRE A PLAYER - IF NO PLAYER, REDIRECT TO THE HOME PAGE
    if (!player) {
      console.log("\nNo Player Found - Re-direct to home page");
      redirect("/");
    }

    // Phase 3: GET /rooms/:roomId
    if (req.method === "GET" && req.url.startsWith("/rooms")) {
      // console.log(player.currentRoom);
      // parse URL to determine room #
      const urlParts = req.url.split("/");

      if (urlParts.length === 3) {
        console.log("\nRequest - Room Details");
        const urlRoom = Number(urlParts[2]);
        console.log("-> Requested room: " + urlRoom);
        // redirect to player's current room if route parameter is NOT the player's current room
        if (urlRoom !== player.currentRoom.id) {
          console.log("--> Requested room does not match player current room: re-direct to user's current room");
          return redirect(`/rooms/${player.currentRoom.id}`);
        }

        const htmlPage = fs.readFileSync("./views/room.html", "utf-8");
        const resBody = htmlPage
          .replace(/#{roomName}/g, player.currentRoom.name)
          .replace(/#{inventory}/g, player.inventoryToString())
          .replace(/#{roomItems}/g, player.currentRoom.itemsToString()) //roomItems
          .replace(/#{exits}/g, player.currentRoom.exitsToString());

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(resBody);
        return res.end();
      }

    }

    if (req.method === "GET" && req.url.startsWith("/rooms")) {
      const urlParts = req.url.split("/");

      if (urlParts.length === 4) {
        console.log("\nRequest - Move Rooms")
        const urlRoom = Number(urlParts[2]);
        const urlDirection = urlParts[3].slice(0, 1).toLowerCase();
        console.log("-> Current Room: " + urlRoom + " / " + "Requested Move Direction: " + urlDirection);

        // redirect to player's current room if route parameter is NOT the player's current room
        // BEFORE processing any player moves
        if (urlRoom !== player.currentRoom.id) {
          console.log("--> Requested room does not match player current room: re-direct to user's current room");
          return redirect(`/rooms/${player.currentRoom.id}`);
        }

        const moveRoom = player.move(urlDirection);

        // // Process player move, then re-direct to player's updated room
        try {
          return redirect(`/rooms/${moveRoom.id}`);
        } catch (error) {
          return redirect(`/rooms/${player.currentRoom.id}`);
        }
      }

    }

    // Phase 5: POST /items/:itemId/:action
    if (req.method === "POST" && req.url.startsWith("/items")) {
      console.log("\nRequest - Item Action:")
      const urlParts = req.url.split("/");

      if (urlParts.length === 4) {
        const itemId = Number(urlParts[2]);
        const action = urlParts[3];
        console.log("-> Item ID: " + itemId + " / " + "Action: " + action);

        switch(action) {
          case "take":
            player.takeItem(itemId);
            console.log("--> Player has taken an item");
            console.log("--> Player items:");
            console.log(player.items);
            break;
          case "eat":
            try {
              player.eatItem(itemId);
              console.log("--> Player has eaten an item");
              console.log("--> Player items:");
              console.log(player.items);
            } catch (error) {
              console.log(error.message);
              const htmlPage = fs.readFileSync("./views/error.html", "utf-8");
              const resBody = htmlPage
                .replace(/#{errorMessage}/g, error.message)
                .replace(/#{roomId}/g, player.currentRoom.id);

              res.statusCode = 200;
              res.setHeader("Content-Type", "text/html");
              res.write(resBody);
              return res.end();
            }
            break;
          case "drop":
            player.dropItem(itemId);
            console.log("--> Player has dropped an item");
            console.log("--> Player items:");
            console.log(player.items);
            break;
          default:
            break;
        }

        try {
          return redirect(`/rooms/${player.currentRoom.id}`);
        } catch (error) {
          console.log(error);
        }
      }

    }

    // Phase 6: Redirect if no matching route handlers
    if (!player) {
      return redirect("/");
    } else {
      return redirect(`/rooms/${player.currentRoom.id}`);
    }
  });
});

const port = 5000;

server.listen(port, () => console.log("Server is listening on port", port));
