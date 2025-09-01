const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const GalleryImage = require('../../models/GalleryImage');

// @route   GET api/gallery
// @desc    Get all gallery images
// @access  Public
router.get('/', async (req, res) => {
    try {
        const images = await GalleryImage.find().sort({ date: -1 });
        res.json(images);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/gallery
// @desc    Add a new gallery image
// @access  Private
router.post('/', auth, async (req, res) => {
    const { imageUrl, category } = req.body;
    try {
        const newImage = new GalleryImage({
            imageUrl,
            category
        });
        const image = await newImage.save();
        res.json(image);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/gallery/:id
// @desc    Delete a gallery image
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let image = await GalleryImage.findById(req.params.id);
        if (!image) return res.status(404).json({ msg: 'Image not found' });

        await GalleryImage.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Image removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;