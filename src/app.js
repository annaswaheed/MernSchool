//Importing EJS
const express = require("express");

const path = require("path");
//Init an instance of EJS
const app = express();
const hbs = require("hbs");
//calling functions from conn.js to connect to DB
require("./db/conn");


//Setting up env port so we can host it and port changes dynamically depending on the enviorment
const port = process.env.PORT || 3000


const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");

//if used partials code uncomment this part
const partials_path = path.join(__dirname, "../templates/partials");


app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

//Get Method to requests for root /
app.get("/", (req, res) => {

    //res.send("Hello From The Backend Side")
    res.render("index")
})

app.get("/register", (req, res) => {

    //res.send("Hello From The Backend Side")
    res.render("register")
})

app.listen(port, () => {

    console.log(`server is running at port no ${port}`);
})