//importing Mongoose DB
const mongoose = require("mongoose");
const uri = "mongodb+srv://test:annas1234@cluster0.xzdnd.mongodb.net/?retryWrites=true&w=majority/TestDB";


//init instance of mongoo and passing the path to the database
mongoose.connect(uri).then(() =>{
console.log(`connection established successfully`);
}).catch((e) =>{
    console.log(`connection not established successfully`);
})

