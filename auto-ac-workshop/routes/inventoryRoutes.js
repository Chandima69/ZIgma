const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Get all inventory items
router.get('/', async (req, res) => {
    try {
        const inventoryItems = await Inventory.find();
        res.status(200).json(inventoryItems);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch inventory items', details: err });
    }
});

// Add new inventory item
router.post('/', async (req, res) => {
    const { itemName, quantity, price } = req.body;

    if (!itemName || !quantity || !price) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newItem = new Inventory({ itemName, quantity, price });
        await newItem.save();
        res.status(201).json({ message: 'Inventory item added successfully', item: newItem });
    } catch (err) {
        res.status(500).json({ error: 'Error adding inventory item', details: err });
    }
});

// Update an existing inventory item
router.put('/:id', async (req, res) => {
    const { itemName, quantity, price } = req.body;

    if (!itemName || !quantity || !price) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const updatedItem = await Inventory.findByIdAndUpdate(
            req.params.id, 
            { itemName, quantity, price }, 
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.status(200).json({ message: 'Inventory item updated successfully', item: updatedItem });
    } catch (err) {
        res.status(500).json({ error: 'Error updating inventory item', details: err });
    }
});

// Delete an inventory item
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.status(200).json({ message: 'Inventory item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting inventory item', details: err });
    }
});

module.exports = router;
