const express = require('express');
const router = express.Router();
const { PincodeServiceability } = require('../../models/models');

// Route for creating pincode serviceability
router.post('/', async (req, res) => {
  try {
    const { sourcePincode, destinationPincode } = req.body;

    const existingServiceability = await PincodeServiceability.findOne({ sourcePincode, destinationPincode });

    if (existingServiceability) {
      return res.status(400).json({ success: false, message: 'Serviceability for the given pincode pair already exists' });
    }

    const newServiceability = await PincodeServiceability.create({ sourcePincode, destinationPincode });
    res.status(201).json({ success: true, serviceability: { sourcePincode: newServiceability.sourcePincode, destinationPincode: newServiceability.destinationPincode } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
