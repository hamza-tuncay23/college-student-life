import {
    addSession,
    updateSession,
    deleteSession
} from "./schedule.firestore.js";

let editingId = null;

export function initializeScheduleModal() {

    createModal();

    document.addEventListener("schedule:add", (event) => {

        openModal({
    
            day: event.detail.day,
            slot: event.detail.slot
    
        });
    
    });

}

function createModal() {

    const modal = document.getElementById("scheduleModal");

    modal.innerHTML = `

<div class="modal-overlay" id="sessionModal">

    <div class="modal-box">

        <div class="modal-header">

            <h2 id="modalTitle">

                Add Session

            </h2>

            <button id="closeModal">

                ✕

            </button>

        </div>

        <div class="modal-body">

            <input
                id="sessionTitle"
                type="text"
                placeholder="Course"
            >

            <input
                id="sessionTeacher"
                type="text"
                placeholder="Teacher"
            >

            <input
                id="sessionRoom"
                type="text"
                placeholder="Room"
            >

            <select id="sessionDay">

                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>

            </select>

            <input
                id="startTime"
                type="time"
            >

            <input
                id="endTime"
                type="time"
            >

            <select id="sessionType">

                <option value="Course">Course</option>
                <option value="TD">TD</option>
                <option value="TP">TP</option>
                <option value="Exam">Exam</option>

            </select>

            <input
                id="sessionColor"
                type="color"
                value="#4F46E5"
            >

        </div>

        <div class="modal-footer">

            <button id="deleteSessionBtn">

                Delete

            </button>

            <button id="saveSessionBtn">

                Save

            </button>

        </div>

    </div>

</div>

`;

    bindModalEvents();

}

function bindModalEvents() {

    document
        .getElementById("closeModal")
        .addEventListener("click", closeModal);

    document
        .getElementById("saveSessionBtn")
        .addEventListener("click", saveSession);

    document
        .getElementById("deleteSessionBtn")
        .addEventListener("click", removeSession);

}

export function openModal(data = null) {

    editingId = null;

    document
        .getElementById("sessionModal")
        .classList.add("show");

    if (!session) {

        clearForm();
        if (!data) return;

        if (data.day) {
        
            document.getElementById("sessionDay").value = data.day;
        
        }
        
        if (data.slot) {
        
            const slots = {
        
                1: ["08:00","10:00"],
                2: ["10:00","12:00"],
                3: ["12:00","14:00"],
                4: ["14:00","16:00"],
                5: ["16:00","18:00"],
                6: ["18:00","20:00"]
        
            };
        
            document.getElementById("startTime").value = slots[data.slot][0];
            document.getElementById("endTime").value = slots[data.slot][1];
        
        }

        return;

    }

    editingId = session.id;

    document.getElementById("modalTitle").textContent = "Edit Session";

    document.getElementById("sessionTitle").value = session.title;
    document.getElementById("sessionTeacher").value = session.teacher;
    document.getElementById("sessionRoom").value = session.room;
    document.getElementById("sessionDay").value = session.day;
    document.getElementById("startTime").value = session.startTime;
    document.getElementById("endTime").value = session.endTime;
    document.getElementById("sessionType").value = session.type;
    document.getElementById("sessionColor").value = session.color;

}

function closeModal() {

    document
        .getElementById("sessionModal")
        .classList.remove("show");

    clearForm();

}

async function saveSession() {

    const data = {

        title: document.getElementById("sessionTitle").value,
        teacher: document.getElementById("sessionTeacher").value,
        room: document.getElementById("sessionRoom").value,
        day: document.getElementById("sessionDay").value,
        startTime: document.getElementById("startTime").value,
        endTime: document.getElementById("endTime").value,
        type: document.getElementById("sessionType").value,
        color: document.getElementById("sessionColor").value

    };

    if (editingId) {

        await updateSession(editingId, data);

    } else {

        await addSession(data);

    }

    closeModal();

}

async function removeSession() {

    if (!editingId) return;

    await deleteSession(editingId);

    closeModal();

}

function clearForm() {

    document.getElementById("modalTitle").textContent = "Add Session";

    editingId = null;

    document
        .querySelectorAll("#sessionModal input")
        .forEach(input => {

            if (input.type === "color") {

                input.value = "#4F46E5";

            } else {

                input.value = "";

            }

        });

    document.getElementById("sessionDay").selectedIndex = 0;
    document.getElementById("sessionType").selectedIndex = 0;

}
