var nodemailer = require('nodemailer');

const sendEmail = (email, nama, idCard) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "lanitaabel@gmail.com",
            pass: "30105492"
        }
    });
    
    var mailOptions = {
        from: '"no-reply@harpimelati.com" <no-reply@harpimelati.com>',
        to: email,
        subject: 'Verifikasi Keanggotaan HARPI Melati',
        text: `Kepada ${nama},\n\n Terima kasih telah bergabung dengan HARPI Melati! Berikut ini kami lampirkan kartu anggota Anda. \n\n Selamat berkarya!`,
        attachments: [
            {
                path: idCard
            }
        ]
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
    });

}

module.exports = sendEmail;
// BUAT LEBIH JELAS, SEARCH NODEMAILER TRUS KLIK WEB NODEMAILER ATAU PETANI KODE ATAU W3SCHOOL OKEH