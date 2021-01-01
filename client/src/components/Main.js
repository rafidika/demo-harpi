import React from 'react'
import NewMembers from './NewMembers'
import MemberData from './MemberData'
import Navbar from './Navbar'

export default function Main( {onRouteChange} ) {
    const verified = localStorage.getItem("token");
    return (
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
    )
}
