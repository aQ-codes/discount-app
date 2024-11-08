import customerRoutes from './customer-routes.js'

// Function to initialize all routes
const initializeRoutes = (app) => {
    
  app.use('/api/customer', customerRoutes);

};

export default initializeRoutes;


