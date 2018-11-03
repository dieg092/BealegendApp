// Config file
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBhR7R_kxVs3RaR_yh7AgZXyflIFqNnMSU',
  authDomain: 'bealegendapp.firebaseapp.com',
  databaseURL: 'https://bealegendapp.firebaseio.com',
  projectId: 'bealegendapp',
  storageBucket: 'bealegendapp.appspot.com',
  messagingSenderId: '168518552510'
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
