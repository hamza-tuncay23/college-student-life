// ======================================================
// College Student Life
// Sign Up
// ======================================================

import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ======================================================

const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const signupButton = document.getElementById("signupButton");
const errorMessage = document.getElementById("errorMessage");

// ======================================================

signupButton.addEventListener("click", signUp);

confirmPasswordInput.addEventListener("keydown", (event) => {

    if(event.key === "Enter"){

        signUp();

    }

});

// ======================================================

async function signUp(){

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    errorMessage.textContent = "";

    if(!fullName || !email || !password || !confirmPassword){

        errorMessage.textContent = "Please fill in all fields.";

        return;

    }

    if(password !== confirmPassword){

        errorMessage.textContent = "Passwords do not match.";

        return;

    }

    if(password.length < 6){

        errorMessage.textContent = "Password must contain at least 6 characters.";

        return;

    }

    try{

        signupButton.disabled = true;
        signupButton.textContent = "Creating account...";

        const credential = await createUserWithEmailAndPassword(

            auth,
            email,
            password

        );

        const user = credential.user;

        await sendEmailVerification(user);

        await setDoc(

            doc(db,"users",user.uid),

            {

                uid:user.uid,

                fullName:fullName,

                email:email,

                role:"student",

                language:"en",

                theme:"light",

                createdAt:serverTimestamp()

            }

        );

        alert("Account created successfully.\n\nPlease verify your email before logging in.");

        window.location.href="login.html";

    }

    catch(error){

        switch(error.code){

            case "auth/email-already-in-use":

                errorMessage.textContent="This email is already used.";

                break;

            case "auth/invalid-email":

                errorMessage.textContent="Invalid email.";

                break;

            case "auth/weak-password":

                errorMessage.textContent="Weak password.";

                break;

            default:

                errorMessage.textContent=error.message;

        }

    }

    finally{

        signupButton.disabled=false;

        signupButton.textContent="Create Account";

    }

}
