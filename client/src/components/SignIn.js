import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function SignIn( {onRouteChange} ) {
    const [success, setSuccess] = useState(false);
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const signIn = async (e) => {
        e.preventDefault();
        try {
            const signInData = new FormData();
            signInData.append("Username", Username);
            signInData.append("Password", Password);
            console.log(signInData);

            await Axios.post("http://localhost:8080/signin", signInData, {
                headers: {
                    "Content-Type":"multipart/form-data"
                }
            })
            .then(res => {
                setSuccess(res.data);
            })
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        isSignedIn(success);
    }, [success])

    const isSignedIn = valid => {
        if (valid) {
            setSuccess(false);
            onRouteChange(valid);
        } else {
            console.log("Not OK");
        }
    }

    return (
        <div>
            <div className="d-flex p-2" id="form">
                    <form onSubmit={signIn}>
                        <p>Masuk sebagai Admin</p>
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
