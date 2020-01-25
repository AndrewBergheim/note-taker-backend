const express = require("express");
const path = require("path");
const fs = require("fs")
// establishing express and port number
let app = express();
let PORT = 8080;

// set server up to use express and handle post requests
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//establishing public directory
app.use(express.static("public"))


app.get("/api/notes", function(req, res){
    let dbParsed;
    //read db.json, return JSON of saved notes 
    fs.readFile("./db/db.JSON",function(err, data){
        if (err){
            console.log(err)
        }else{
            return res.json(JSON.parse(data))
        }
    })  
});

=
app.post("/api/notes", function(req, res){
    //receive new note, add to db.json, return note to client
    //let noteData = req.data;
  //  console.log(noteData)

});


app.delete("/api/notes/:id", function(req, res){
    //receive query with ID, delete note with specific ID
});

// get requests for starting HTML pages

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});


app.get("/*", function(req, res){
    res.sendFile(path.join(__dirname + "/public/index.html"));
});


//starting server
app.listen(PORT, function(){
    console.log("listening on " + PORT);
});