const http = require('http');

const dogs = [
  {
    dogId: 1,
    name: "Fluffy",
    age: 2
  }
];

let nextDogId = 2;

function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // assemble the request body
  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => { // request is finished assembly the entire request body
    // Parsing the body of the request depending on the Content-Type header
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

    /* ======================== ROUTE HANDLERS ======================== */

    // GET /dogs
    if (req.method === 'GET' && req.url === '/dogs') {
      // Your code here
      let resBody = JSON.stringify(dogs);

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(resBody);
      return res.end();
    }

    // GET /dogs/:dogId
    if (req.method === 'GET' && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/'); // ['', 'dogs', '1']
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Your code here
        let searchResult = dogs.find((element) => element.dogId === Number(dogId));
        if(searchResult) {
          const resBody = JSON.stringify(searchResult);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.write(resBody);
        } else {
          const resBody = JSON.stringify({error: "Dog Not Found"});
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.write(resBody);
        }
      }
      return res.end();
    }

    // POST /dogs
    if (req.method === 'POST' && req.url === '/dogs') {
      const { name, age } = req.body;
      // Your code here
      if(name && age) {
        const newDog = {
          dogId: getNewDogId(),
          name: name,
          age: age
        }

        dogs.push(newDog);

        const resBody = JSON.stringify(newDog);
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.write(resBody);
      } else {
        const resBody = JSON.stringify({error: "invalid new dog data"});
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.write(resBody);
      }

      return res.end();
    }

    // PUT or PATCH /dogs/:dogId
    if ((req.method === 'PUT' || req.method === 'PATCH')  && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Your code here
        const searchIndex = dogs.findIndex((element) => element.dogId === Number(dogId));
        console.log("Search Result:", searchIndex)
        const { name, age } = req.body;

        if(searchIndex >= 0 && name && age) {
          dogs[searchIndex].name = name;
          dogs[searchIndex].age = age;

          const resBody = JSON.stringify(dogs[searchIndex]);

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.write(resBody);
        } else {
          const resBody = JSON.stringify({error: "an error occured"});
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.write(resBody);
        }
      }
      return res.end();
    }

    // DELETE /dogs/:dogId
    if (req.method === 'DELETE' && req.url.startsWith('/dogs/')) {
      const urlParts = req.url.split('/');
      if (urlParts.length === 3) {
        const dogId = urlParts[2];
        // Your code here
        console.log(dogs);
        const searchIndex = dogs.findIndex((element) => element.dogId === Number(dogId));
        console.log("Search Result:", searchIndex);

        if(searchIndex >= 0) {
          dogs.splice(searchIndex, 1);

          const resBody = JSON.stringify({message: "Successfully deleted"});
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.write(resBody);
        } else {
          const resBody = JSON.stringify({error: "dog not found"});
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.write(resBody);
        }
      }
      console.log(dogs);
      return res.end();
    }

    // No matching endpoint
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    return res.end('Endpoint not found');
  });

});


if (require.main === module) {
    const port = 8000;
    server.listen(port, () => console.log('Server is listening on port', port));
} else {
    module.exports = server;
}
