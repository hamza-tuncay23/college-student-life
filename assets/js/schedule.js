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

document.addEventListener("DOMContentLoaded", () => {

    initializeSchedule();

});

// ======================================================

function initializeSchedule(){

    createEmptyCells();

    renderSchedule();

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

function addLesson(cell){

    const subject = prompt("Subject");

    if(!subject) return;

    const teacher = prompt("Teacher");

    const room = prompt("Room");

    const type = prompt("Type (Course / TD / TP / Exam)");

    const color =
        COLORS[
            Math.floor(
                Math.random()*COLORS.length
            )
        ];

    schedule.push({

        cell:cell.id,

        subject,

        teacher,

        room,

        type,

        color

    });

    renderSchedule();

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
