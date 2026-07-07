const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

const TIME_SLOTS = [
    {
        id: 1,
        label: "08:00 - 10:00",
        start: "08:00",
        end: "10:00"
    },
    {
        id: 2,
        label: "10:00 - 12:00",
        start: "10:00",
        end: "12:00"
    },
    {
        id: 3,
        label: "12:00 - 14:00",
        start: "12:00",
        end: "14:00"
    },
    {
        id: 4,
        label: "14:00 - 16:00",
        start: "14:00",
        end: "16:00"
    },
    {
        id: 5,
        label: "16:00 - 18:00",
        start: "16:00",
        end: "18:00"
    },
    {
        id: 6,
        label: "18:00 - 20:00",
        start: "18:00",
        end: "20:00"
    }
];

export function renderScheduleGrid() {

    const container = document.getElementById("scheduleContainer");

    if (!container) return;

    let html = "";

    /* HEADER */

    html += `
        <div class="schedule-header-cell"></div>
    `;

    TIME_SLOTS.forEach(slot => {

        html += `
            <div class="schedule-header-cell">

                ${slot.label}

            </div>
        `;

    });

    /* ROWS */

    DAYS.forEach(day => {

        html += `

            <div class="schedule-day">

                ${day}

            </div>

        `;

        TIME_SLOTS.forEach(slot => {

            html += `

                <div
                    class="schedule-cell"
                    data-day="${day}"
                    data-slot="${slot.id}"
                >

                    <button
                        class="add-session"

                        data-day="${day}"
                        data-slot="${slot.id}"

                    >

                        +

                    </button>

                </div>

            `;

        });

    });

    container.innerHTML = html;

}

export function renderSessions(sessions) {

    renderScheduleGrid();

    sessions.forEach(session => {

        const cell = document.querySelector(

            `.schedule-cell[data-day="${session.day}"][data-slot="${session.slot}"]`

        );

        if (!cell) return;

        cell.innerHTML = createCard(session);

    });

}

function createCard(session){

    return `

        <div
            class="session-card"
            data-id="${session.id}"
            style="border-left:6px solid ${session.color};"
        >

            <div class="session-title">

                ${session.title}

            </div>

            <div class="session-time">

                ${session.startTime}

                -

                ${session.endTime}

            </div>

            <div class="session-room">

                📍 ${session.room}

            </div>

            <div class="session-teacher">

                👨‍🏫 ${session.teacher}

            </div>

        </div>

    `;

}
/* ===========================================
   EVENTS
=========================================== */

export function initializeGridEvents() {

    document.addEventListener("click", (e) => {

        const button = e.target.closest(".add-session");

        if (!button) return;

        document.dispatchEvent(new CustomEvent("schedule:add", {

            detail: {

                day: button.dataset.day,
                slot: Number(button.dataset.slot)

            }

        }));

    });

    document.addEventListener("click", (e) => {

        const card = e.target.closest(".session-card");

        if (!card) return;

        document.dispatchEvent(new CustomEvent("schedule:edit", {

            detail: {

                id: card.dataset.id

            }

        }));

    });

}
