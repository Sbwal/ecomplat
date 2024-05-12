const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  address: { type: String, required: true },
  pincode: { type: String, required: true }
});

// Buyer Schema
const buyerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: addressSchema,
    required: true
  }
});

// Product Schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  inventory: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  pickupAddress: {
    type: addressSchema,
    required: true
  }
});

// PincodeServiceability Schema
const pincodeServiceabilitySchema = new Schema({
  sourcePincode: {
    type: String,
    required: true
  },
  destinationPincode: {
    type: String,
    required: true
  }
});

// Order Schema, ref for Buyer and Product
const orderSchema = new Schema({
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: 'Buyer',
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  paymentMode: {
    type: String,
    enum: ['prepaid', 'cod'],
    required: true
  }
});

const Buyer = mongoose.model('Buyer', buyerSchema);
const Product = mongoose.model('Product', productSchema);
const PincodeServiceability = mongoose.model('PincodeServiceability', pincodeServiceabilitySchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = {
  Buyer,
  Product,
  PincodeServiceability,
  Order
};
