import express from "express";
import cors from 'cors';
import { connect } from "./config/db-config.js";
import initializeRoutes from './routes/index.js'; 
import seedProducts from "./products/seed-products.js";

const app = express();
const PORT = 8080;

app.use(cors());

// Middleware
app.use(express.json()); //for parsing

// Connect to MongoDB
connect();

seedProducts()

// Initialize all routes
initializeRoutes(app);

// Start the server
app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`)
})








