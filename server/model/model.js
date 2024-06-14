const mongoose = require('mongoose');
const { Schema } = mongoose;
require("dotenv").config();

main().catch(err => console.log("ERROR IN CONNECTING"));


async function main() {
    const response = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to the database successfully");
}

const messageSchema = new Schema({
    content : {
        type : String,
        required : true
    },
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    username : {
        type : String,
        required : true
    },
    grpId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Group'
    },
    hr_sent : { 
        type : Number,
        default : new Date().getHours(),
    },
    min_sent : {
        type : Number,
        default : new Date().getMinutes(),
    }
});

const groupSchema = new Schema({
    grpName : {
        type : String,
        required : true,
    },
    grpMembers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        default : [],
    }],
    goal : {
        type : String,
        required : true,
    },
    leader : {
        type : String,
        required : true,
    },
    members : {
        type : Number,
        default : 1,
    },
    maxMembers : {
        type : Number,
        default : 50,
    },
    attendence : {
        type : String,
        required : true,
    },
    started_on : {
        type : Date,
        default : Date.now,
    },
    description : {
        type : String,
        required : true,
    },
    messages : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Message'
    }]
});

const userSchema = new Schema({
    username : String,
    password : String,
    firstName : String,
    lastName : String,
    organization : String,
    email_id : String,
    registered_date : Date,
    description : String,
    subjects : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Subject"
    }],
    groups : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Group'
    }]
});

const subjectSchema = new Schema({
    subject_name : {
        type : String,
        required : true,
    },
    hr_spent : {
        type : String,
        default : "00",
    },
    min_spent : {
        type : String,
        default : "00",
    },
    sec_spent : {
        type : String,
        default : "00",
    },
    is_active : {
        type : Boolean,
        default : false,
    }
});

const User = mongoose.model('User', userSchema);
const Subjects = mongoose.model("Subject", subjectSchema);
const Group = mongoose.model("Group", groupSchema);
const Message = mongoose.model("Message", messageSchema);

module.exports = {
    User, Subjects, Group, Message
}



