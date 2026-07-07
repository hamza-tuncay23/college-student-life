import { auth } from "../core/firebase.js";

export function loadNavbar() {

    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    const user = auth.currentUser;

    const name =
        user?.displayName ||
        "Student";

    const email =
        user?.email ||
        "";

    const avatar =
        name.charAt(0).toUpperCase();

    navbar.className = "navbar";

    navbar.innerHTML = `

        <div class="navbar-left">

            <button
                class="navbar-toggle"
                id="sidebarToggle"
            >

                <i class="fa-solid fa-bars"></i>

            </button>

            <div class="navbar-search">

                <i class="fa-solid fa-magnifying-glass"></i>

                <input
                    type="text"
                    id="globalSearch"
                    placeholder="Search..."
                >

            </div>

        </div>

        <div class="navbar-right">

            <button
                class="navbar-icon"
                id="languageButton"
            >

                <i class="fa-solid fa-language"></i>

            </button>

            <button
                class="navbar-icon"
                id="themeButton"
            >

                <i class="fa-solid fa-moon"></i>

            </button>

            <button
                class="navbar-icon"
                id="notificationButton"
            >

                <i class="fa-solid fa-bell"></i>

            </button>

            <div class="navbar-user">

                <div class="navbar-avatar">

                    ${avatar}

                </div>

                <div class="navbar-user-info">

                    <strong>${name}</strong>

                    <small>${email}</small>

                </div>

            </div>

        </div>

    `;

}
