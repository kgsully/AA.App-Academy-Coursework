const { sendFormPage } = require("./routes");
const { parseBody } = require("./parse-body");
let server;

/******************************************************************************/
/******************* DO NOT CHANGE THE CODE ABOVE THIS LINE *******************/

// Your code here
const http = require('http');

server = http.createServer((req, res) => {
    // console.log('\n---------- Received a request ----------\n');
    // console.log(`Method: ${req.method}\n`);
    // console.log(`URL: ${req.url}\n`);
    // console.log('Headers:\n', req.headers);
    // console.log(`${req.method} ${req.url}`);

    let reqBody = '';
    req.on('data', (chunk) => {
        reqBody += chunk;
    });

    req.on('end', () => {
        if(reqBody) {
            let reqBodyObj = parseBody(reqBody);
            req.body = reqBodyObj;
        }

        sendFormPage(req, res); // needs to be called even if the request doesn't have a body
    });
});

const port = 5000;

server.listen(port, () => console.log('Successfully started the server on port', port));


/******************************************************************************/
/******************* DO NOT CHANGE THE CODE BELOW THIS LINE *******************/

module.exports = { server };
