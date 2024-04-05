const express = require('express');
const router = express.Router();
const greview = require("../model/greview");

// Middleware to parse JSON bodies
router.use(express.json({ limit: '10mb' }));

let addCount = 0;
let updateCount = 0;

// Endpoint to handle root request
router.get('/', (req, res) => {
    res.send('Hello world from router');
});

// Add a new review
router.post('/greview', async(req, res) => {
    const { paragraph, name, image } = req.body;

    if (!paragraph || !name || !image) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        const userExist = await greview.findOne({ name: name });

        if (userExist) {
            return res.status(422).json({ error: 'User already exists' });
        }

        const newUser = new greview({ paragraph, name, image });
        await newUser.save();

        addCount++; // Increment add count

        res.status(201).json({ message: 'review successfully added' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add review' });
    }
});

// Update a review by ID
router.put('/update/greview/:id', async(req, res) => {
    const { paragraph, name, image } = req.body;
    const { id } = req.params;

    if (!paragraph || !name || !image) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        const updatedUser = await greview.findByIdAndUpdate(
            id, { paragraph, name, image }, { new: true } // Return updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'Review not found' });
        }

        updateCount++; // Increment update count

        res.status(200).json({ message: 'review updated successfully', user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Get all reviews
router.get('/greview', async(req, res) => {
    try {
        const reviews = await greview.find();

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ error: 'No reviews found' });
        }

        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// Count API to show number of times add and update endpoints are called
router.get('/api/count', (req, res) => {
    res.status(200).json({ addCount, updateCount });
});

module.exports = router;