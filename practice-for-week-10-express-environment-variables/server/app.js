const express = require('express');
const app = express();
// Your code here

// load the environment variables from the .env file - uncomment to use dotenv to load env file
// otherwise, use dotenv-cli to process the .env from the command line
// require('dotenv').config();

app.get('/', (req, res) => {
    res.send(process.env.SECRET_MESSAGE);
});

const port = process.env.PORT;
app.listen(port, () => console.log('Server is listening on port', port));
