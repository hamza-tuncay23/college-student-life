// ======================================================
// College Student Life
// Core Application
// Version 1.0
// ======================================================

import { initializeTheme } from "../ui/theme.js";
import { initializeLanguage } from "../ui/language.js";

class CollegeStudentLife {

    constructor() {

        this.init();

    }

    init() {

        console.log(
            "%cCollege Student Life",
            "color:#2962ff;font-size:18px;font-weight:bold;"
        );

        this.startClock();

        initializeTheme();

        initializeLanguage();

        this.initializeHeaderButtons();

    }

    // ==================================================
    // CLOCK
    // ==================================================

    startClock() {

        const element = document.getElementById("dateTime");

        if (!element) return;

        const update = () => {

            const now = new Date();

            const date = now.toLocaleDateString();

            const time = now.toLocaleTimeString();

            element.textContent = `${date} ${time}`;

        };

        update();

        setInterval(update,1000);

    }

    // ==================================================
    // HEADER BUTTONS
    // ==================================================

    initializeHeaderButtons() {

        const profileButton =
            document.getElementById("profileButton");

        const settingsButton =
            document.getElementById("settingsButton");

        const themeButton =
            document.getElementById("themeButton");

        if(profileButton){

            profileButton.addEventListener("click",()=>{

                console.log("Profile");

            });

        }

        if(settingsButton){

            settingsButton.addEventListener("click",()=>{

                console.log("Settings");

            });

        }

        if(themeButton){

            themeButton.addEventListener("click",()=>{

                document.body.classList.toggle("dark");

                document.body.classList.toggle("light");

                localStorage.setItem(
                    "theme",
                    document.body.classList.contains("dark")
                        ? "dark"
                        : "light"
                );

            });

        }

    }

}

document.addEventListener("DOMContentLoaded",()=>{

    new CollegeStudentLife();

});
