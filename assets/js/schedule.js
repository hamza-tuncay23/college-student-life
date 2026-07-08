// ======================================================
// College Student Life
// Schedule Module
// ======================================================

const COLORS = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#7c3aed",
    "#ea580c",
    "#0891b2",
    "#db2777",
    "#ca8a04"
];

// ======================================================

const schedule = [];

// ======================================================

document.addEventListener("DOMContentLoaded",()=>{

    initializeSchedule();

    initializeModal();

});

// ======================================================

function initializeSchedule(){

    createEmptyCells();

    renderSchedule();

}

// ======================================================

function initializeModal(){

    const subject =
        document.getElementById("lessonSubject");

    subject.onchange = ()=>{

        const selected = SUBJECTS.find(

            s=>s.name===subject.value

        );

        if(!selected) return;

        document.getElementById("lessonTeacher").value =
            selected.teacher;

        document.getElementById("lessonRoom").value =
            selected.room;

        document.getElementById("lessonColor").value =
            selected.color;

    };

    document
        .getElementById("cancelLesson")
        .onclick = ()=>{

        document
            .getElementById("lessonModal")
            .classList
            .remove("show");

    };

    document
        .getElementById("closeLessonModal")
        .onclick = ()=>{

        document
            .getElementById("lessonModal")
            .classList
            .remove("show");

    };

}

// ======================================================

function createEmptyCells(){

    document
        .querySelectorAll(".schedule-table td")
        .forEach(cell=>{

            cell.addEventListener("click",()=>{

                if(cell.innerHTML===""){

                    addLesson(cell);

                }

            });

        });

}

// ======================================================

let currentCell = null;

const SUBJECTS = [

    {
        name:"Python",
        teacher:"Mr. Ahmed",
        room:"Lab 2",
        color:"#3772ff"
    },

    {
        name:"Mathematics",
        teacher:"Mr. Karim",
        room:"B203",
        color:"#ef4444"
    },

    {
        name:"Physics",
        teacher:"Mrs. Salma",
        room:"A102",
        color:"#22c55e"
    },

    {
        name:"Chemistry",
        teacher:"Mrs. Nora",
        room:"C105",
        color:"#eab308"
    },

    {
        name:"English",
        teacher:"Mr. John",
        room:"E201",
        color:"#8b5cf6"
    }

];

function addLesson(cell){

    currentCell = cell;

    document
        .getElementById("lessonModal")
        .classList
        .add("show");

    const select =
        document.getElementById("lessonSubject");

    select.innerHTML =
        '<option value="">Choose...</option>';

    SUBJECTS.forEach(subject=>{

        select.innerHTML +=

        `<option value="${subject.name}">

            ${subject.name}

        </option>`;

    });

}

// ======================================================

function renderSchedule(){

    document
        .querySelectorAll(".schedule-table td")
        .forEach(cell=>{

            cell.innerHTML="";

        });

    schedule.forEach(lesson=>{

        const cell =
            document.getElementById(
                lesson.cell
            );

        if(!cell) return;

        cell.innerHTML=`

        <div
            class="lesson-card"
            style="background:${lesson.color};">

            <div>

                <div class="lesson-subject">

                    ${lesson.subject}

                </div>

            </div>

            <div>

                <div class="lesson-teacher">

                    <i class="fa-solid fa-user"></i>

                    ${lesson.teacher}

                </div>

                <div class="lesson-room">

                    <i class="fa-solid fa-location-dot"></i>

                    ${lesson.room}

                </div>

                <div class="lesson-type">

                    ${lesson.type}

                </div>

            </div>

        </div>

        `;

        cell.onclick=()=>{

            editLesson(lesson);

        };

    });

}

// ======================================================

function editLesson(lesson){

    const action = prompt(

`1 = Edit

2 = Delete`

    );

    if(action==="2"){

        const index =
            schedule.indexOf(lesson);

        if(index>-1){

            schedule.splice(index,1);

        }

        renderSchedule();

        return;

    }

    const subject =
        prompt("Subject",lesson.subject);

    if(!subject) return;

    lesson.subject=subject;

    lesson.teacher=
        prompt(
            "Teacher",
            lesson.teacher
        );

    lesson.room=
        prompt(
            "Room",
            lesson.room
        );

    lesson.type=
        prompt(
            "Type",
            lesson.type
        );

    renderSchedule();

}
