import { initializeFirebase } from "./firebase.js";

import { checkAuth } from "./guard.js";

import { loadSidebar } from "../ui/sidebar.js";

import { loadNavbar } from "../ui/navbar.js";

import { initializeTheme } from "../ui/theme.js";

import { initializeLanguage } from "../ui/language.js";

import { initializeToast } from "../ui/toast.js";

import { initializeLoader } from "../ui/loader.js";

document.addEventListener(

    "DOMContentLoaded",

    async()=>{

        try{

            initializeLoader();

            initializeTheme();

            initializeLanguage();

            initializeToast();

            initializeFirebase();

            await checkAuth();

            loadSidebar();

            loadNavbar();

            initializeGlobalUI();

        }

        catch(error){

            console.error(error);

        }

    }

);

function initializeGlobalUI(){

    updateBreadcrumb();

    initializeSearch();

    initializeNotifications();

    initializeProfileMenu();

}

function updateBreadcrumb(){

    const pages={

        "index.html":"Dashboard",

        "schedule.html":"Schedule",

        "tasks.html":"Tasks",

        "habits.html":"Habits",

        "budget.html":"Budget",

        "wishlist.html":"Wishlist",

        "calendar.html":"Calendar",

        "drive.html":"Drive",

        "nutrition.html":"Nutrition",

        "sport.html":"Sport",

        "pomodoro.html":"Pomodoro",

        "religion.html":"Religion",

        "notes.html":"Notes",

        "settings.html":"Settings"

    };

    const file=

        window.location.pathname

        .split("/")

        .pop()

        ||"index.html";

    const breadcrumb=

        document.getElementById(

            "breadcrumbPage"

        );

    if(breadcrumb){

        breadcrumb.textContent=

            pages[file]||

            "College Student Life";

    }

}

function initializeSearch(){

    const input=

        document.getElementById(

            "globalSearch"

        );

    if(!input) return;

    input.addEventListener(

        "input",

        ()=>{

            const value=

                input.value

                .trim()

                .toLowerCase();

            console.log(

                "Search :",

                value

            );

        }

    );

}

function initializeNotifications(){

    const button=

        document.getElementById(

            "notificationButton"

        );

    if(!button) return;

    button.onclick=()=>{

        alert(

            "Notifications Center\nComing Soon"

        );

    };

}

function initializeProfileMenu(){

    const profile=

        document.querySelector(

            ".profile-button"

        );

    if(!profile) return;

    profile.onclick=()=>{

        alert(

`Profile

Settings

Logout

(Coming Soon)`);

    };

}
