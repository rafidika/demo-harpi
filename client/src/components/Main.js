import React, { useState, useEffect } from 'react'
import NewMembers from './NewMembers'
import MemberData from './MemberData'
import Navbar from './Navbar'
import SessionExpired from './SessionExpired';
import Axios from 'axios';

export default function Main( {onRouteChange} ) {
    var verified = localStorage.getItem("token");
    const [members, setMembers] = useState();
    const [session, setSession] = useState(false);

    const getMembers = async () => {
        try {
            // const response = await fetch("http://localhost:8080/admin");
            // const jsonData = await response.json();
            // setMembers(jsonData);
            await Axios.get("http://localhost:8080/admin", {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            .then(res => {
                if (res.data.tokenexp) {
                    setSession(true);
                    verified = null;
                    localStorage.clear();
                    
                } else {
                    setMembers(res.data);
                }
            })
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!session) {
            getMembers();
        }
    });

    return (
        <div>
            {session ? <SessionExpired /> : 
            <div>
                {verified ? 
                <div>
                    <Navbar onRouteChange={onRouteChange}/>
                    <br /><br/>
                    <NewMembers />
                    <br />
                    <MemberData />
                    <br /><br /><br /><br />
                    <p id="copyright">Copyright 2021 Himpunan Perias Pengantin Indonesia "MELATI"</p>
                    <br />
                </div> 
                : onRouteChange
                    } 
            </div>
            }
        </div>
    )
}
