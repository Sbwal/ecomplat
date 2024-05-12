const express = require('express');
const router = express.Router();
const { Buyer } = require('../../models/models');

// Create buyer account
router.post('/', async (req, res) => {
    try {
        const { name, address } = req.body;
        const buyer = await Buyer.create({ name, address });
        res.json({ buyerId: buyer._id });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get buyer by ID
router.get('/:id', async (req, res) => {
    try {
        const buyer = await Buyer.findById(req.params.id);
        if (!buyer) throw new Error('Buyer not found');
        res.json(buyer);
    } catch (err) {
        res.status(404).json({ success: false, error: err.message });
    }
});

module.exports = router;
