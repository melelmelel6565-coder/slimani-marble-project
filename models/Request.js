const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'new' // e.g., new, contacted, completed
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('request', RequestSchema);