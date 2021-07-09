import React from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Button from '@material-ui/core/Button';


function Register() {



    const history = useHistory();

    const navigateProfile = (data) => {
        history.push({
            pathname: '/',
            useData: { data }
        })
        // wenn nicht der Fall ist leite auf Seite Account weiter 
    }
    const sucess = (response) => {
        const welcome = response.profileObj
        alert(`Wilkommen ${welcome.name}! Du wirst jetzt zur Homepage weitergeleitet.. `)
        navigateProfile(welcome);
    }
    const failure = (response) => {
        console.log("Leider hat die Anmeldung nicht funktionienrt..")
        console.log(response)
    }
    const logout = (response) => {
        console.log("you have been loged out");
    }
    return (
        <div className="registration__size">
            <div> <h2> Anmelden</h2> </div>
            <div className="bar__input"> <input className="registration" type="text" placeholder="E-mail" /> </div>
            <div className="add__space"> {''}</div>
            <div className="bar__input"> <input className="registration" type="text" placeholder="Passwort" /></div>
            <div className="forgot__password"><a href={'/'}>Forgot your password? </a></div>
            <div className="button__login"> <Button variant='contained' style={{ maxWidth: '200px', maxHeight: '100px', minWidth: '300px', minHeight: '30px' }} >Login</Button></div>
            <div>or</div>
            <div>   <GoogleLogin
                clientId="286927938628-ruulmuafnuqeq1sc2di35put0fjh61kh.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={sucess}
                onFailure={failure}
                buttonText={'Sign in with Google'}
                cookiePolicy={'single_host_origin'}
                className="google__login"
                /* isSignedIn={true} */
            /></div>
  {/*           <div> <GoogleLogout
                clientId="286927938628-ruulmuafnuqeq1sc2di35put0fjh61kh.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
            >
            </GoogleLogout></div> */}
            {/*  {name!="" && <div> {name.familyName}</div>} */}
            {/* Hier kommt jetzt google Signin */}
        </div>
    )
}
export default Register;