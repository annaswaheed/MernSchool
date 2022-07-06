//Importing EJS
const express = require("express");

const path = require("path");
//Init an instance of EJS
const app = express();
const hbs = require("hbs");
const { default: mongoose } = require("mongoose");
//calling functions from conn.js to connect to DB
require("./db/conn");
const Register = require("./models/registers");
const async = require("hbs/lib/async");
const cli = require("nodemon/lib/cli");

//Setting up env port so we can host it and port changes dynamically depending on the enviorment
const port = process.env.PORT || 3000


const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");

//if used partials code uncomment this part
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
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

app.post("/register", async (req, res) => {
    try{
        // console.log(req.body.cpassword);
        // console.log(req.body.password);
        // console.log(req.body.fname);
        // console.log(req.body.lname);
        // console.log(req.body.address1);
        // console.log(req.body.address2);
        // console.log(req.body.state);
        // console.log(req.body.zip);
        // console.log(req.body.city);
        // console.log(req.body.eaddress);
        // console.log(req.body.phone);
        // console.log(req.body.age);

        const UserRegister = new Register ({
            firstname   : req.body.fname,
            lastname    : req.body.lname,
            address1    : req.body.address1,
            address2    : req.body.address2,
            state       : req.body.state,
            zip         : req.body.zip,
            city        : req.body.city,
            eaddress    : req.body.eaddress,
            phone       : req.body.phone,
            gender      : req.body.gender,
            password    : req.body.password,
            cpassword   : req.body.cpassword,
        })
        const result = await UserRegister.save();

        //console.log(`A document was inserted with the _id: ${result.insertedId}`);

       res.status(201).render(index);
    } catch(error){
        res.status(400).send(error);
    } 

    // try{
    //     var password = req.body.password;
    //     var cpassword = req.body.cpassword;

    //     if(password === cpassword){
    //         console.log(res.body.fname);
    //         console.log("password matched")
    //     }
    //     else{
    //         console.log("wrong password");
    //         alert("Password mismatch");
    //         res.send("Password is not matched, Please check the password again");
    //     }
    // } catch(error){
    //     res.status(400).send(error);
    //     console.log("");
    // } 
})

app.listen(port, () => {

    console.log(`server is running at port no ${port}`);
})