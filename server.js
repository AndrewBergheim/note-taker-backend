const express = require("express");
const path = require("path");
const fs = require("fs")
// establishing express and port number
let app = express();
let PORT = process.env.PORT || 8080;

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


app.post("/api/notes", function(req, res){
    //receive new note, add to db.json, return note to client
    let newNote = req.body
    //console.log(newNote)
    let dataTable;

    //parse existing data, create table from data, then add new data to table
    fs.readFile("./db/db.JSON", function(err, data){
        if (err){
            console.log(err)
        }
        else{
            dataTable = JSON.parse(data)
            newNote.id = dataTable.length
            dataTable.push(newNote)
            console.log(dataTable)
            //write new data to db file
            fs.writeFile("./db/db.JSON", JSON.stringify(dataTable), function(err){
                if (err){throw (err)}
                else{
                    console.log("successfully written to DB")
                }
            }).then(()=>{
                res.send("")
            })
        }
    })
});


app.delete("/api/notes/:id", function(req, res){
    //receive query with ID, delete note with specific ID (read db file, parse the table, remove it, rewrite db file)
    //console.log(req.params.id)
    let toDel = req.params.id;
    let dataTable;
    fs.readFile("./db/db.JSON", function(err, data){
        if (err){
            console.log(err)
        }
        else{
            dataTable = JSON.parse(data)
            dataTable.splice(toDel,1)
            console.log(dataTable)
            //write new data to db file
            fs.writeFile("./db/db.JSON", JSON.stringify(dataTable), function(err){
                if (err){throw (err)}
                else{
                    console.log("successfully written to DB")
                }
            });
        }
    })
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