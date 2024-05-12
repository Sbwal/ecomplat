// routes/v1/orderRoutes.js

const express = require('express');
const router = express.Router();
const { Product, Order, PincodeServiceability, Buyer } = require('../../models/models');

// Route for creating an order
router.post('/', async (req, res) => {
  try {
    const { buyerId, productId, quantity, paymentMode } = req.body;

    
    // Check if the product exists and has sufficient inventory
    const product = await Product.findById(productId);
    if(!product) {
      return res.status(400).json({success: false, message: 'Product not Found'})
    }
    
    if (!product || product.inventory < quantity) {
      return res.status(400).json({ success: false, message: 'Order failed because product stock is insufficient' });
    }
    
    const buyer = await Buyer.findById(buyerId);
    if(!buyer) {
      return res.status(400).json({success: false, message: 'Buyer not Found'})
    }

    // Check if the pincode is serviceable
    const pincodeServiceability = await PincodeServiceability.findOne({
      sourcePincode: product.pickupAddress.pincode,
      destinationPincode: buyer.address.pincode
    });
    if (!pincodeServiceability) {
      return res.status(400).json({ success: false, message: 'Order failed because pincode is unserviceable' });
    }

    // Create the order
    const order = await Order.create({
      buyerId,
      productId,
      quantity,
      paymentMode
    });

    // Update product inventory
    product.inventory -= quantity;
    await product.save();

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
