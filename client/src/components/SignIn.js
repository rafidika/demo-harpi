import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import '../styles/adminloginXL.css'
import LoginFail from './LoginFail';

export default function SignIn( {onRouteChange} ) {
    const [success, setSuccess] = useState("init");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Alert, setAlert] = useState({show: false, msg: ""})

    const signIn = async (e) => {
        e.preventDefault();
        try {
            const signInData = new FormData();
            signInData.append("Username", Username);
            signInData.append("Password", Password);

            await Axios.post("http://localhost:8080/signin", signInData, {
                headers: {
                    "Content-Type":"multipart/form-data"
                }
            })
            .then(user => {
                if (user.data.id) {
                    setSuccess("init");
                    onRouteChange(true);
                } else {
                    setAlert({show: true, msg: user.data})
                }
            })
        } catch (err) {
            console.error(err.message);
        }
    }

    const showAlert = (show = false, msg = "") => {
        setAlert({show: show, msg: msg})
    }

    // const isSignedIn = valid => {
    //     if (valid === "success") {
    //         setSuccess("init");
    //         onRouteChange(true);
    //     } else {
    //         setAlert({show: true, msg})
    //     }
    // }


    return (
        <div className="container-fluid">
            <div className="row min-vw-100 min-vh-100">
                {/* Green thingy */}
                <div class="col-xl-7" id="rest">
                    <div class="row">
                        <div class="col-3 col-xl-3" id="logo">
                            <img src="assets/logo-transparent.png" class="img-fluid" alt="Logo HARPI MELATI"/>
                        </div>
                        <div class="col-9 col-xl-9" id="himpunan">
                            <h3>HARPI MELATI</h3>
                            <p>Himpunan Perias Pengantin Indonesia "MELATI"</p>
                        </div>
                    </div>
                </div>
                {/* Form */}
                <div className="col-xl-5 d-flex justify-content-center align-items-center" id="form" >
                    <form onSubmit={signIn}>
                        <p id="title">Masuk ke Halaman Admin</p>
                        <br /><br />
                        {Alert.show && <LoginFail msg={Alert.msg} removeAlert={showAlert} />}
                        <label htmlFor="username">Username</label>
                        <br />
                        <input type="text" name="Username" required id="username" value={Username} onChange={e => setUsername(e.target.value)}/>
                        <br /><br />
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="password" name="Password" required id="password" value={Password} onChange={e => setPassword(e.target.value)}/>
                        <br /><br />
                        <input type="submit" value="Masuk" id="masuk"/>
                        <br /><br />
                        <p id="copyright">Copyright 2020 Himpunan Perias Pengantin Indonesia "MELATI"</p>
                    </form>
                </div>
            </div>
        </div>
    )
}
