const jwt = require('jsonwebtoken');

const checkExpiry = (token) => {
    if (jwt.decode(token).exp < Date.now() / 1000) {
        return({exp: true, msg: "Sesi Anda telah berakhir. Silakan login ulang."});
    } else {
        return({exp: false, msg:""});
    }
}

module.exports = checkExpiry;
