import React, { useEffect } from 'react'

export default function LoginFail({msg, removeAlert}) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert()
        }, 3000);
        return () => clearTimeout;
    }, []);
    
    return (
        <div>
           <p className="alert alert-danger">{msg}</p> 
        </div>
    )
}
