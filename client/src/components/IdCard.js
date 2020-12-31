import React from 'react'
import Axios from 'axios'
import { saveAs } from 'file-saver'
import '../styles/idcard.css'

export default function IdCard() {
    return (
        <div>
            <div class="container-id-card">
                <div class="header-id-card">
                    <img src="/assets/logo-white.png" alt="logo" class="logo-white-id" />
                    <h4 class="title-id-card">Kartu Tanda Anggota HARPI Melati</h4>
                </div>
                <h4 class="number-id-card">ID               : 123456789101112</h4>
                <h4 class="nama-id-card">Nama        : Nabelanita Utami</h4>
                <h4 class="nohp-id-card">No. HP      : 08567265625</h4>
                <div class="rectangle-id-card">
            
                </div>
                <h4 class="date-id-card">Bergabung pada 28 Desember 2020</h4>
            </div>
        </div>
    )
}
