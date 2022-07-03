const Cart = require("../models/Cart");
const { verifyTokenAndAuthorize, verifyTokenAndAdmin } = require("./verifyTokens");

const router = require("express").Router();

// Create
router.post("/",verifyTokenAndAuthorize, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedProd = await newCart.save();
        res.status(201).json(savedProd);
    } catch (error) {
        if(error) res.status(500).json(error);
    }
});


// Update.
router.put("/:id",verifyTokenAndAuthorize, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,{
                $set: req.body
            },
            {new: true}
        );
        res.status(200).json("Cart was updated.");
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete.
router.delete("/:id", verifyTokenAndAuthorize, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart deleted.");
    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

// Get user 1 Cart by id.
router.get("/find/:userId",verifyTokenAndAuthorize, async (req, res) => {
    try {
        const cart = await Cart.findOne({
            userId: req.params.userId
        });
        res.status(200).json(cart);

    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

// Get All Cart.
router.get("/", verifyTokenAndAdmin,async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

module.exports = router