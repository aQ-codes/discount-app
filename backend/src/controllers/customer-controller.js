import customerRepository from '../repositories/customer-repository.js';

const customerRegister = async (req, res) => {
  console.log("entered customer register");
  const { email, password } = req.body;

  try {
    const existingCustomer = await customerRepository.findCustomerByEmail(email);
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    await customerRepository.createCustomer(email, password);
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error("Server error", err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export default customerRegister;
