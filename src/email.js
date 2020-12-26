var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email@gmail.com',
        pass: 'password'
    }
});

var mailOptions = {
    from: 'email@gmail.com',
    to: 'siapaaja@gmail.com',
    subject: 'Pengumuman Indeks IF2110 Algoritma & Struktur Data',
    text: 'Selamat malam mahasiswa IF2110. Berikut terlampir nilai kuis 1, kuis 2, UTS, UAS, serta indeks masing-masing peserta. Terima kasih',
    attachments: [
        {
            path: 'lol.txt'
        }
    ]
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
});

// BUAT LEBIH JELAS, SEARCH NODEMAILER TRUS KLIK WEB NODEMAILER ATAU PETANI KODE ATAU W3SCHOOL OKEH