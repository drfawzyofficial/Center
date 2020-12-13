// This model is related to Partner Schema
const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
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
    role: {
        type: String,
        required: [true, 'role is required'],
        trim: true,
        default: 'admin'
    }
})

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;

