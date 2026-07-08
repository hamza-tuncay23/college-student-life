export function loadNavbar(){

    const navbar=document.getElementById("navbar");

    if(!navbar) return;

    navbar.innerHTML=`

<header class="navbar">

<div class="navbar-left">

<button
id="mobileMenuButton"
class="icon-button">

<i class="fa-solid fa-bars"></i>

</button>

<div class="breadcrumb">

<span id="breadcrumbPage">

Dashboard

</span>

</div>

</div>

<div class="navbar-center">

<div class="search-box">

<i class="fa-solid fa-magnifying-glass"></i>

<input
type="text"
id="globalSearch"
placeholder="Search anything...">

</div>

</div>

<div class="navbar-right">

<div class="clock-box">

<div
id="liveClock"
class="clock">

00:00:00

</div>

<div
id="liveDate"
class="date">

Loading...

</div>

</div>

<button
id="notificationButton"
class="icon-button">

<i class="fa-solid fa-bell"></i>

<span class="notification-dot"></span>

</button>

<button
id="languageButton"
class="icon-button">

🌍

</button>

<button
id="themeButton"
class="icon-button">

<i class="fa-solid fa-moon"></i>

</button>

<div class="profile-button">

<img
src="assets/images/default-avatar.png"
alt="avatar">

<span>

Student

</span>

<i class="fa-solid fa-chevron-down"></i>

</div>

</div>

</header>

`;

    initializeNavbar();

}

function initializeNavbar(){

    const mobile=document.getElementById("mobileMenuButton");

    mobile.onclick=()=>{

        document

            .querySelector(".sidebar")

            ?.classList.toggle("show");

    };

    updateClock();

    setInterval(updateClock,1000);

}

function updateClock(){

    const now=new Date();

    const time=now.toLocaleTimeString();

    const date=now.toLocaleDateString(

        undefined,

        {

            weekday:"long",

            day:"2-digit",

            month:"long",

            year:"numeric"

        }

    );

    document.getElementById("liveClock").textContent=time;

    document.getElementById("liveDate").textContent=date;

}
