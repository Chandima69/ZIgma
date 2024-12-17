const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST route for user sign up
router.post('/signUp', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Error creating user', details: err });
    }
});

module.exports = router;
