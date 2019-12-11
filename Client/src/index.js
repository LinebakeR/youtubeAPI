import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import './Components/Css/userDisplayCss.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { getUser, initClient, loadClient } from './apiConnect';

//INIT API CONNECTION THEN DISPLAY API IF USER IS LOGGED ELSE ERROR MESS
(async () => {
  try {
    await loadClient();
    await initClient();

    let isLogged = window.gapi.auth2.getAuthInstance().isSignedIn.get();
    let user = null;
    if (isLogged) {
      user = await getUser();
    }
    ReactDOM.render(<App isLogged={isLogged} user={user || null} />, document.getElementById('root'));
  } catch (err) {
    console.log(err);
    ReactDOM.render(<div>Can't log ...</div>, document.getElementById('root'));
  }
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
