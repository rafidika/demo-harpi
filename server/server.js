require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./regist_db');
const fileUpload = require('express-fileupload');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./auth.js')
const checkExpiry = require('./checkExpiry.js');
const fs = require('fs');
const app = express();


app.use(cors());
app.use(fileUpload());
app.use(express.json());

// Routes

// Add new member
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
            const { NamaLengkap, Email, NoHp, TanggalLahir, Domisili, Verified, IdCard } = req.body;
            const path = `/uploads/${file.name}`;
            // await pool.query("SELECT * FROM members", function(err, result) {
            //     console.log(result);
            // });
            await pool.query("INSERT INTO members (nama, email, hp, tanggal, domisili, buktitrf, verified, idcard) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",[NamaLengkap, Email, NoHp, TanggalLahir, Domisili, path, Verified, IdCard]);
        } else {
            res.status(400).send(console.log("No file uploaded!"));
        }
    } catch (err) {
        console.log(err.message);
    }
});

// Add members list
app.get('/admin', auth, async(req, res) => {
    try {
        const allMembers = await pool.query("SELECT * FROM members;");
        res.send(allMembers.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// Get a member
app.get('/admin/:id', auth, async(req,res) => {
    try {
        const { id } = req.params;
        const members = await pool.query("SELECT * FROM members WHERE id = $1;", [id]);

        res.send(members.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// Verify a member
app.put('/admin/verify/:id', auth, async(req,res) => {
    try {
        console.log(req.body);
        const updateMember = await pool.query("UPDATE members SET buktitrf = NULL, verified = TRUE, idcard = $1 WHERE id = $2;", [req.params.idcard, req.params.id])
        res.send(console.log("Member verified."));
    } catch (err) {
        console.error(err.message);
    }
})

// Delete a member
app.delete('/admin/:id', auth, async(req, res) => {
    try {
        const deleteMember = await pool.query("DELETE FROM members WHERE id = $1", [req.params.id]);
        res.send(console.log("Member deleted."));
    } catch (err) {
        console.error(err.message);
    }
})

// Create Id Card for a member
app.put('/admin/add-id-card/:id', auth, async(req,res) => {
    try {
        const { Verified, IdCard, NamaLengkap, Email, NoHp, TanggalLahir, Domisili, Id } = req.body;

        // var base64Data = IdCard.replace(/^data:image\/png;base64,/, "");
        // const path = `/uploads/idcard-${Id}.png`;
        // require("fs").writeFile(path, base64Data, 'base64', function(err) {
        //     console.log(err.message);
        // });
        // console.log(IdCard);
        var img = IdCard.replace("data:image/png;base64,", "");
        const path = `${__dirname}/../client/public/idcard/id-card-${Id}.png`;
        var bitmap = new Buffer.from(img, 'base64');
        fs.writeFileSync(path, bitmap, function(err) {
            if (err) {
                return err.message;
            }
        });
        const updateMember = await pool.query("UPDATE members SET nama = $1, email = $2, hp = $3, tanggal = $4, domisili = $5, verified= $6, idcard = $7 WHERE id = $8;", [NamaLengkap, Email, NoHp, TanggalLahir, Domisili, Verified, path, Id])
    } catch (err) {
        console.error(err.message);
    }
})

// Edit a member
app.put('/admin/edit/:id', auth, async(req,res) => {
    try {
        const { NamaLengkap, Email, NoHp, TanggalLahir, Domisili, Id } = req.body;
        const updateMember = await pool.query("UPDATE members SET nama = $1, email = $2, hp = $3, tanggal = $4, domisili = $5 WHERE id = $6;", [NamaLengkap, Email, NoHp, TanggalLahir, Domisili, Id])
    } catch (err) {
        console.error(err.message);
    }
})

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: `15m`})
}

// Admin sign in
app.post('/signin', async(req, res) => {
    try {
        const admin = await pool.query("SELECT email FROM admins WHERE username = $1", [req.body.Username]);

        // const user = await pool.query("SELECT * FROM login WHERE email = $1", [admin.rows[0].email]);
        const hash = await pool.query("SELECT hash FROM login WHERE email = $1", [admin.rows[0].email]);
        // await Promise.all([user, hash]);
        await bcrypt.compare(req.body.Password, hash.rows[0].hash, function(err, result) {
            if (result) {
                res.json({accessToken: generateAccessToken(admin.rows[0])});
            } else {
                res.json("Login gagal");
            }
        });
    
    } catch (err) {
        console.log(err.message);
        res.json("Login gagal")
    }
})

app.post('/45jPyQvLRE', async (req, res) => {
    try {
        const { Nama, Username, Email } = req.body;
        const hash = await bcrypt.hash(req.body.Password, 15);
        await pool.query("INSERT INTO admins (name_adm, username, email) VALUES($1, $2, $3) RETURNING *",[Nama, Username, Email]);
        await pool.query("INSERT INTO login (hash, email) VALUES($1, $2) RETURNING *",[hash, Email]);
        res.status(200).send(console.log("Registration success"));
    } catch (err) {
        console.error(err.message);
        res.status(500).send(console.log("Something went wrong"));
    }
})

// app.post('/signin', (req, res) => {
//     try {
//         const refresh = jwt.sign(req.body, process.env.REFRESH_TOKEN_SECRET)
//         res.json({accessToken: generateAccessToken(req.body), refreshToken: refresh, user: req.body});
//     } catch (err) {
//         res.json(err.message);
//     }
// })

app.listen(8080, () => {
    console.log("Listening on port 8080...");
});