export function loadNavbar() {

    const navbar = document.getElementById("navbar");

    if (!navbar) return;

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
                    placeholder="Search..."
                >

            </div>

        </div>

        <div class="navbar-right">

            <button class="navbar-icon">

                <i class="fa-solid fa-language"></i>

            </button>

            <button class="navbar-icon">

                <i class="fa-solid fa-moon"></i>

            </button>

            <button class="navbar-icon">

                <i class="fa-solid fa-bell"></i>

            </button>

            <div class="navbar-user">

                <div class="navbar-avatar">

                    C

                </div>

                <div class="navbar-user-info">

                    <strong>College Student</strong>

                    <small>student@email.com</small>

                </div>

            </div>

        </div>

    `;

    const toggle = document.getElementById("sidebarToggle");

    toggle.addEventListener("click", () => {

        document.querySelector(".sidebar")?.classList.toggle("collapsed");

    });

}
