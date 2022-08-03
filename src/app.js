//Importing EJS
const express = require("express");

global.reg ="";

global.user ="";
var alert = require('alert');
const path = require("path");
//Init an instance of EJS
const app = express();
const hbs = require("hbs");
const { default: mongoose } = require("mongoose");

console.log("connection function call")
//calling functions from conn.js to connect to DB
require("./db/conn");
const Register = require("./models/registers");
const async = require("hbs/lib/async");
const cli = require("nodemon/lib/cli");

const nodemailer = require("nodemailer");

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
app.get("/", async (req, res) => {
   
    //res.send("Hello From The Backend Side")
    res.render("index");
})


app.post("/", async (req, res) => {
    
    const {eaddress, password} = req.body;
    var pword = req.body.password;
    //res.send("Hello From The Backend Side")
    try{
        const test = await Register.findOne(
            {
              $or: [
                     {eaddress:eaddress},
                     {family:{$elemMatch:{email:eaddress}}}
                   ]
            }
         );

        
        var flag =0;
        for(var i = 0; i < test.family.length; i++){
            if(test.password == pword || test.family[i].password == pword)
            {
                //res.json({"messeage": "User has logged in succesfully"});
                user = test;
                //res.render("user", { test: JSON.stringify(test)});
                flag=0;
                res.redirect('/user');

            }
            else{
                flag=2;
            }
        }
        if(flag == 2){
            alert('invalid Credentials') 
        }
        
    }
    catch(error){
        //const test = await Register.findOne({family:{$elemMatch:{email:eaddress}}});
        console.log(error)
        alert("Wrong Credentials") ;
    }
})

app.get("/user", async (req, res) => {

    var test = await user;
    res.render("user", { test: JSON.stringify(test)});
})

app.post("/user",  async (req, res) => {

    var id = req.body.id;

    console.log("hello")
    var results = await Register.updateOne({eaddress:user.eaddress},{$pull: {House : {_id: id}}});
    console.log(results);
    console.log("done removing")
    //res.writeHead(301, {"Location": "/"});
})

app.get("/home", async (req, res) => {

    //res.send("Hello From The Backend Side")
    res.render("home");
})

app.get("/aboutus", async (req, res) => {

    //res.send("Hello From The Backend Side")
    res.render("aboutus");
})

app.get("/register", (req, res) => {
    //res.send("Hello From The Backend Side")
    res.render("register")
    
})

app.post("/register", async (req, res) => {
    try{
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

        const emailing = {
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
        }
        const result = await UserRegister.save();

        reg = emailing;
        await sendmail();
        //console.log(`A document was inserted with the _id: ${result.insertedId}`);
       res.status(201);
       res.writeHead(301, {"Location": "/"});
       return res.end();  
    } catch(error){
        res.status(400).send(error);
    }
})

app.get("/addp", (req, res) => {
    //res.send("Hello From The Backend Side")
    res.render("addproperty");
    
})

app.post("/addp", async (req, res) => {
    //res.send("Hello From The Backend Side")
    console.log(req.body.name)
    console.log(req.body.address)
    console.log(req.body.picture)
    console.log(req.body.video)

    // name:String,
    // address:String,
    // Picture:String,
    // Video:String

   
    var newhouse = {
        name : req.body.name,
        address : req.body.address,
        picture : req.body.picture,
        video : req.body.video,
        cost : req.body.cost,
        city : req.body.city,
        state : req.body.state,
        description : req.body.description
    };

    //adding properties into database
    const rcheck = await Register.updateOne(
        { eaddress: user.eaddress }, 
        { $addToSet: { House: newhouse } }
    );
    
    //updating user obj
    user = await Register.findOne({eaddress:user.eaddress});
    
    console.log("After the Update")
    console.log(user)
    //user is global, storing the user object
    //{{reference to html tag:variable being passed}}
    res.redirect('/user');
})

app.get("/logout", (req, res) => {
    //res.send("Hello From The Backend Side")
    user = null;
    console.log(user);
    res.render("index");
    
})

