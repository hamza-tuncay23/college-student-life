// ======================================
// College Student Life
// Core Application
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Starting College Student Life...");

    firebase.auth().onAuthStateChanged(user => {

        if (!user) {
            return;
        }

        initializeApplication(user);

    });

});



function initializeApplication(user) {

    console.log("User:", user.email);



    // ==========================
    // UI
    // ==========================

    if (typeof initSidebar === "function") {
        initSidebar();
    }

    if (typeof initNavbar === "function") {
        initNavbar();
    }



    // ==========================
    // Settings
    // ==========================

    if (typeof initSettings === "function") {
        initSettings();
    }



    // ==========================
    // Theme
    // ==========================

    if (typeof initTheme === "function") {
        initTheme();
    }



    // ==========================
    // Language
    // ==========================

    if (typeof initLanguage === "function") {
        initLanguage();
    }



    // ==========================
    // Current Page
    // ==========================

    const page = window.location.pathname
        .split("/")
        .pop()
        .replace(".html", "") || "index";

    document.body.dataset.page = page;

    console.log("Page:", page);



    // ==========================
    // Global Event
    // ==========================

    window.dispatchEvent(new CustomEvent("appReady", {

        detail: {

            page,

            user

        }

    }));



    console.log("Application Ready");

}
