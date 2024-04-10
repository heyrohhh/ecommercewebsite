const { Router } = require("express");
const Product = require("../models/product");
const User = require("../models/user");
const router = Router();



router.get('/prodetail', async (req, res) => {
    try {
       
        const products = await Product.find();
        res.render('prodetail', { products,
            user: User,});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



router.get('/prodetail/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

       

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render("prodetail", { product, 
            user: User, }); // Pass the product object to the template
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).send('Internal Server Error');
    }
});





module.exports = router;