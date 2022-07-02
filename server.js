const express = require("express");
// const db = require("./db/db.json");
const path = require('path');
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3001;
const { v4: uuidv4 } = require("uuid");
// const { dbdata } = require("./db/db.json");
// const { formatWithOptions } = require("util");
// express middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// beggining of get requests *shifted down get * b/c must be last
// creates get route for notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
// creates route for js
app.get("/api/notes", (req, res) => {n
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(JSON.parse(data));
        };
    });
});
// post is creating a new note
app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let newNotes = JSON.parse(data) || [];
            let noteID = uuidv4();
            const newNote = req.body;
            console.log(noteID);
            newNotes.push({...newNote, id: noteID});
            fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json("Successfully added note!");
                    console.log("Successfully added note!");
                }
            });
        };
    });
});
// deletes existing notes (currently all notes** need fix**)
app.delete("/api/notes/:id", (req, res) =>{
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let newNotes = JSON.parse(data) || [];
            const id = req.params.id;
            let deletedNote = newNotes.filter(note => {
                note.id !== id
            });
            fs.writeFile("./db/db.json", JSON.stringify(deletedNote), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json("Successfully deleted note!");
                    console.log("Successfully deleted note!");
                }
            })
        };
    });
});
//  catch all, creates route for notes and index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
// sets up server port listener
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});