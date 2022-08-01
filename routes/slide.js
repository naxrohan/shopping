const Slide = require("../models/Slide");
const { verifyTokenAndAuthorize, verifyTokenAndAdmin } = require("./verifyTokens");

const router = require("express").Router();


// Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newSlide = new Slide(req.body);
    try {
        const saveSlide = await newSlide.save();
        res.status(201).json(saveSlide);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updateSlide = await Slide.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {new: true}
        );
        res.status(200).json("Slide was updaetd.");
    } catch (error) {
        res.status(500).json(error);
    }
})

// Delete.
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Slide.findByIdAndDelete(req.params.id);
        res.status(200).json("Slide deleted.");
    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

// Get user 1 Slide by id.
router.get("/find/:userId",verifyTokenAndAuthorize, async (req, res) => {
    try {
        const theSlide = await Slide.find({
            userId: req.params.userId
        });
        res.status(200).json(theSlide);

    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

// Get All Slide.
router.get("/", async (req, res) => {
    try {
        const allSlide = await Slide.find();
        res.status(200).json(allSlide);
    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

module.exports = router