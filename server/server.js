const express = require('express');
const cors = require('cors');
const pool = require('./regist_db');
const fileUpload = require('express-fileupload');
const app = express();

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());

// Routes
app.post('/', async(req, res) => {
    try {
        if (req.files) {
            const file = req.files.Img;
            file.mv(`${__dirname}/../client/public/uploads/${file.name}`, err => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send(err);
                }
            })
            const { NamaLengkap, Email, TanggalLahir, Domisili } = req.body;
            const path = `./public/uploads/${file.name}`;
            // await pool.query("SELECT * FROM members", function(err, result) {
            //     console.log(result);
            // });
            await pool.query("INSERT INTO members (nama, email, tanggal, domisili, buktitrf) VALUES($1, $2, $3, $4, $5) RETURNING *",[NamaLengkap, Email, TanggalLahir, Domisili, path]);
        } else {
            res.status(400).send(console.log("No file uploaded!"));
        }
    } catch (err) {
        console.log(err.message);
    }
});

app.get('/admin', async(req, res) => {
    try {
        const allMembers = await pool.query("SELECT * FROM members;");
        res.send(allMembers.rows);
    } catch (err) {
        console.error(err.message);
    }
})


app.listen(8080, () => {
    console.log("Listening on port 8080...");
});