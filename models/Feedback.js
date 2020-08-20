const mongoose = require('mongoose');
let feedbackchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    }
}, { timestamps: true });
let Feedback = mongoose.model('Feedback', feedbackchema);
module.exports = Feedback;