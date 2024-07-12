const express = require('express');

const app = express();

app.get("/status", (req, res) => {
    res.send("Server is running!")
});

const port = 5000;
app.listen(port, () => console.log(`Server is  listening on port ${port}`));
