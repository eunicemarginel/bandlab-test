const { request, response } = require("express");
const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

app.get("/audio", (request, response) => {
    response.sendFile(__dirname + "/audio.html");
});

const listener = app.listen(8080, () => {
    console.log("Your server is running on port 8080");
  });