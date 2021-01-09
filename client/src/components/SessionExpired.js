import React from 'react'



export default function SessionExpired() {
    const refereshWindow = () => {
        window.location.href = "/admin";
    }
    return (
        <div class="alert alert-danger" role="alert">
            <p>Sesi Anda telah berakhir. Silakan login kembali</p>
            <button className="btn btn-danger" onClick={refereshWindow}>OK</button>
        </div>
    )
}
