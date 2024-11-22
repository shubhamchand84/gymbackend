// models/Join.js
const mongoose = require('mongoose');

const joinSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    // Add other fields as needed based on your original JSON data structure
    phone: { type: String },
    plan: { type: String, required: true }, 
    message: { type: String },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },  // Numeric input for Weight (in Kg)
    height: { type: Number, required: true },  // Numeric input for Height (in cm)
    gender: { type: String },
    dateJoined: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Join', joinSchema);
