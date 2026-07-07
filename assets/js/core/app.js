// ======================================
// College Student Life
// Core Application Initializer
// ======================================


// DOM Ready
document.addEventListener("DOMContentLoaded", () => {

    console.log("College Student Life started");


    // ==============================
    // Initialize UI Components
    // ==============================


    if (typeof initSidebar === "function") {
        initSidebar();
    }


    if (typeof initNavbar === "function") {
        initNavbar();
    }



    // ==============================
    // Initialize Settings
    // ==============================

    if (typeof initSettings === "function") {
        initSettings();
    }



    // ==============================
    // Initialize Theme
    // ==============================

    if (typeof initTheme === "function") {
        initTheme();
    }



    // ==============================
    // Initialize Language
    // ==============================

    if (typeof initLanguage === "function") {
        initLanguage();
    }



    // ==============================
    // Page Detection
    // ==============================

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .replace(".html", "");


    console.log(
        "Current page:",
        currentPage || "index"
    );



    // ==============================
    // Global Application Ready
    // ==============================

    window.dispatchEvent(
        new Event("appReady")
    );


});
