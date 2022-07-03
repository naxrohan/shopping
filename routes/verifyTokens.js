const jwt = require("jsonwebtoken");

/**
 * Middleware function
 */
const verifyToken = (req, res, next) =>{
    const authHeader = req.headers.token;

    if(authHeader){
        const gotToken = authHeader.split(" ")[1];
        jwt.verify(gotToken,process.env.JWT_SEC,(err, user) => {
                if(err) res.status(403).json(
                    "Invalid Token!"
                );

                req.user =  user;
                next();
            }
        )
    } else {
        return res.status(401).json(
            "Not authorized access!"
        );
    }
}

const verifyTokenAndAuthorize = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else{
            res.status(403).json(
                "Invalid Token ! Not Allowed."
            );
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next();
        } else{
            res.status(403).json(
                "Invalid Token ! Admin Not Allowed."
            );
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorize,
    verifyTokenAndAdmin
};