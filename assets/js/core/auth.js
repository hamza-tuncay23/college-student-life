// ======================================================
// College Student Life
// Authentication
// ======================================================

import {

    auth

} from "./firebase.js";

import {

    onAuthStateChanged,
    signOut

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// ======================================================

export function initializeAuth() {

    onAuthStateChanged(auth, (user) => {

        if (user) {

            console.log("Connected :", user.email);

        } else {

            console.log("No user connected.");

        }

    });

}

// ======================================================

export async function logout() {

    try {

        await signOut(auth);

        window.location.href = "login.html";

    }

    catch (error) {

        console.error(error);

    }

}
