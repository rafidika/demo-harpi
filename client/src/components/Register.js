import React, { useState } from 'react'
import Axios from 'axios'

export default function Register() {
    const [Nama, setNama] = useState("");
    const [Email, setEmail] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const adminData = new FormData();
            adminData.append('Nama', Nama);
            adminData.append('Email', Email);
            adminData.append('Username', Username);
            adminData.append('Password', Password);

            await Axios.post('http://localhost:8080/45jPyQvLRE', adminData, {
                headers: {
                    "Content-Type":"multipart/form-data"
                }
            })
            .then(
                window.location.href = "http://localhost:3000/admin"
            )
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div>
            <div className="d-flex p-2" id="form">
                    <form onSubmit={onSubmitForm}>
                        <p>Daftar Admin Baru</p>
                        <br />
                        <label htmlFor="name">Nama</label>
                        <br />
                        <input type="text" name="name" id="name" value={Nama} onChange={e => setNama(e.target.value)}/>
                        <br />
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="text" name="email" id="email" value={Email} onChange={e => setEmail(e.target.value)}/>
                        <br />
                        <label htmlFor="username">Username</label>
                        <br />
                        <input type="text" name="Username" id="username" value={Username} onChange={e => setUsername(e.target.value)}/>
                        <br />
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="password" name="Password" id="password" value={Password} onChange={e => setPassword(e.target.value)}/>
                        <br />
                        <input type="submit" value="Kirim"/>
                    </form>
            </div>
        </div>
    )
}
