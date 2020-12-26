import React, { Fragment, useState} from 'react'
import SignIn from './SignIn'
import Main from './Main'

const Admin = () => {
    const [signedIn, setSignedIn] = useState(false);

    const onRouteChange = (state) => {
        setSignedIn(state);
    }

    return (
        <Fragment>
            {signedIn ? <Main onRouteChange={onRouteChange} /> : <SignIn onRouteChange={onRouteChange} />
            }
        </Fragment>
    )
}

export default Admin;