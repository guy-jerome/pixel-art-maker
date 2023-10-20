const express = require('express');
const app = express();

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define additional routes and middleware here

const port = 80
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});