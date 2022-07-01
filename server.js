const express = require("express");
const path = require('path');
const app = express();
const PORT = 3001;
const db = require('./db/db.json');
const fs = require("fs")
const { note } = require('./db/db.json');

app.use(express.static("public"));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  app.get("/api/notes", (req, res) => {
      res.json(db);
      });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", (req, res) => {
  req.body.id = note.length.toString();
    if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    const notes = createNewNote(req.body, note);
    res.json(notes);
  }
});

