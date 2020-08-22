importScripts("https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.17.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC0D0v4o0VIRSiv4-hIB54hohkd4P3WELo",
  authDomain: "quiz-pwa-5457f.firebaseapp.com",
  databaseURL: "https://quiz-pwa-5457f.firebaseio.com",
  projectId: "quiz-pwa-5457f",
  storageBucket: "quiz-pwa-5457f.appspot.com",
  messagingSenderId: "695573230638",
  appId: "1:695573230638:web:44babb535f730230e1dbbf",
});

firebase.messaging();
