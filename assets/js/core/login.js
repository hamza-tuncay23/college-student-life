// ======================================================
// College Student Life
// Login
// ======================================================

import { auth } from "./firebase.js";

import {

    signInWithEmailAndPassword,
    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// ======================================================

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("loginButton");
const errorMessage = document.getElementById("errorMessage");

// ======================================================
// AUTO LOGIN
// ======================================================

onAuthStateChanged(auth, (user) => {

    if (user) {

        window.location.href = "index.html";

    }

});

// ======================================================
// LOGIN
// ======================================================

loginButton.addEventListener("click", login);

passwordInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        login();

    }

});

async function login() {

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    errorMessage.textContent = "";

    if (!email || !password) {

        errorMessage.textContent = "Please fill in all fields.";

        return;

    }

    try {

        loginButton.disabled = true;

        loginButton.textContent = "Signing in...";

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        
        window.location.href = "index.html";

    }

    catch (error) {

        switch (error.code) {

            case "auth/invalid-email":
                errorMessage.textContent = "Invalid email address.";
                break;

            case "auth/user-not-found":
                errorMessage.textContent = "No account found.";
                break;

            case "auth/wrong-password":
                errorMessage.textContent = "Incorrect password.";
                break;

            case "auth/invalid-credential":
                errorMessage.textContent = "Incorrect email or password.";
                break;

            default:
                errorMessage.textContent = error.message;

        }

    }

    finally {

        loginButton.disabled = false;

        loginButton.textContent = "Login";

    }

}
