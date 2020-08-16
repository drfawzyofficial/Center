const mongoose = require('mongoose');

const options = { discriminatorKey: 'kind' };

const accountSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Fullname is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: /^\w+([-+.]\w+)*@((yahoo|gmail)\.com)$/
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
        default: 'avatar.jpg'
    },
    accountVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    accountActive: {
        type: Boolean,
        required: true,
        default: true
    },
    avatar: {
        type: String,
        required: true,
        default: 'avatar.jpg'
    },
    fromStatus: {
        type: String,
        required: true,
        default: 'reservation'
    },
    accountVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    accountActive: {
        type: Boolean,
        required: true,
        default: true
    },
    role: {
        type: String,
        enum: ['User', 'Instructor'],
        required: true
    },
    bio: {
        type: String,
        required: false,
        default: `The Bio is an important field such that you will write everything about you and this will enhance your experience with Ostazy Application`
    },  
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

const Account = mongoose.model('Account', accountSchema);

const User = Account.discriminator('User',
  new mongoose.Schema({
    tags: {
        type: [String],
        required: false,
    }
  }, options));

const Instructor = Account.discriminator('Instructor',
  new mongoose.Schema({
    specialized: {
        type: String,
        required: true,
        default: 'Programming' 
    }
  }, options));



module.exports = { User, Instructor }
