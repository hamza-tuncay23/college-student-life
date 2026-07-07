import {
    renderScheduleGrid,
    renderSessions,
    renderUpcomingClass,
    renderSubjects,
    initializeGridEvents
} from "./schedule.ui.js";

import {
    listenSchedule,
    getSubjects,
    getUpcomingClass
} from "./schedule.firestore.js";

import {
    initializeScheduleModal
} from "./schedule.modal.js";

document.addEventListener("DOMContentLoaded", initSchedule);

function initSchedule() {

    // Génère la grille vide
    renderScheduleGrid();
    initializeGridEvents();

    // Initialise la fenêtre Ajouter / Modifier
    initializeScheduleModal();

    // Charge les données Firestore
    loadSchedule();

    // Bouton +
    bindEvents();

}

function loadSchedule() {

    listenSchedule((sessions) => {

        renderSessions(sessions);

        renderUpcomingClass(
            getUpcomingClass(sessions)
        );

        renderSubjects(
            getSubjects(sessions)
        );

    });

}

function bindEvents() {

    // Bouton Ajouter
    const addButton = document.getElementById("addSessionBtn");

    if (addButton) {

        addButton.addEventListener("click", () => {

            document.dispatchEvent(
                new CustomEvent("schedule:add")
            );

        });

    }

    // Recherche
    const search = document.getElementById("scheduleSearch");

    if (search) {

        search.addEventListener("input", e => {

            document.dispatchEvent(
                new CustomEvent("schedule:search", {
                    detail: e.target.value
                })
            );

        });

    }

}
