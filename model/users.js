const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    fullName:{
        required: true,
        type: String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    createdOn:{
        required:true,
        type:Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;