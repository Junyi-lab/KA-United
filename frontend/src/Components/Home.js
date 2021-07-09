import React from 'react';
import { useHistory } from 'react-router-dom';
import camera from './Camera.svg';
import searchIcon from './search_icon.png';
import { useLocation } from 'react-router-dom';

function useInput({ type }) {
    const [value, setValue] = React.useState("");
    const input = <input className='search' value={value} onChange={e => setValue(e.target.value)} type={type} placeholder="Lieblingsprodukt suchen" />;
    return [value, input];
}



function Home(props) {

    const [search, searchInput] = useInput({ type: 'text' });
    const [recommendations, setRecommendations] = React.useState(null);
    const [upload, setUpload] = React.useState('');
    const [loadedImage, setLoadedImage] = React.useState(false)
    const [prodName, setProdName] = React.useState('')
    const location = useLocation();


    const settingUser = (value) => {
        props.user(value)
    }

    React.useEffect(() => {
    const userData = location.useData   
    if(userData !== undefined){
    settingUser(userData)
    }

        if (prodName !== '') {
            let filtering = ""
            if (prodName.includes('schuh') || (prodName.includes('Schuh'))) { filtering = 'schuh' }
            if (prodName.includes('High_Heel')) { filtering = 'high_heel' }
            if (prodName.includes('Hose')) { filtering = 'hose' }
            if (prodName.includes('kleid')) { filtering = 'kleid' } /* Noch nicht ganz optimale Lösung! */

            fetch('http://localhost:8000/recommendations')
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    console.log(data);

                    const result = data.filter(item => {
                        return (item.imagePath.toLowerCase().indexOf(filtering) >= 0)
                    })
                    setRecommendations(result)
                });
        }
        if (!search && prodName === '') {
            fetch('http://localhost:8000/recommendations')
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    setRecommendations(data)
                })
        };
        if (search) {
            fetch('http://localhost:8000/recommendations')
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    console.log(data);

                    const result = data.filter(item => {
                        const query = search.toLowerCase();
                        return (item.vendor.toLowerCase().indexOf(query) >= 0 ||
                            item.name.toLowerCase().indexOf(query) >= 0)
                    })
                    setRecommendations(result)
                });
        }

    }, [search, upload, prodName])

    const hiddenFileInput = React.useRef(null); //Used for clicking on camera
    const history = useHistory();


    const handleClick = (data) => { //On Click Recomm. route to detail with data! 
        history.push({
            pathname: '/detail',
            useData: { data }
        })
    }

    const pictureClick = (event) => {
        hiddenFileInput.current.click();
    }

    const fileChangedHandler = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setLoadedImage(true);
            setProdName(img.name)
            setUpload(URL.createObjectURL(img));
        }
    }

    function Recommendation({ it }) {
        return <div className="recommendation" onClick={() => handleClick(it)} >
            <div className="recommendation__image-container">
                <img src={it.imagePath} alt='' className="recommendation__image" />
            </div>
            <div className="recommendation__content">
                <div className="recommendation__header">
                    <div className="recommendation__name">{it.name}</div>
                    <div className="recommendation__price">{it.price}€</div>
                </div>
                <div className="recommendation__vendor">{it.vendor}</div>
            </div>

        </div>
    }

    return (
        <div>
            <div> <h2> Produkte </h2> </div>

            <div className="bar">
                <img src={searchIcon} alt='' className="bar__search" />
                <div className="bar__input">{searchInput}</div>
                <div>
                    <div>
                        <input type="file" ref={hiddenFileInput} style={{ display: 'none' }} onChange={fileChangedHandler} />
                    </div>
                    {!loadedImage && <img src={camera} alt='' className="bar__camera" onClick={pictureClick} />} {/* Default Camera visible --> Changed when image uploaded */}
                    {loadedImage && <img src={upload} alt='' className="bar__picture" onClick={pictureClick} />}
                </div>
            </div>
            <h3>Aktuelle Angebote in deiner Nähe</h3>
            {recommendations === null && <div> load result </div>  /* eqaulity operator*/}
            {recommendations != null && <div> {recommendations.map(it => <Recommendation it={it} />)} </div>}
        </div>
    )
}

export default Home;