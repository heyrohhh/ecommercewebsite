const express = require('express');
const path = require('path');
const userRoute = require('./routes/user');
const productRoutem = require("./routes/productr");
const mongoose = require('mongoose')
const Product = require("./models/product");
const porduct = require("./routes/productDetail");
const cartRoute = require("./routes/cart");
const Order = require("./models/checkout");
const cookiePaser = require("cookie-parser");
const User = require("./models/user");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");


// setting port
const app = express();
const port = 3030;  
// connecting mongodb
mongoose
  .connect('mongodb://127.0.0.1:27017/FashionGrow')
  .then((e) => console.log("MongoDB Connected"));
//setting view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"));
// set static for public
app.use(express.static(path.resolve("./public")));

app.use('/',cartRoute)

app.get('/cart/checkout', (req,res) =>{
  return res.render("checkout")
})


app.get('/', async (req, res) => {
  try {
   
    const products = await Product.find({});
    res.render('home', { 
      products , 
     user: User,
     }); // Passing found user to the template
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



app.get('/admin/orders', async (req,res) =>{
  try {
     const orders = await Order.find({});
     res.render('admin', {orders})
  } catch (error) {
    window.document.write("There is some Problem")
  }
})



app.use('/user', userRoute)
app.use('/',porduct);

app.use("/admin", productRoutem);

app.listen(port, () => console.log(`Web is running on server:${port}`))