const Order = require("../models/Order");
const { verifyTokenAndAuthorize, verifyTokenAndAdmin } = require("./verifyTokens");

const router = require("express").Router();

// Create
router.post("/",verifyTokenAndAuthorize, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedProd = await newOrder.save();
        res.status(201).json(savedProd);
    } catch (error) {
        if(error) res.status(500).json(error);
    }
});


// Update.
router.put("/:id",verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,{
                $set: req.body
            },
            {new: true}
        );
        res.status(200).json("Order was updated.");
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete.
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order deleted.");
    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

// Get user 1 Order by id.
router.get("/find/:userId",verifyTokenAndAuthorize, async (req, res) => {
    try {
        const Order = await Order.find({
            userId: req.params.userId
        });
        res.status(200).json(Order);

    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

// Get All Order.
router.get("/", verifyTokenAndAdmin,async (req, res) => {
    try {
        const Orders = await Order.find();
        res.status(200).json(Orders);
    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

//get orders stats
router.get("/stats", verifyTokenAndAdmin , async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));
    const prevMonth = new Date(date.setMonth(lastMonth.getMonth() -1));


    try {
        const data = await Order.aggregate([
            { $match: { createdAt: { $gte: prevMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt"},
                    sales: "$amount",
                }
            },{
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"}
                    }
            }
        ]);

        res.status(200).json(data);

    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

module.exports = router