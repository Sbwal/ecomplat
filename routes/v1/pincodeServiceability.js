const express = require('express');
const router = express.Router();
const { PincodeServiceability } = require('../../models/models');

// Route for creating pincode serviceability
router.post('/pincode-serviceability', async (req, res) => {
  try {
    const { sourcePincode, destinationPincode } = req.body;

    const existingServiceability = await PincodeServiceability.findOne({ sourcePincode, destinationPincode });

    if (existingServiceability) {
      return res.status(400).json({ message: 'Serviceability for the given pincode pair already exists' });
    }

    const newServiceability = await PincodeServiceability.create({ sourcePincode, destinationPincode });
    res.status(201).json({ serviceability: newServiceability });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
