import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENTER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
console.log(firebaseConfig)
// apiKey: "AIzaSyBquHT6uIDNmHWihPXqtn0CLql7_g_-sn0",
// authDomain: "realtime-a9109.firebaseapp.com",
// projectId: "realtime-a9109",
// databaseURL: "https://realtime-a9109-default-rtdb.europe-west1.firebasedatabase.app/",
// storageBucket: "realtime-a9109.appspot.com",
// messagingSenderId: "168048120228",
// appId: "1:168048120228:web:40e5a64ec4c88036717131",
// measurementId: "G-PJTQMHD81T"
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);