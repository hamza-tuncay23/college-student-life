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

        const page = window.location.pathname.split("/").pop();

        const authPages = [

            "login.html",
            "signup.html",
            "forgot-password.html"

        ];

        // ==========================
        // USER NOT CONNECTED
        // ==========================

        if (!user) {

            if (!authPages.includes(page)) {

                window.location.href = "login.html";

            }

            return;

        }

        // ==========================
        // EMAIL NOT VERIFIED
        // ==========================

       

        // ==========================
        // USER CONNECTED
        // ==========================

        console.log("Connected :", user.email);

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
