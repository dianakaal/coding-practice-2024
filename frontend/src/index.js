import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is 

// below keys are public
const firebaseConfig = {
  apiKey: "AIzaSyDaDIDkynJJTVBTd_TX1NZFTweXzDv2VEU",
  authDomain: "react-practice-2e9a7.firebaseapp.com",
  projectId: "react-practice-2e9a7",
  storageBucket: "react-practice-2e9a7.appspot.com",
  messagingSenderId: "87658852379",
  appId: "1:87658852379:web:9875914f624689291748be",
  measurementId: "G-MJRGD05STK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);//not using Analytics yet

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
