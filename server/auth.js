const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token){
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            console.error(err.message)
            res.status(400).json("Access denied.");
        }
    } else {
        res.status(401).json("Access denied.")
    }
}

module.exports = auth;