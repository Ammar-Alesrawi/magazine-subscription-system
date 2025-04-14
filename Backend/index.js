require("dotenv").config();
require("../Backend/src/jobs/subscriptionJob");
require("../Backend/src/jobs/reportJob");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("../Backend/src/routes/index");

const app = express();

// Middleware
app.use(express.json()); // Enable JSON body parsing
app.use(morgan("dev")); // Log requests to the console
app.use(cors()); // Allow cross-origin requests

// Routes
app.use(routes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
