const { json } = require("express/lib/response");
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    address1:{
        type:String,
        required:true
    },
    address2:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    eaddress:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    House: 
    [
        {
            name:String,
            city:String,
            zip:String,
            state:String,
            address:String,
            picture:String,
            video:String,
            cost:String,
            description:String
        }
    ],
    family: 
    [
        {
            firstn:String,
            lastn:String,
            email:String,
            password:String,
            phone:String,
            relation:String,
        }
    ]
})

const Register = new mongoose.model("userRegister", clientSchema);

module.exports = Register;