function newID() {
    let id = '0';
    for (let i = 0; i < 9; i++) {
        let digit = Math.floor(Math.random() * 10);
        let cast = digit.toString();
        id += cast;
    }
    return id;
}

module.exports = newID;