app.get("/family", async (req, res) => {
    //res.send("Hello From The Backend Side")
    var test = await user;
    res.render("family", { test: JSON.stringify(test)});
    
})

app.post("/family", async (req, res) => {
    //res.send("Hello From The Backend Side")
    console.log(req.body.name)
    console.log(req.body.address)
    console.log(req.body.picture)
    console.log(req.body.video)

    // name:String,
    // address:String,
    // Picture:String,
    // Video:String

   
    var newhouse = {
        name : req.body.name,
        address : req.body.address,
        picture : req.body.picture,
        video : req.body.video,
        cost : req.body.cost,
        city : req.body.city,
        state : req.body.state
    };

    //adding properties into database
    const rcheck = await Register.updateOne(
        { eaddress: user.eaddress }, 
        { $addToSet: { House: newhouse } }
    );
    
    //updating user obj
    user = await Register.findOne({eaddress:user.eaddress});
    
    console.log("After the Update")
    console.log(user)
    //user is global, storing the user object
    //{{reference to html tag:variable being passed}}
    res.redirect('/user');
})


app.get("/profile", (req, res) => {
    //res.send("Hello From The Backend Side")
    res.render("profile");
    
})

app.post("/profile", async (req, res) => {
    //res.send("Hello From The Backend Side")
    console.log(req.body.name)
    console.log(req.body.address)
    console.log(req.body.picture)
    console.log(req.body.video)

    // name:String,
    // address:String,
    // Picture:String,
    // Video:String

   
    var newhouse = {
        name : req.body.name,
        address : req.body.address,
        picture : req.body.picture,
        video : req.body.video,
        cost : req.body.cost,
        city : req.body.city,
        state : req.body.state
    };

    //adding properties into database
    const rcheck = await Register.updateOne(
        { eaddress: user.eaddress }, 
        { $addToSet: { House: newhouse } }
    );
    
    //updating user obj
    user = await Register.findOne({eaddress:user.eaddress});
    
    console.log("After the Update")
    console.log(user)
    //user is global, storing the user object
    //{{reference to html tag:variable being passed}}
    res.redirect('/user');
})

app.get("/afam", (req, res) => {
    //res.send("Hello From The Backend Side")
    res.render("afam");
    
})

app.post("/afam", async (req, res) => {
    //res.send("Hello From The Backend Side")

    var newfamily = {
        firstn : req.body.firstn,
        lastn : req.body.lastn,
        email : req.body.email,
        password : req.body.password,
        phone : req.body.phone,
        relation : req.body.relation,
    };

    //adding properties into database
    const rcheck = await Register.updateOne(
        { eaddress: user.eaddress }, 
        { $addToSet: { family: newfamily } }
    );
    
    //updating user obj
    user = await Register.findOne({eaddress:user.eaddress});
    
    console.log("After the Update")
    console.log(user)
    //user is global, storing the user object
    //{{reference to html tag:variable being passed}}
    res.redirect('/user');
})


app.listen(port, () => {

    console.log(`server is running at port no ${port}`);
})


async function sendmail(){
  //let testAccount = await nodemailer.createTestAccount();
    console.log("function called");
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "annaswaheed@gmail.com", // generated ethereal user
      pass: "wQ2YSxC6dO1tMkjT", // generated ethereal password
    },
  });

 
  var content = "<b>Welcome To SunnySide <br > Below is your username and password </b> <br> <p> email:" + reg.eaddress + " <br> password:" + reg.password+" <br> thank you for choosing us!</p>" ;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'noreply@sunnysideapp.com', // sender address
    to: reg.eaddress,
    //reg.eaddress, // list of receivers
    subject: "Hello" + reg.lastname, // Subject line
    text: "Below is your username and password\n" + reg.eaddress +"\n" + reg.password +"\n", // plain text body
    html: content, // html body
  });

  alert('Credentials Sent to the email address') 
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}