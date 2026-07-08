// ======================================================
// College Student Life
// Firebase Configuration
// ======================================================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ======================================================

const firebaseConfig = {

    apiKey: "AIzaSyAF33_gGGfro5NXFAktJKlqfd0bMbfwo98",

    authDomain: "college-student-life-a17bf.firebaseapp.com",

    projectId: "college-student-life-a17bf",

    storageBucket: "college-student-life-a17bf.firebasestorage.app",

    messagingSenderId: "41108268695",

    appId: "1:41108268695:web:61a3b8a03dddb57d68abd2",

    measurementId: "G-612YY709BK"

};

// ======================================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

// ======================================================

export {

    app,

    auth,

    db

};
