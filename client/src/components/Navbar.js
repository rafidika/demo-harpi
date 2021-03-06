import React from 'react'
import '../styles/navbar.css'

export default function Navbar({admin, onRouteChange }) {
    const signOut = () => {
        localStorage.removeItem("token");
        onRouteChange(false);
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light sticky-top">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="assets/logo-white.png" alt="Logo HARPI MELATI" className="logo-navbar"/>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                {admin ? 
                <>
                    <span class="navbar-text" id="text">
                        Halaman Admin
                    </span>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a href="" class="nav-link" id="keluar" onClick={() => signOut()}>Keluar</a>
                            </li>
                        </ul>
                </div>
                </> : 
                <>
                    <span class="navbar-text" id="text">
                        Pendaftaran Anggota Baru HARPI Melati
                    </span>
                </> }
                
            </div>
        </nav>
    )
}
