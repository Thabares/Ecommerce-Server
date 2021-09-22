const router = require('express').Router();
const user = require('../models/User');
const CryptoJS = require('crypto-js');

// Register
router.post('/register', async (req, res) => {
  const newUser = new user({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
