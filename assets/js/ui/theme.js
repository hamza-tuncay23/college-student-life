// ======================================================
// College Student Life
// Theme Manager
// ======================================================

import { settings, updateSetting } from "../core/settings.js";

// ======================================================

export function initializeTheme(){

    applyTheme(settings.theme);

}

// ======================================================

export function applyTheme(theme){

    document.documentElement.setAttribute(

        "data-theme",

        theme

    );

}

// ======================================================

export async function toggleTheme(){

    const newTheme =

        settings.theme === "light"

            ? "dark"

            : "light";

    await updateSetting(

        "theme",

        newTheme

    );

    applyTheme(newTheme);

}
