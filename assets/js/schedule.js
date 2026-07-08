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

let currentCell = null;

let editingLesson = null;

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

    const modal=document.getElementById("lessonModal");

    const subject=document.getElementById("lessonSubject");

    const teacher=document.getElementById("lessonTeacher");

    const room=document.getElementById("lessonRoom");

    const type=document.getElementById("lessonType");

    const color=document.getElementById("lessonColor");

    subject.onchange=()=>{

        const lesson=SUBJECTS.find(

            s=>s.name===subject.value

        );

        if(!lesson) return;

        teacher.value=lesson.teacher;

        room.value=lesson.room;

        color.value=lesson.color;

    };

    document.getElementById("saveLesson").onclick=()=>{

        if(subject.value===""){

            alert("Choose a subject.");

            return;

        }

        if(editingLesson==null){

            schedule.push({

                cell:currentCell.id,

                subject:subject.value,

                teacher:teacher.value,

                room:room.value,

                type:type.value,

                color:color.value

            });

        }

        else{

            editingLesson.subject=subject.value;

            editingLesson.teacher=teacher.value;

            editingLesson.room=room.value;

            editingLesson.type=type.value;

            editingLesson.color=color.value;

        }

        editingLesson=null;

        modal.classList.remove("show");

        renderSchedule();

    };

    document.getElementById("deleteLesson").onclick=()=>{

        if(editingLesson==null) return;
    
        const index=schedule.indexOf(editingLesson);
    
        if(index>-1){
    
            schedule.splice(index,1);
    
        }
    
        editingLesson=null;
    
        modal.classList.remove("show");
    
        renderSchedule();
    
    };
    
    document.getElementById("cancelLesson").onclick=()=>{
    
        editingLesson=null;
    
        modal.classList.remove("show");
    
    };
    
    document.getElementById("closeLessonModal").onclick=()=>{
    
        editingLesson=null;
    
        modal.classList.remove("show");
    
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

    editingLesson=lesson;

    currentCell=document.getElementById(lesson.cell);

    document.getElementById("lessonModal").classList.add("show");

    document.getElementById("lessonSubject").value=lesson.subject;

    document.getElementById("lessonTeacher").value=lesson.teacher;

    document.getElementById("lessonRoom").value=lesson.room;

    document.getElementById("lessonType").value=lesson.type;

    document.getElementById("lessonColor").value=lesson.color;

}
