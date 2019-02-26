const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



// make express look in the public directory for assets (css/js/img)
app.use(express.static("client/build"));


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


app.listen(port, () => console.log(`Listening on port ${port}`));