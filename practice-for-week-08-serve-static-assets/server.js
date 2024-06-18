const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Your code here
  console.log(`${req.method} ${req.url}`);

  if(req.method === 'GET' && req.url.startsWith('/static')) {
    if (req.url.startsWith('/static')) {
      let reqArr = req.url.split('/');
      let reqPath = reqArr.slice(2);
      let fileExtension = reqPath[reqPath.length - 1].split('.').pop();

      let assetPath = './assets/' + reqPath.join('/');

      const assetFile = fs.readFileSync(assetPath);

      res.statusCode = 200;
      if(fileExtension === 'css') {
        res.setHeader('Content-Type', 'text/css');
      } else if (fileExtension === 'jpg') {
        res.setHeader('Content-Type', 'image/jpg');
      }

      return res.end(assetFile);

    }
  }

  // Default to serving the HTML page
  const htmlPage = fs.readFileSync('./index.html', 'utf-8');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  return res.end(htmlPage);

  // // Return a 404 response when there is no matching route handler
  // res.statusCode = 404;
  // res.setHeader('Content-Type', 'text/plain');
  // return res.end('No matching route handler found for this endpoint');

});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
