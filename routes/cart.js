const { Router } = require("express");
const order = require('../models/checkout');
const User = require("../models/user");
const router = Router();

router.get('/cart', async (req, res) => {
  try {
    res.render('cart',{
      user: User,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})

router.get('/checkout', (req, res) => {



  return res.render("checkout")
})

router.get('/msz', (req, res) => {
  return res.render("msz")
})

router.post('/checkout', async (req, res) => {
  const { name, address, state, city, pincode } = req.body;
  await order.create({
    name,
    state,
    city,
    address,
    pincode
  })
  return res.render("msz")
})



module.exports = router;