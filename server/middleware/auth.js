require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = localStorage.getItem("token");
    if (token){
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded;
            console.log(req);
            next();
        } catch (err) {
            res.send(400).json("Login gagal. Silakan coba lagi.");
        }
    } else {
        res.send(401).json("Login gagal. Silakan coba lagi.")
    }
}

module.exports = auth;