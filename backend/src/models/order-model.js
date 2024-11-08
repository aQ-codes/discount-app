import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productCode: { type: String, required: true }, 
  quantity: { type: Number, required: true, default: 1 },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;


