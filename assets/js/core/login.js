// ======================================================
// College Student Life
// Authentication V2
// ======================================================

import { auth, db } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {

    initializeLanguage,

    setLanguage

} from "../ui/language.js";

// ======================================================
// ELEMENTS
// ======================================================

const loginPanel = document.getElementById("loginPanel");
const signupPanel = document.getElementById("signupPanel");
const forgotPanel = document.getElementById("forgotPanel");

const authMessage = document.getElementById("authMessage");

// Login

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const rememberMe = document.getElementById("rememberMe");
const loginButton = document.getElementById("loginButton");

// Signup

const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupConfirm = document.getElementById("signupConfirm");
const signupButton = document.getElementById("signupButton");

// Forgot

const forgotEmail = document.getElementById("forgotEmail");
const forgotButton = document.getElementById("forgotButton");

// Links

document.getElementById("showSignup").onclick = e => {

    e.preventDefault();

    showPanel("signup");

};

document.getElementById("showForgot").onclick = e => {

    e.preventDefault();

    showPanel("forgot");

};

document.getElementById("showLogin").onclick = e => {

    e.preventDefault();

    showPanel("login");

};

document.getElementById("showLogin2").onclick = e => {

    e.preventDefault();

    showPanel("login");

};

// ======================================================

function showPanel(panel){

    loginPanel.classList.add("hidden");

    signupPanel.classList.add("hidden");

    forgotPanel.classList.add("hidden");

    authMessage.textContent="";

    if(panel==="login"){

        loginPanel.classList.remove("hidden");

    }

    if(panel==="signup"){

        signupPanel.classList.remove("hidden");

    }

    if(panel==="forgot"){

        forgotPanel.classList.remove("hidden");

    }

}

// ======================================================
// LOGIN
// ======================================================

loginButton.onclick = async ()=>{

    authMessage.textContent="";

    if(
        loginEmail.value.trim()===""
        ||
        loginPassword.value===""){

        authMessage.textContent="Please fill all fields.";

        return;

    }

    try{

        await setPersistence(

            auth,

            rememberMe.checked
                ? browserLocalPersistence
                : browserSessionPersistence

        );

        loginButton.disabled=true;

        loginButton.textContent="Signing in...";

        await signInWithEmailAndPassword(

            auth,

            loginEmail.value.trim(),

            loginPassword.value

        );

        window.location.href="index.html";

    }

    catch(error){

        authMessage.textContent="Incorrect email or password.";

    }

    finally{

        loginButton.disabled=false;

        loginButton.textContent="Login";

    }

};

// ======================================================
// SIGNUP
// ======================================================

signupButton.onclick = async ()=>{

    authMessage.textContent="";

    if(

        signupName.value.trim()===""
        ||

        signupEmail.value.trim()===""
        ||

        signupPassword.value===""

        ||

        signupConfirm.value===""

    ){

        authMessage.textContent="Please fill all fields.";

        return;

    }

    if(signupPassword.value!==signupConfirm.value){

        authMessage.textContent="Passwords do not match.";

        return;

    }

    if(signupPassword.value.length<6){

        authMessage.textContent="Password must contain at least 6 characters.";

        return;

    }

    try{

        signupButton.disabled=true;

        signupButton.textContent="Creating...";

        const credential=

            await createUserWithEmailAndPassword(

                auth,

                signupEmail.value.trim(),

                signupPassword.value

            );

        await updateProfile(

            credential.user,

            {

                displayName:signupName.value.trim()

            }

        );

        await setDoc(

            doc(db,"users",credential.user.uid),

            {

                uid:credential.user.uid,

                fullName:signupName.value.trim(),

                email:signupEmail.value.trim(),

                theme:"light",

                language:"en",

                role:"student",

                createdAt:serverTimestamp()

            }

        );

        authMessage.style.color="green";

        authMessage.textContent="Account created successfully.";

        showPanel("login");

    }

    catch(error){

        authMessage.style.color="red";

        authMessage.textContent=error.message;

    }

    finally{

        signupButton.disabled=false;

        signupButton.textContent="Create Account";

    }

};

// ======================================================
// RESET PASSWORD
// ======================================================

forgotButton.onclick = async ()=>{

    authMessage.textContent="";

    if(forgotEmail.value.trim()===""){

        authMessage.textContent="Enter your email.";

        return;

    }

    try{

        await sendPasswordResetEmail(

            auth,

            forgotEmail.value.trim()

        );

        authMessage.style.color="green";

        authMessage.textContent=

            "Password reset email sent.";

    }

    catch(error){

        authMessage.style.color="red";

        authMessage.textContent=

            error.message;

    }

};
initializeLanguage();
