const express = require("express");
const path = require("path")
// establishing express and port number
let app = express();
let PORT = 8080;

// set server up to use express and handle post requests
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// get requests for starting HTML pages

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});


app.get("/*", function(req, res){
    res.sendFile(path.join(__dirname + "/public/index.html"));
});


app.listen(PORT, function(){
    console.log("listening on " + PORT);
});