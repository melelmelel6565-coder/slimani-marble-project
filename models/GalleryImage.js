const mongoose = require('mongoose');

const GalleryImageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true // e.g., kitchens, floors, stores
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('galleryImage', GalleryImageSchema);