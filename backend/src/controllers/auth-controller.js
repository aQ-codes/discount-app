import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Import JWT library
import customerRepository from '../repositories/customer-repository.js';

const customerLogin = async (req, res) => {
  console.log("entered customer signin");
  const { email, password } = req.body;

  try {
    const customer = await customerRepository.findCustomerByEmail(email);
    if (!customer) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ customerId: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token to client in response
    return res.status(200).json({ success: true, token });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export default customerLogin;
