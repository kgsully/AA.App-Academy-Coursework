const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('GET / This is the root URL');
});

app.use((req, res, next) => {
  const error = new Error();
  error.statusCode = 404;
  error.message = "Error: Sorry, the requested resource cannot be found";
  next(error);
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({message: err.message, statusCode: err.statusCode});

});

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
