// ======================================================
// College Student Life
// Language Manager
// ======================================================

import en from "../../languages/en.js";
import fr from "../../languages/fr.js";
import ar from "../../languages/ar.js";
import tr from "../../languages/tr.js";
import ja from "../../languages/ja.js";

// ======================================================

const languages = {

    en,
    fr,
    ar,
    tr,
    ja

};

// ======================================================

let currentLanguage = "en";

// ======================================================

export function initializeLanguage(){

    const savedLanguage =
        localStorage.getItem("language");

    if(savedLanguage && languages[savedLanguage]){

        currentLanguage = savedLanguage;

    }

    applyDirection();

    translatePage();

    initializeLanguageButtons();

}

// ======================================================

export function setLanguage(language){

    if(!languages[language]) return;

    currentLanguage = language;

    localStorage.setItem(

        "language",

        language

    );

    applyDirection();

    translatePage();

}

// ======================================================

export function getLanguage(){

    return currentLanguage;

}

// ======================================================

export function t(path){

    const keys = path.split(".");

    let value = languages[currentLanguage];

    for(const key of keys){

        value = value?.[key];

    }

    return value ?? path;

}

// ======================================================

function translatePage(){

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element=>{

            const key =
                element.dataset.i18n;

            element.textContent = t(key);

        });

}

// ======================================================

function applyDirection(){

    if(currentLanguage==="ar"){

        document.documentElement.dir="rtl";

        document.documentElement.lang="ar";

    }

    else{

        document.documentElement.dir="ltr";

        document.documentElement.lang=currentLanguage;

    }

}
function initializeLanguageButtons(){

    const buttons =
        document.querySelectorAll(".language-button");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            setLanguage(

                button.dataset.language

            );

        });

    });

}
