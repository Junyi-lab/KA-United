import React from 'react';
import { useHistory } from 'react-router-dom';
import camera from './Camera.svg';
import searchIcon from './search_icon.png';

function useInput({ type /*...*/ }) {
    const [value, setValue] = React.useState("");
    const input = <input className='search' value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
}



function Home() {

    const [search, searchInput] = useInput({ type: 'text' });
    const [recommendations, setRecommendations] = React.useState(null);
    const [upload, setUpload] = React.useState('');
    const [loadedImage, setLoadedImage] = React.useState(false)
    const [prodName, setProdName] = React.useState('')

    React.useEffect(() => {
        (async function () {
            if(prodName !=='') {
                const response = await fetch(`http://localhost:3000/api/recommendations?search=${prodName}`);
                const result = await response.json(); //result parse as json --> passing takes a while --> async
                setRecommendations(result.recommendations);
            }
            else {
                const response = await fetch(`http://localhost:3000/api/recommendations?search=${search}`);
            const result = await response.json(); //result parse as json --> passing takes a while --> async
            setRecommendations(result.recommendations);
            }
             //Recommendation wird gefüllt mit den jeweiligen Werten
        })() //Async function --> Await till result comes (IIFE --> Immediately Evoked)

    }, [search, upload])
    const hiddenFileInput = React.useRef(null);
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
                <img src={it.imageUrl} alt='' className="recommendation__image" />
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

            <h2>Aktuelle Angebote in deiner Nähe</h2>
            {recommendations === null && <div> load result </div>  /* eqaulity operator*/}
            {recommendations != null && <div> Results: {recommendations.map(it => <Recommendation it={it} />)} </div>}
        </div>
    )
}

export default Home;