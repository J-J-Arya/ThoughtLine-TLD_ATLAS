// const app = require('./app');
// require('dotenv').config();

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// -----------------------------------------------------------------------------------------------

// const app = require('./app');
// require('dotenv').config();

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

require("dotenv").config();
const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

