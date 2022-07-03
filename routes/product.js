const Product = require("../models/Product");
const { verifyTokenAndAuthorize, verifyTokenAndAdmin } = require("./verifyTokens");

const router = require("express").Router();

// Create
router.post("/",verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product({
        title: req.body.title,
        desc: req.body.desc,
        img: req.body.img,
        cat: req.body.category,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
    });
    try {
        const savedProd = await newProduct.save();
        res.status(201).json(savedProd);
    } catch (error) {
        if(error) res.status(500).json(error);
    }
});


// Update.
router.put("/:id",verifyTokenAndAuthorize, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,{
                $set: req.body
            },
            {new: true}
        );
        res.status(200).json("Product was updated.");
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete.
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product deleted...");
    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

// Get 1 product by id.
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);

    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

// Get All product.
router.get("/", async (req, res) => {
    const qnew = req.query.new;
    const qcat = req.query.category;
    try {
        let products;
        if(qnew){
            products = await Product.find().sort({createdAt: -1}).limit(5);
        } else if(qcat){
            products = await Product.find({
                cat : {
                    $in: [qcat]
                }
            }).limit(5);
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

module.exports = router