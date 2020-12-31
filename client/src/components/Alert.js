import React, { useEffect } from 'react'

export default function Alert({msg, type, removeAlert}) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert()
        }, 3000);
        return () => clearTimeout;
    }, []);
    
    return (
        <div>
           <p className={`alert alert-${type}`}>{msg}</p> 
        </div>
    )
}
