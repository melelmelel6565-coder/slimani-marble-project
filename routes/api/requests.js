const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Request = require('../../models/Request');

// @route   POST api/requests
// @desc    Create a new request
// @access  Public
router.post('/', async (req, res) => {
    const { name, phone, address, message } = req.body;
    try {
        const newRequest = new Request({
            name,
            phone,
            address,
            message
        });
        const request = await newRequest.save();
        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/requests
// @desc    Get all requests
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const requests = await Request.find().sort({ date: -1 }); // Newest first
        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/requests/:id
// @desc    Delete a request
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let request = await Request.findById(req.params.id);
        if (!request) return res.status(404).json({ msg: 'Request not found' });

        await Request.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Request removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;