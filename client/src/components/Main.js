import React from 'react'
import NewMembers from './NewMembers'
import MemberData from './MemberData'

export default function Main( {onRouteChange} ) {
    return (
        <div>
            <button 
                className="btn btn-primary" 
                onClick={() => onRouteChange(false)}>
                    Keluar
            </button>
            <NewMembers />
            <MemberData />
        </div>
    )
}
