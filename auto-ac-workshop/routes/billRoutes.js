const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

// Get all bills
router.get('/', async (req, res) => {
    try {
        const bills = await Bill.find();
        res.status(200).json(bills);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch bills', details: err });
    }
});

// Create a new bill
router.post('/', async (req, res) => {
    const { service, cost } = req.body;

    if (!service || !cost) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newBill = new Bill({ service, cost });
        await newBill.save();
        res.status(201).json({ message: 'Bill created successfully', bill: newBill });
    } catch (err) {
        res.status(500).json({ error: 'Error creating bill', details: err });
    }
});

// Get a specific bill by ID
router.get('/:id', async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);
        if (!bill) {
            return res.status(404).json({ error: 'Bill not found' });
        }
        res.status(200).json(bill);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching bill', details: err });
    }
});

// Update a bill (e.g., change service or cost)
router.put('/:id', async (req, res) => {
    const { service, cost } = req.body;

    if (!service || !cost) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const updatedBill = await Bill.findByIdAndUpdate(
            req.params.id, 
            { service, cost }, 
            { new: true }
        );
        if (!updatedBill) {
            return res.status(404).json({ error: 'Bill not found' });
        }
        res.status(200).json({ message: 'Bill updated successfully', bill: updatedBill });
    } catch (err) {
        res.status(500).json({ error: 'Error updating bill', details: err });
    }
});

// Delete a bill
router.delete('/:id', async (req, res) => {
    try {
        const deletedBill = await Bill.findByIdAndDelete(req.params.id);
        if (!deletedBill) {
            return res.status(404).json({ error: 'Bill not found' });
        }
        res.status(200).json({ message: 'Bill deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting bill', details: err });
    }
});

module.exports = router;
