// ======================================================
// College Student Life
// Router
// ======================================================

import { renderDashboard } from "../pages/dashboard.js";

const routes = {

    dashboard: {
        title: "Dashboard",
        background: "dashboard-bg.jpg"
    },

    tasks: {
        title: "Tasks",
        background: "tasks-bg.jpg"
    },

    habits: {
        title: "Habits",
        background: "habits-bg.jpg"
    },

    budget: {
        title: "Budget",
        background: "budget-bg.jpg"
    },

    wishlist: {
        title: "Wishlist",
        background: "wishlist-bg.jpg"
    },

    calendar: {
        title: "Calendar",
        background: "calendar-bg.jpg"
    },

    drive: {
        title: "Drive",
        background: "drive-bg.jpg"
    },

    nutrition: {
        title: "Nutrition",
        background: "nutrition-bg.jpg"
    },

    sport: {
        title: "Sport",
        background: "sport-bg.jpg"
    },

    pomodoro: {
        title: "Pomodoro",
        background: "pomodoro-bg.jpg"
    },

    religion: {
        title: "Religion",
        background: "religion-bg.jpg"
    },

    notes: {
        title: "Notes",
        background: "note-bg.jpg"
    }

};

export function initializeRouter(){

    const buttons =
        document.querySelectorAll(".sectionButton");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            buttons.forEach(btn=>{

                btn.classList.remove("active");

            });

            button.classList.add("active");

            const page =
                button.textContent.trim().toLowerCase();

            changeBackground(page);

            (page);

        });

    });

}

function changeBackground(page){

    if(!routes[page]) return;

    document.body.style.setProperty(

        "--background-image",

        `url("../../backgrounds/${routes[page].background}")`

    );

}

function loadPage(page){

    const content = document.getElementById("dashboardSection");

    if(!content) return;

    content.classList.remove("fadeIn");

    void content.offsetWidth;

    content.classList.add("fadeIn");

    switch(page){

        case "dashboard":

            content.innerHTML = renderDashboard();

            break;

        default:

            content.innerHTML = `

                <div class="comingSoon">

                    <h1>${routes[page].title}</h1>

                    <p>

                        This page is under development.

                    </p>

                </div>

            `;

    }

    document.title = routes[page].title + " | College Student Life";

}
