const e = require('express');
const jwt = require('jsonwebtoken');
const checkExpiry = require('./checkExpiry');
const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token){
        if (checkExpiry(token).exp) {
            res.json({tokenexp: checkExpiry(token)});
        } else {
            try {
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                req.user = decoded;
                next();
            } catch (err) {
                res.status(400).json("Access denied.");
            }
        }
    } else {
        res.status(401).json("Access denied.")
    }
}

module.exports = auth;