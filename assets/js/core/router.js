// ======================================================
// College Student Life
// Router
// ======================================================

import { renderDashboard } from "../pages/dashboard.js";
import { renderTasks } from "../pages/tasks.js";
import { renderHabits } from "../pages/habits.js";
import { renderBudget } from "../pages/budget.js";
import { renderWishlist } from "../pages/wishlist.js";
import { renderCalendar } from "../pages/calendar.js";
import { renderDrive } from "../pages/drive.js";
import { renderNutrition } from "../pages/nutrition.js";
import { renderSport } from "../pages/sport.js";
import { renderPomodoro } from "../pages/pomodoro.js";
import { renderReligion } from "../pages/religion.js";
import { renderNotes } from "../pages/notes.js";

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

        case "tasks":

            content.innerHTML = renderTasks();
        
            break;
        
        case "habits":
        
            content.innerHTML = renderHabits();
        
            break;
        
        case "budget":
        
            content.innerHTML = renderBudget();
        
            break;
        
        case "wishlist":
        
            content.innerHTML = renderWishlist();
        
            break;
        
        case "calendar":
        
            content.innerHTML = renderCalendar();
        
            break;
        
        case "drive":
        
            content.innerHTML = renderDrive();
        
            break;
        
        case "nutrition":
        
            content.innerHTML = renderNutrition();
        
            break;
        
        case "sport":
        
            content.innerHTML = renderSport();
        
            break;
        
        case "pomodoro":
        
            content.innerHTML = renderPomodoro();
        
            break;
        
        case "religion":
        
            content.innerHTML = renderReligion();
        
            break;
        
        case "notes":
        
            content.innerHTML = renderNotes();
        
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
