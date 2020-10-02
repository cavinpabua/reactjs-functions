const firebase = require("firebase");
require("firebase/firestore");

const config = {
    apiKey: "AIzaSyCAJSx8GBpOBTmEg52aokmYDNuEg3i216k",
    authDomain: "reactjs-todo-3cf00.firebaseapp.com",
    databaseURL: "https://reactjs-todo-3cf00.firebaseio.com",
    projectId: "reactjs-todo-3cf00",
    storageBucket: "reactjs-todo-3cf00.appspot.com",
    messagingSenderId: "496710522937",
    appId: "1:496710522937:web:ecdc3f75bfb69ca8ca15e8",
    measurementId: "G-KD0TJWQVSZ"
}

firebase.initializeApp(config);
let db = firebase.firestore();
let auth = firebase.auth();
let reauth = firebase.auth;
const storage = firebase.storage()
export {db, auth, storage,reauth}
