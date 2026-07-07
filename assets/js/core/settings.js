// ======================================================
// College Student Life
// Settings Manager
// ======================================================

import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    setLanguage
} from "../ui/language.js";

// ======================================================

export let settings = {

    language: "en",

    theme: "light",

    accent: "blue",

    currency: "MAD",

    timeFormat: "24",

    dateFormat: "DD/MM/YYYY",

    notifications: true

};

// ======================================================

export async function initializeSettings(){

    onAuthStateChanged(auth, async(user)=>{

        if(!user) return;

        const ref = doc(db,"users",user.uid);

        const snap = await getDoc(ref);

        if(!snap.exists()){

            await setDoc(ref,{

                fullName:user.displayName ?? "",

                email:user.email,

                createdAt:serverTimestamp(),

                settings

            });

        }

        else{

            const data = snap.data();

            if(data.settings){

                settings = data.settings;

            }

        }

        applySettings();

    });

}

// ======================================================

export function applySettings(){

    setLanguage(settings.language);

    document.documentElement.dataset.theme =

        settings.theme;

}

// ======================================================

export async function updateSetting(key,value){

    settings[key]=value;

    applySettings();

    localStorage.setItem(

        "settings",

        JSON.stringify(settings)

    );

    const user = auth.currentUser;

    if(!user) return;

    await updateDoc(

        doc(db,"users",user.uid),

        {

            settings

        }

    );

}
