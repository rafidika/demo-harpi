const express = require('express');
const cors = require('cors');
const pool = require('./regist_db');
const fileUpload = require('express-fileupload');
const bcrypt = require('bcrypt');
const app = express();

// Middleware
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
            const { NamaLengkap, Email, NoHp, TanggalLahir, Domisili, Verified } = req.body;
            const path = `/uploads/${file.name}`;
            // await pool.query("SELECT * FROM members", function(err, result) {
            //     console.log(result);
            // });
            await pool.query("INSERT INTO members (nama, email, hp, tanggal, domisili, buktitrf, verified) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",[NamaLengkap, Email, NoHp, TanggalLahir, Domisili, path, Verified]);
        } else {
            res.status(400).send(console.log("No file uploaded!"));
        }
    } catch (err) {
        console.log(err.message);
    }
});

// Add members list
app.get('/admin', async(req, res) => {
    try {
        const allMembers = await pool.query("SELECT * FROM members;");
        res.send(allMembers.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// Get a member
app.get('/admin/:id', async(req,res) => {
    try {
        const { id } = req.params;
        const members = await pool.query("SELECT * FROM members WHERE id = $1;", [id]);

        res.send(members.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// Verify a member
app.put('/admin/:id', async(req,res) => {
    try {
        const updateMember = await pool.query("UPDATE members SET buktitrf = NULL, verified = TRUE WHERE id = $1;", [req.params.id])
        res.send(console.log("Member verified."));
    } catch (err) {
        console.error(err.message);
    }
})

// Delete a member
app.delete('/admin/:id', async(req, res) => {
    try {
        const deleteMember = await pool.query("DELETE FROM members WHERE id = $1", [req.params.id]);
        res.send(console.log("Member deleted."));
    } catch (err) {
        console.error(err.message);
    }
})

// Admin sign in
app.post('/signin', async(req, res) => {
    try {
        const admin = await pool.query("SELECT email FROM admins WHERE username = $1", [req.body.Username]);
        if (admin) {
            const user = await pool.query("SELECT * FROM login WHERE email = $1", [admin.rows[0].email]);
            const hash = await pool.query("SELECT hash FROM login WHERE email = $1", [admin.rows[0].email]);
            await bcrypt.compare(req.body.Password, hash.rows[0].hash, function(err, result) {
                if (result) {
                    res.json(user.rows[0]);
                } else {
                    res.json("Password salah.");
                }
            });
        } 
    } catch (err) {
        res.json("Username tidak ditemukan.")
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

app.listen(8080, () => {
    console.log("Listening on port 8080...");
});