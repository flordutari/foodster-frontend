import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import firebase from 'firebase';
const config = {
apiKey: "AIzaSyDy6yB0GSgVA3vPvLrEGPPlENm9z24P70w",
authDomain: "foodster-fa4fb.firebaseapp.com",
databaseURL: "https://foodster-fa4fb.firebaseio.com",
storageBucket: "foodster-fa4fb.appspot.com",
};
firebase.initializeApp(config);

ReactDOM.render(
  <Router>
    <App />
  </Router>
, document.getElementById('root'));
