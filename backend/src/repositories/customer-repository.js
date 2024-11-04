import Customer from "../models/customer-model.js";
import bcrypt from 'bcrypt';

class CustomerRepository {
  // Create a new user with hashed password
  async createCustomer(email, password) {
    console.log("entered customer register repository");
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = new Customer({
      email,
      password: hashedPassword,
    });

    return await customer.save();
  }

  // Find a customer by email
  async findCustomerByEmail(email) {
    return await Customer.findOne({ email });
  }
}

export default new CustomerRepository();
