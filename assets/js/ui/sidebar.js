const MENU = [

    {
        title: "Dashboard",
        icon: "fa-solid fa-house",
        page: "index.html"
    },

    {
        title: "Schedule",
        icon: "fa-solid fa-calendar-days",
        page: "schedule.html"
    },

    {
        title: "Tasks",
        icon: "fa-solid fa-list-check",
        page: "tasks.html"
    },

    {
        title: "Habits",
        icon: "fa-solid fa-repeat",
        page: "habits.html"
    },

    {
        title: "Budget",
        icon: "fa-solid fa-wallet",
        page: "budget.html"
    },

    {
        title: "Wishlist",
        icon: "fa-solid fa-heart",
        page: "wishlist.html"
    },

    {
        title: "Calendar",
        icon: "fa-solid fa-calendar",
        page: "calendar.html"
    },

    {
        title: "Drive",
        icon: "fa-solid fa-folder-open",
        page: "drive.html"
    },

    {
        title: "Nutrition",
        icon: "fa-solid fa-utensils",
        page: "nutrition.html"
    },

    {
        title: "Sport",
        icon: "fa-solid fa-dumbbell",
        page: "sport.html"
    },

    {
        title: "Pomodoro",
        icon: "fa-solid fa-clock",
        page: "pomodoro.html"
    },

    {
        title: "Religion",
        icon: "fa-solid fa-mosque",
        page: "religion.html"
    },

    {
        title: "Notes",
        icon: "fa-solid fa-note-sticky",
        page: "notes.html"
    },

    {
        title: "Settings",
        icon: "fa-solid fa-gear",
        page: "settings.html"
    }

];

export function loadSidebar(){

    const sidebar=document.getElementById("sidebar");

    if(!sidebar) return;

    const current=window.location.pathname.split("/").pop();

    sidebar.innerHTML=`

<aside class="sidebar">

<div class="sidebar-header">

<div class="sidebar-logo">

<div class="logo-icon">

<i class="fa-solid fa-graduation-cap"></i>

</div>

<div>

<h2>College</h2>

<p>Student Life</p>

</div>

</div>

<button
id="collapseSidebar"
class="collapse-button">

<i class="fa-solid fa-bars"></i>

</button>

</div>

<div class="sidebar-profile">

<img
src="assets/images/default-avatar.png"
alt="avatar"
id="sidebarAvatar">

<h3 id="sidebarUsername">

Loading...

</h3>

<p id="sidebarEmail">

Loading...

</p>

</div>

<nav class="sidebar-navigation">

${MENU.map(item=>`

<a
href="${item.page}"
class="sidebar-link ${current===item.page?"active":""}">

<i class="${item.icon}"></i>

<span>

${item.title}

</span>

</a>

`).join("")}

</nav>

<div class="sidebar-footer">

<button
class="logout-button"
id="logoutButton">

<i class="fa-solid fa-right-from-bracket"></i>

<span>

Logout

</span>

</button>

</div>

</aside>

`;

    initializeSidebar();

}

function initializeSidebar(){

    const collapse=document.getElementById("collapseSidebar");

    collapse.onclick=()=>{

        document.body.classList.toggle("sidebar-collapsed");

        localStorage.setItem(

            "sidebar",

            document.body.classList.contains("sidebar-collapsed")
        );

    };

    if(localStorage.getItem("sidebar")==="true"){

        document.body.classList.add("sidebar-collapsed");

    }

    const logout=document.getElementById("logoutButton");

    logout.onclick=()=>{

        if(confirm("Logout ?")){

            window.location.href="login.html";

        }

    };

}
