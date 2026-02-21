const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Session middleware
app.use("/customer", session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

// Authentication middleware
app.use("/customer/auth/*", function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Missing Authorization Header" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "fingerprint_customer", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
});

const PORT = 5000;

// Route bindings
app.use("/customer", customer_routes);
app.use("/books", genl_routes);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));