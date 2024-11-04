import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
