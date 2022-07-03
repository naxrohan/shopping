const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

// register
router.post("/register", async (req, res) => {
    //todo : add field validation & return valid messages.
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.AUTH_SEC
        ).toString()
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/login", async (req, res) => {
    errorMsg = "Invalid Credentials!"
    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json(errorMsg);

        const passHash = CryptoJS.AES.decrypt(
            user.password,
            process.env.AUTH_SEC
        );
        const gotPass = passHash.toString(CryptoJS.enc.Utf8);
        gotPass !== req.body.password && res.status(401).json(errorMsg);

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC,
        {expiresIn:"3d"}
        );

        const { password,...others } = user._doc
        
        res.status(200).json({
            ...others, accessToken
        });

    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router