const http = require('http');

let nextDogId = 1;

function getNewDogId() {
  const newDogId = nextDogId;
  nextDogId++;
  return newDogId;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  // When the request is finished processing the entire body
  req.on("end", () => {
    // Parsing the body of the request
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
      console.log(req.body);
    }
    // Do not edit above this line

    // define route handlers here

    // GET METHODS
    if(req.method === "GET") {
      // dog club
      if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        return res.end("Dog Club");
      }

      // dogs index
      if (req.url === '/dogs') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Dogs index');
      }

      // dog ID
      if (req.url.startsWith('/dogs')) {

        const reqArr = req.url.split('/');

        if (reqArr.length === '/dogs/:dogID'.split('/').length) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');

          let urlEnd = reqArr.pop();
          if(urlEnd === 'new') {
            return res.end('Dog create form page');
          } else return res.end(`Dog details for ${urlEnd}`);
        }

        if (reqArr.length === '/dogs/:dogID/edit'.split('/').length) {
          let urlEnd = reqArr.pop();
          let  id = reqArr.pop();
          if (urlEnd === 'edit') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            return res.end(`Dog edit form page for ${id}`);
          }
        }
      }
    }

    // POST METHODS
    if(req.method === 'POST') {

      if (req.url === '/dogs') {
        let newDogID = getNewDogId();
        res.statusCode = 302;
        res.setHeader('Location', `/dogs/${newDogID}`);
        return res.end('');
      }
    }


    // Do not edit below this line
    // Return a 404 response when there is no matching route handler
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('No matching route handler found for this endpoint');
  });
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
