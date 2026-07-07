import { auth } from "../core/firebase.js";
import { getCurrentLanguage, t } from "./language.js";

const MENU = [
    { page: "index.html",      key: "dashboard", icon: "fa-solid fa-house" },
    { page: "schedule.html",   key: "schedule",  icon: "fa-solid fa-calendar-days" },
    { page: "tasks.html",      key: "tasks",     icon: "fa-solid fa-list-check" },
    { page: "habits.html",     key: "habits",    icon: "fa-solid fa-fire" },
    { page: "budget.html",     key: "budget",    icon: "fa-solid fa-wallet" },
    { page: "wishlist.html",   key: "wishlist",  icon: "fa-solid fa-heart" },
    { page: "calendar.html",   key: "calendar",  icon: "fa-solid fa-calendar" },
    { page: "drive.html",      key: "drive",     icon: "fa-solid fa-cloud" },
    { page: "nutrition.html",  key: "nutrition", icon: "fa-solid fa-apple-whole" },
    { page: "sport.html",      key: "sport",     icon: "fa-solid fa-dumbbell" },
    { page: "pomodoro.html",   key: "pomodoro",  icon: "fa-solid fa-clock" },
    { page: "religion.html",   key: "religion",  icon: "fa-solid fa-mosque" },
    { page: "notes.html",      key: "notes",     icon: "fa-solid fa-note-sticky" },
    { page: "settings.html",   key: "settings",  icon: "fa-solid fa-gear" }
];

export function loadSidebar() {

    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    const currentPage = window.location.pathname.split("/").pop();

    sidebar.className = "sidebar";

    sidebar.innerHTML = `

        <div class="sidebar-logo">

            <img src="assets/icons/logo.svg" alt="Logo">

            <h2>College Student Life</h2>

        </div>

        <nav class="sidebar-menu">

            <ul>

                ${MENU.map(item => `

                    <li>

                        <a
                            href="${item.page}"
                            class="sidebar-item ${currentPage === item.page ? "active" : ""}"
                        >

                            <i class="${item.icon}"></i>

                            <span>${t(item.key)}</span>

                        </a>

                    </li>

                `).join("")}

            </ul>

        </nav>

        <div class="sidebar-footer">

            <div class="sidebar-user">

                <div class="sidebar-avatar">

                    ${(auth.currentUser?.displayName || auth.currentUser?.email || "U")[0].toUpperCase()}

                </div>

                <div class="sidebar-user-info">

                    <strong>

                        ${auth.currentUser?.displayName || "Student"}

                    </strong>

                    <small>

                        ${auth.currentUser?.email || ""}

                    </small>

                </div>

            </div>

        </div>

    `;

}
