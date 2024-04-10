const { Router } = require("express");
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");
const router = Router();

router.get('/addProduct', (req, res) => {
    return res.render('addProduct')
})
router.get('/prodetail', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('prodetail', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

router.get('/prodetail/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render("prodetail", { product }); // Pass the product object to the template
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).send('Internal Server Error');
    }
});




router.post("/prodetail", upload.single("Pimg"), async (req, res) => {
    const { Pname, Pdiscripton, Pprice, Pdetail, Pcode, } = req.body;
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        await Product.create({
            Pname,
            Pdiscripton,
            Pprice,
            Pdetail,
            Pcode,
            Pimg: `/uploads/${req.file.filename}`,
        });
        return res.redirect(`/`);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});





module.exports = router;