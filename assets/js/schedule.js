/* ==========================================================
College Student Life
Schedule Module
PART 1 / ...
========================================================== */

const SUBJECTS = [

    {
        name: "Algorithms",
        teacher: "Mr. Karim",
        room: "A101",
        color: "#2563eb"
    },

    {
        name: "Linear Algebra",
        teacher: "Mrs. Salma",
        room: "A102",
        color: "#ef4444"
    },

    {
        name: "Analysis",
        teacher: "Mr. Ahmed",
        room: "A103",
        color: "#22c55e"
    },

    {
        name: "Physics",
        teacher: "Mr. Hassan",
        room: "B201",
        color: "#f97316"
    },

    {
        name: "Chemistry",
        teacher: "Mrs. Nora",
        room: "B202",
        color: "#facc15"
    },

    {
        name: "Programming",
        teacher: "Mr. John",
        room: "Lab 1",
        color: "#06b6d4"
    }

];

let schedule = [];

let currentCell = null;

let editingLesson = null;

const lessonModal = document.getElementById("lessonModal");

const saveButton = document.getElementById("saveLesson");

const cancelButton = document.getElementById("cancelLesson");

const deleteButton = document.getElementById("deleteLesson");

const closeButton = document.getElementById("closeLessonModal");

const subjectSelect = document.getElementById("lessonSubject");

const teacherInput = document.getElementById("lessonTeacher");

const roomInput = document.getElementById("lessonRoom");

const typeSelect = document.getElementById("lessonType");

const colorInput = document.getElementById("lessonColor");

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initializeSubjects();

        initializeCells();

        initializeModal();

        renderSchedule();

    }

);

function initializeSubjects() {

    subjectSelect.innerHTML = "";

    SUBJECTS.forEach(subject => {

        subjectSelect.innerHTML += `

<option value="${subject.name}">

${subject.name}

</option>

`;

    });

    subjectSelect.addEventListener(

        "change",

        () => {

            const subject = SUBJECTS.find(

                s => s.name === subjectSelect.value

            );

            if (!subject) return;

            teacherInput.value = subject.teacher;

            roomInput.value = subject.room;

            colorInput.value = subject.color;

        }

    );

}

function initializeCells() {

    document

        .querySelectorAll(".schedule-table td")

        .forEach(cell => {

            cell.innerHTML = `

<div class="empty-cell">

<i class="fa-solid fa-plus"></i>

</div>

`;

            cell.addEventListener(

                "click",

                () => {

                    currentCell = cell;

                    editingLesson = null;

                    openModal();

                }

            );

        });

}

function initializeModal() {

    cancelButton.onclick = closeModal;

    closeButton.onclick = closeModal;

    saveButton.onclick = saveLesson;

    deleteButton.onclick = deleteLesson;

}

function openModal() {

    lessonModal.classList.add("show");

}

function closeModal() {

    lessonModal.classList.remove("show");

}

function saveLesson() {

    const lesson = {

        cell: currentCell.id,

        subject: subjectSelect.value,

        teacher: teacherInput.value,

        room: roomInput.value,

        type: typeSelect.value,

        color: colorInput.value

    };

    if (editingLesson === null) {

        schedule.push(lesson);

    } else {

        schedule[editingLesson] = lesson;

    }

    renderSchedule();

    closeModal();

}
function deleteLesson() {

    if (editingLesson === null) {

        closeModal();

        return;

    }

    schedule.splice(editingLesson, 1);

    renderSchedule();

    closeModal();

}

function renderSchedule() {

    document

        .querySelectorAll(".schedule-table td")

        .forEach(cell => {

            cell.innerHTML = `

<div class="empty-cell">

<i class="fa-solid fa-plus"></i>

</div>

`;

        });

    schedule.forEach((lesson, index) => {

        const cell = document.getElementById(lesson.cell);

        if (!cell) return;

        cell.innerHTML = `

<div
class="lesson-card"
style="background:${lesson.color};">

<div>

<div class="lesson-subject">

${lesson.subject}

</div>

<div class="lesson-teacher">

<i class="fa-solid fa-user"></i>

${lesson.teacher}

</div>

<div class="lesson-room">

<i class="fa-solid fa-door-open"></i>

${lesson.room}

</div>

</div>

<div class="lesson-type">

${lesson.type}

</div>

</div>

`;

        cell.onclick = () => {

            currentCell = cell;

            editingLesson = index;

            subjectSelect.value = lesson.subject;

            teacherInput.value = lesson.teacher;

            roomInput.value = lesson.room;

            typeSelect.value = lesson.type;

            colorInput.value = lesson.color;

            openModal();

        };

    });

    document

        .querySelectorAll(".schedule-table td")

        .forEach(cell => {

            if (cell.querySelector(".lesson-card")) return;

            cell.onclick = () => {

                currentCell = cell;

                editingLesson = null;

                subjectSelect.selectedIndex = 0;

                teacherInput.value = "";

                roomInput.value = "";

                typeSelect.selectedIndex = 0;

                colorInput.value = "#2563eb";

                openModal();

            };

        });

}

document.getElementById("printSchedule").onclick = () => {

    window.print();

};

document.getElementById("previousWeek").onclick = () => {

    console.log("Previous Week");

};

document.getElementById("nextWeek").onclick = () => {

    console.log("Next Week");

};

document.getElementById("todayButton").onclick = () => {

    console.log("Today");

};

document.getElementById("exportSchedule").onclick = () => {

    alert("PDF Export will be added later.");

};

document.getElementById("subjectsBtn").onclick = () => {

    alert("Subjects Manager (next update)");

};

document.getElementById("teachersBtn").onclick = () => {

    alert("Teachers Manager (next update)");

};

document.getElementById("roomsBtn").onclick = () => {

    alert("Rooms Manager (next update)");

};

document.getElementById("timeSlotsBtn").onclick = () => {

    alert("Time Slots Manager (next update)");

};

document.getElementById("settingsBtn").onclick = () => {

    alert("Schedule Settings (next update)");

};
