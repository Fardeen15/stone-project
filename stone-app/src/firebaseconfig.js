import * as firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyBY3HX1U2vJXTAEmhxq7jpkbIZoqDurWUw",
    authDomain: "stones-project-bd0c4.firebaseapp.com",
    databaseURL: "https://stones-project-bd0c4.firebaseio.com",
    projectId: "stones-project-bd0c4",
    storageBucket: "",
    messagingSenderId: "1061716478180",
    appId: "1:1061716478180:web:3c050c7479ad9165"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export var db = firebase.database();