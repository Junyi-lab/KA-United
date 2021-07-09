import React from 'react';
import { useLocation } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { GoogleLogout } from 'react-google-login';
function Profile() {

    const [user, setUser] = React.useState('')
    const location = useLocation();



    React.useEffect(() => {
        const pushedUserName = location.useData
        fetch('http://localhost:8000/userInformation')
            .then(res => {
                return res.json()
            })
            .then(data => {
                const result = data.filter(item => {
                    return (item.name.indexOf(pushedUserName.data) >= 0)
                })
                setUser(result)
            })
    }, [])

    const history = useHistory();

    function changeSite() {
        history.push({
            pathname: '/'
        })
    }

    const logout = (response) => {
        console.log("you have been loged out");
        history.push({
            pathname: '/registration'
        })
    }

    function downloadJson(data) {
        const newData = JSON.stringify(data)
        const fileDownload = require('js-file-download');
        fileDownload(newData, 'filename.json');
    }

    function UserMapping({ it }) {
        return <div>
            <img className="user__picture" src={it.picture} />
            <h2>{it.name}</h2>
            <div>
                <div className='user__property__container'>
                    <div className="user__properties">Nachhaltigkeit:</div>
                    <div className="user__properties__data">{it.sustainable} </div>
                </div>
                <div className='user__property__container'>
                    <div className="user__properties">Sport-Bekleidung:</div>
                    <div className="user__properties__data">{it.sportfit} </div>
                </div>
                <div className='user__property__container'>
                    <div className="user__properties">Kräftige Farben:</div>
                    <div className="user__properties__data">{it.strongcolor} </div>
                </div>
                <div className='user__property__container'>
                    <div className="user__properties">Monochrom:</div>
                    <div className="user__properties__data">{it.monochrom} </div>
                </div>
                <div className='user__property__container'>
                    <div className="user__properties"> Download dir deine Daten</div>
                    <div className="user__properties__data"><Button variant='contained' onClick={() => downloadJson(user)} >Download</Button> </div>
                </div>
            </div>


        </div>
    }

    return (
        <div className="profile__size">
            <div className='bar'>
                <AiOutlineArrowLeft className='bar__arrow' onClick={changeSite} />
                <div className='bar__headline'> Profil </div>
                <div> <GoogleLogout
                    clientId="286927938628-ruulmuafnuqeq1sc2di35put0fjh61kh.apps.googleusercontent.com"
                    buttonText="Abmelden"
                    onLogoutSuccess={logout}
                    className="google__logout"
                >
                </GoogleLogout></div>
            </div>
            {user !== '' &&
                <div >
                    {user.map(it => <UserMapping it={it} />)}
                </div>}

            {/* {detail != null && <div> {detail.map(it => <Recommendation it={it} />)} </div>} */}
        </div>

    )
}

export default Profile;