import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js';
import { getDatabase, ref, set, onValue, child, get } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyCS33UYvaWxVGCGgiE8S_W7_7jB6VUpo6w",
    authDomain: "ecolog-dcad8.firebaseapp.com",
    databaseURL: "https://ecolog-dcad8-default-rtdb.firebaseio.com",
    projectId: "ecolog-dcad8",
    storageBucket: "ecolog-dcad8.appspot.com",
    messagingSenderId: "94600199034",
    appId: "1:94600199034:web:cc151763a1cdbb6c08f4c3",
    measurementId: "G-Z22R38FL39"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// Initialize Firebase

export function nuevosDatos() {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, 'metricas/'))
}