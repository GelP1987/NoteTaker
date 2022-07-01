const express = require("express");
const path = require('path');
const app = express();
const PORT = 3001;
const db = require('./db/db.json');

app.use(express.static("public"));

app.get('./notes.html', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  app.get("./api/notes", (req, res) => {
      res.json(db);
      });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
