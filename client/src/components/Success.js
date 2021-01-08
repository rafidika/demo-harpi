import React from 'react'
import Navbar from './Navbar'
import '../styles/success.css'


export default function Success() {
    const backToHomePage = () => {
        window.location.href = "http://localhost:3000/"
    }
    return (
        <div>
            <Navbar admin={false}/>
            <div class="container-fluid" id="message">
                <p id="thanks">Terima kasih sudah mendaftar!</p>
                <p id="check">Staff kami akan meninjau pendaftaran Anda. Kartu anggota Anda akan dikirimkan melalui email setelah Anda terverifikasi</p>
                <a href="http://localhost:3000/" id="back">Kembali ke halaman utama</a>
            </div>
        </div>
    )
}
