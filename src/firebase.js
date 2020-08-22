import firebase from "firebase";

const config = {
  apiKey: "AIzaSyC0D0v4o0VIRSiv4-hIB54hohkd4P3WELo",
  authDomain: "quiz-pwa-5457f.firebaseapp.com",
  databaseURL: "https://quiz-pwa-5457f.firebaseio.com",
  projectId: "quiz-pwa-5457f",
  storageBucket: "quiz-pwa-5457f.appspot.com",
  messagingSenderId: "695573230638",
  appId: "1:695573230638:web:44babb535f730230e1dbbf",
};

firebase.initializeApp(config);

export default firebase;
