const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lastname:{
        type:String,
  },
   
    profileImage: {
        type: String
    },
    number:{
        type: String,
    },
    email:{
        type: String,
    },
    status:{
        type:String,
    },
    education:{
        type:String,
    },
    adress:{
        type:String,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;
