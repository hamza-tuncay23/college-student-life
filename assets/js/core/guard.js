// ======================================================
// College Student Life
// Route Guard
// ======================================================

import { auth } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

export function initializeGuard() {

    onAuthStateChanged(auth, (user) => {

        const page = window.location.pathname.split("/").pop();

        const authPages = [

            "login.html",
            "signup.html",
            "forgot-password.html",
            ""

        ];

        // ------------------------------------------
        // User not connected
        // ------------------------------------------

        if (!user) {

            if (!authPages.includes(page)) {

                window.location.replace("login.html");

            }

            return;

        }

        // ------------------------------------------
        // User connected
        // ------------------------------------------

        if (authPages.includes(page)) {

            window.location.replace("index.html");

        }

    });

}
