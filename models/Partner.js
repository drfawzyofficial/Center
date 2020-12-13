// This model is related to Partner Schema
const mongoose = require('mongoose');
const partnerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Fullname is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'User phone number is required'],
        unique: true
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim:  true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: [true, 'Gender is required'],
        trim: true
    },
    avatar: {
        type: String,
        required: true,
        default: 'http://localhost:3000/assets/uploads/partnerAvatar.PNG'
    },
    partnerApp: {
        type: String,
        enum: ['underApp', 'refusedApp', 'acceptedApp'],
        default: 'underApp'
    },
    bio: {
        type: String,
        required: false,
        default: "موقع درسلي هو موقع يتيج سهولة التواصل بين المعلم والطلاب من المنزل"
    },
    role: {
        type: String,
        required: [true, 'role is required'],
        trim: true,
        default: 'partner'
    },
    students: {
        type: Array,
        required: false
    }
})

const Partner = mongoose.model('Partner', partnerSchema);
module.exports = Partner;

