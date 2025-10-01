import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import './index.css'
import App from './App.jsx'

// 🔥 Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAsFwKygmx21k9JhJdY36fh03ZiqIYHq_E",
  authDomain: "finalcoder-88065.firebaseapp.com",
  projectId: "finalcoder-88065",
  storageBucket: "finalcoder-88065.appspot.com",
  messagingSenderId: "668396372965",
  appId: "1:668396372965:web:976943282224bee6fde50c",
  measurementId: "G-Z14SXWCGDV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app); 

createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>
);
