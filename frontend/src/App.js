import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home'
import DetailedInfo from './Components/DetailedInfo';
import Profile from './Components/Profile';
import Registration from './Components/Account';
import PersonIcon from '@material-ui/icons/Person';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
function App() {

  const [user, setUser] = React.useState('') //Ersetzen mit richtigen User aus Anmeldung! 
  //Hier muss noch User im State gespeichert werden, damit dieser beim navigateProfile gepusht wird. Wenn kein User angegeben wird 
  //und darauf geklickt wird wird weitergeleitet auf den User Login! 

  const history = useHistory();

  const navigateProfile = (data) => {
    if (user !== '')
      history.push({
        pathname: '/profile',
        useData: { data }
      })
      if (user==='')
      history.push({
        pathname:'/registration'
      })
    // wenn nicht der Fall ist leite auf Seite Account weiter 
  }
  const settingUser = (event, value) => {
    setUser(event.data.name)
    
  }

  return (

    <div className="App">
      <Switch>
        <Route exact path='/' render={() => (
          <Home user={settingUser}/>
        )} />
        <Route path='/detail' render={() => (
          <DetailedInfo />
        )} />
        <Route path='/profile' render={() => (
          <Profile />
        )} />
        <Route path='/registration' render={() => (
          <Registration />
        )} />™

      </Switch>
      <div className='buttom__fixed_container' >
        <div className='buttom__bar_logo '><img src="/Karlsruhe_united.png" alt='logo' className='fixed__buttom_logo' /></div>
        <div className='buttom__bar'><img src="/search_icon.png" alt='search' className='fixed__buttom_search' /></div>
        <div className='buttom__bar'><Button variant="contained" color='primary'><FavoriteIcon/></Button></div>
        <div className='buttom__bar'><ChatBubbleIcon fontSize='large' /></div>
        <div className='buttom__bar'><PersonIcon fontSize='large' onClick={() => navigateProfile(user)} /> </div>
      </div>
    </div>
  );
}

export default App;
