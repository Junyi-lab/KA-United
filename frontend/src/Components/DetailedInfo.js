import React from 'react';
import { useLocation } from 'react-router-dom'
import { AiOutlineArrowLeft, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { FaTruck } from 'react-icons/fa';
import { BsHouseDoorFill } from 'react-icons/bs'
import { useHistory } from 'react-router-dom';
import Paypal from './PayPal'
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';
import Button from '@material-ui/core/Button';

function Map() {
    return <GoogleMap defaultZoom={100} defaultCenter={{ lat: 49.006889, lng: 8.403653 }}>
        <Marker

            position={{
                lat: 49.006889,
                lng: 8.403653
            }}
        />
    </GoogleMap>
        ;
}

const WrappedMap = withScriptjs(withGoogleMap(Map)) //To load the map

function DetailedInfo() {
    const [detail, setDetail] = React.useState(null)
    const [collapse, setCollapse] = React.useState(false)
    const [collapseMaterial, setCollapseMaterial] = React.useState(false)
    const [passform, setPassform] = React.useState(false)
    const [stateDelivery, setStateDelivery] = React.useState(false)
    const [statePickup, setStatePickup] = React.useState(false)
    const [checkout, setCheckout] = React.useState(false)

    const location = useLocation();


    React.useEffect(() => {

        const detailInfo = location.useData
        fetch('http://localhost:8000/detailedInfo')
            .then(res => {
                return res.json()
            })
            .then(data => {
                const result = data.filter(item => {
                    const query = detailInfo.data.name.toLowerCase();
                    return (item.name.toLowerCase().indexOf(query) >= 0)
                })
                setDetail(result)
            });
},

[])
function collapseText() {
    setCollapse(!collapse)
}

function collapseMat() {
    setCollapseMaterial(!collapseMaterial)
}

function collapsePass() {
    setPassform(!passform)
}

function deliveryCheck() {
    if (statePickup === true) {
        setStatePickup(!statePickup)
    }
    setStateDelivery(!stateDelivery)
}

function pickupCheck() {
    if (stateDelivery === true) {
        setStateDelivery(!stateDelivery)
    }
    setStatePickup(!statePickup)
}

function checkoutPaypal() {
    setCheckout(true)
}
function Recommendation({ it }) {
    return <div className="detailed__container">
        <div className="detailed__headline">
            <h1>{it.name}</h1>
        </div>
        <div>
            <img src={it.imagePath} alt='' className='detailed__image' />
        </div>
        <div className="detailed__description_container">
            <div className="detailed__description">
                Beschreibung </div>
            <div className="detailed__icon">
                {!collapse && <AiFillCaretDown onClick={collapseText} />}
                {collapse && <AiFillCaretUp onClick={collapseText} />}
            </div>
        </div>
        {collapse && <div className='description__align'>{it.description} </div>}
        {collapse && <div className='description__align'>Preis {it.price} € </div>}

        <div className='detailed__description_container'>
            <div className="detailed__description">
                Material und Pflegehinweise
            </div>
            <div className="detailed__icon">
                {!collapseMaterial && <AiFillCaretDown onClick={collapseMat} />}
                {collapseMaterial && <AiFillCaretUp onClick={collapseMat} />}
            </div>

        </div>
        {collapseMaterial && <div className='description__align'>{it.matInfo} </div>}

        <div className='detailed__description_container'>
            <div className="detailed__description">
                Passform
            </div>
            <div className="detailed__icon">
                {!passform && <AiFillCaretDown onClick={collapsePass} />}
                {passform && <AiFillCaretUp onClick={collapsePass} />}
            </div>
        </div>
        {passform && <div className='description__align'>{it.size} </div>}

        <div className="detailed__deliveryoption">
            <div className="detailed__description_container">
                <div className="detailed__description">
                    <FaTruck />
                </div>
                <div>
                    Liefern
                    <input name='delivery__checkbox' type='checkbox' checked={stateDelivery} onChange={deliveryCheck} />
                </div>
            </div>
            <div className="detailed__description_container">
                <div className="detailed__description">
                    <BsHouseDoorFill />
                </div>
                <div>
                    Abholen
                    <input name='pickup__checkbox' type='checkbox' checked={statePickup} onChange={pickupCheck} />
                </div>
            </div>
        </div>
        <div className='detailed__button'>
            <Button variant="contained" onClick={checkoutPaypal}>Shop it</Button>
            {checkout && <Paypal data={detail} />}
        </div>
    </div>



}

const history = useHistory();

function changeSite() {
    history.push({
        pathname: '/'
    })
}

return (
    <div>
        <div className='bar'>
            <AiOutlineArrowLeft className='bar__arrow' onClick={changeSite} />
            <div className='bar__headline'> Shop the picture</div>
            {detail != null && <div > <img src={detail[0].imagePath} alt='' className="bar__uploaded" /> </div>}
        </div>
        {detail != null && <div> {detail.map(it => <Recommendation it={it} />)} </div>}

        <div className="detailed__map">
            <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCaRJ9uHleuR6ZUGcec7sHzZSLNhT6nZuw`}
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
            />
        </div>
    </div>

)
}

export default DetailedInfo;