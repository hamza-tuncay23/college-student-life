// ======================================
// College Student Life
// Schedule Page
// ======================================

const SCHEDULE_COLLECTION = "schedule";

let scheduleItems = [];

let unsubscribeSchedule = null;



function initSchedule() {

    console.log("Schedule module loaded.");

    loadSchedule();

}



// ===============================
// Load Schedule
// ===============================

function loadSchedule() {

    if (unsubscribeSchedule) {

        unsubscribeSchedule();

    }

    unsubscribeSchedule = listenCollection(

        SCHEDULE_COLLECTION,

        items => {

            scheduleItems = items;

            renderSchedule();

        }

    );

}



// ===============================
// Render
// ===============================

function renderSchedule() {

    console.log("Schedule:", scheduleItems);

}



// ===============================
// Create
// ===============================

async function createScheduleItem(data) {

    await addDocument(

        SCHEDULE_COLLECTION,

        data

    );

}



// ===============================
// Update
// ===============================

async function updateScheduleItem(id, data) {

    await updateDocument(

        SCHEDULE_COLLECTION,

        id,

        data

    );

}



// ===============================
// Delete
// ===============================

async function deleteScheduleItem(id) {

    await deleteDocument(

        SCHEDULE_COLLECTION,

        id

    );

}



// ===============================
// Cleanup
// ===============================

window.addEventListener("beforeunload", () => {

    if (unsubscribeSchedule) {

        unsubscribeSchedule();

    }

});
