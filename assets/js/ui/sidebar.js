const MENU = [
    { title: "Dashboard", icon: "fa-solid fa-house", page: "index.html" },
    { title: "Schedule", icon: "fa-solid fa-calendar-days", page: "schedule.html" },
    { title: "Tasks", icon: "fa-solid fa-list-check", page: "tasks.html" },
    { title: "Habits", icon: "fa-solid fa-fire", page: "habits.html" },
    { title: "Budget", icon: "fa-solid fa-wallet", page: "budget.html" },
    { title: "Wishlist", icon: "fa-solid fa-heart", page: "wishlist.html" },
    { title: "Calendar", icon: "fa-solid fa-calendar", page: "calendar.html" },
    { title: "Drive", icon: "fa-solid fa-cloud", page: "drive.html" },
    { title: "Nutrition", icon: "fa-solid fa-apple-whole", page: "nutrition.html" },
    { title: "Sport", icon: "fa-solid fa-dumbbell", page: "sport.html" },
    { title: "Pomodoro", icon: "fa-solid fa-clock", page: "pomodoro.html" },
    { title: "Religion", icon: "fa-solid fa-mosque", page: "religion.html" },
    { title: "Notes", icon: "fa-solid fa-note-sticky", page: "notes.html" },
    { title: "Settings", icon: "fa-solid fa-gear", page: "settings.html" }
];

export function loadSidebar() {

    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    sidebar.className = "sidebar";

    sidebar.innerHTML = `

        <div class="sidebar-logo">

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

                            <span>${item.title}</span>

                        </a>

                    </li>

                `).join("")}

            </ul>

        </nav>

        <div class="sidebar-footer">

            <div class="sidebar-user">

                <div class="sidebar-avatar">

                    CSL

                </div>

                <div class="sidebar-user-info">

                    <strong>College Student Life</strong>

                    <small>Version 1.0</small>

                </div>

            </div>

        </div>

    `;

}
