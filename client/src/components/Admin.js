import React, { Fragment, useState, useEffect } from 'react'
import SignIn from './SignIn'
import Main from './Main'

const Admin = () => {
    const [signedIn, setSignedIn] = useState(false);
    const verified = localStorage.getItem("token");

    const onRouteChange = (state) => {
        setSignedIn(state);
    }

    useEffect(() => {
        if (verified) {
            setSignedIn(true);
            console.log("Success!");
        }
    }, []);

    return (
        <Fragment>
            {signedIn ? <Main onRouteChange={onRouteChange} /> : <SignIn onRouteChange={onRouteChange} />
            }
        </Fragment>
    )
}

export default Admin;