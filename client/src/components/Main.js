import React from 'react'
import NewMembers from './NewMembers'
import MemberData from './MemberData'
import Navbar from './Navbar'

export default function Main( {onRouteChange} ) {
    return (
        <div>
            <Navbar onRouteChange={onRouteChange}/>
            <br /><br/>
            <NewMembers />
            <MemberData />
        </div>
    )
}
