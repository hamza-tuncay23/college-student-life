// ======================================================
// College Student Life
// Schedule Module
// ======================================================

const schedule = [];

let currentCell = null;

let editingLesson = null;

let editingSubject = null;

const SUBJECTS=[

{
name:"Algorithms",
teacher:"Mr. Karim",
room:"A101",
color:"#3b82f6"
},

{
name:"Linear Algebra",
teacher:"Mrs. Salma",
room:"A102",
color:"#ef4444"
},

{
name:"Analysis",
teacher:"Mr. Ahmed",
room:"A103",
color:"#22c55e"
},

{
name:"Physics",
teacher:"Mr. Hassan",
room:"B201",
color:"#f97316"
},

{
name:"Chemistry",
teacher:"Mrs. Nora",
room:"B202",
color:"#eab308"
},

{
name:"Programming",
teacher:"Mr. John",
room:"Lab 1",
color:"#06b6d4"
},

{
name:"Python",
teacher:"Mr. Ahmed",
room:"Lab 2",
color:"#8b5cf6"
},

{
name:"Java",
teacher:"Mr. Karim",
room:"Lab 3",
color:"#ec4899"
},

{
name:"Databases",
teacher:"Mrs. Amal",
room:"Lab 4",
color:"#14b8a6"
},

{
name:"Networks",
teacher:"Mr. Youssef",
room:"C201",
color:"#6366f1"
},

{
name:"Operating Systems",
teacher:"Mr. Samir",
room:"C202",
color:"#84cc16"
},

{
name:"English",
teacher:"Mrs. Sarah",
room:"D101",
color:"#f43f5e"
},

{
name:"French",
teacher:"Mrs. Nadia",
room:"D102",
color:"#0ea5e9"
},

{
name:"Arabic",
teacher:"Mr. Ali",
room:"D103",
color:"#10b981"
},

{
name:"Sport",
teacher:"Mr. Omar",
room:"Gym",
color:"#f59e0b"
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

    initializeToolbar();

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

        if(editingSubject!=null){
        
            SUBJECTS[editingSubject].name=subject.value;
        
            SUBJECTS[editingSubject].teacher=teacher.value;
        
            SUBJECTS[editingSubject].room=room.value;
        
            SUBJECTS[editingSubject].color=color.value;
        
            editingSubject=null;
        
            modal.classList.remove("show");
        
            renderSubjects();
        
            renderSchedule();
        
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

                if(cell.innerHTML.trim()===""){

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

function getLessonCount(){

    return schedule.length;

}

function getTodayLessons(){

    const today=new Date().getDay();

    const days=[

        "Monday",

        "Tuesday",

        "Wednesday",

        "Thursday",

        "Friday",

        "Saturday",
        
        "Sunday"

    ];

    const currentDay=days[today];
    
    return schedule.filter(

        lesson=>lesson.cell.startsWith(currentDay)

    ).length;

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
// ======================================================
// SUBJECTS
// ======================================================

function initializeSubjects(){

    document.getElementById("subjectsBtn").onclick=()=>{

        document
            .getElementById("subjectsModal")
            .classList
            .add("show");

        renderSubjects();

    };
    document.getElementById("newSubjectBtn").onclick=()=>{

        editingSubject=null;
    
        document.getElementById("lessonSubject").innerHTML="";
    
        document.getElementById("lessonTeacher").value="";
    
        document.getElementById("lessonRoom").value="";
    
        document.getElementById("lessonColor").value="#2563eb";
    
        document.getElementById("lessonModal").classList.add("show");
    
    };
    document.getElementById("closeSubjectsModal").onclick=()=>{

        document
            .getElementById("subjectsModal")
            .classList
            .remove("show");

    };

}

function renderSubjects(){

    const tbody=document.getElementById("subjectsTableBody");

    tbody.innerHTML="";

    SUBJECTS.forEach((subject,index)=>{

        tbody.innerHTML+=`

<tr>

<td>

<span
class="subject-color"
style="background:${subject.color};">

</span>

</td>

<td>${subject.name}</td>

<td>${subject.teacher}</td>

<td>${subject.room}</td>

<td>

<i
class="fa-solid fa-pen subject-action"
onclick="editSubject(${index})">

</i>

</td>

</tr>

`;

    });

}

window.editSubject=function(index){

    const subject=SUBJECTS[index];

    if(!subject) return;

    document.getElementById("lessonSubject").innerHTML="";

    SUBJECTS.forEach(s=>{

        document.getElementById("lessonSubject").innerHTML+=`

        <option value="${s.name}">

            ${s.name}

        </option>

        `;

    });

    document.getElementById("lessonSubject").value=subject.name;

    document.getElementById("lessonTeacher").value=subject.teacher;

    document.getElementById("lessonRoom").value=subject.room;

    document.getElementById("lessonColor").value=subject.color;

    document.getElementById("lessonType").value="Course";

    editingSubject=index;

    document.getElementById("lessonModal").classList.add("show");

}
// ======================================================
// TOOLBAR
// ======================================================

function initializeToolbar(){

    document
        .getElementById("previousWeek")
        .onclick=()=>{

        console.log("Previous week");

    };

    document
        .getElementById("nextWeek")
        .onclick=()=>{

        console.log("Next week");

    };

    document
        .getElementById("todayButton")
        .onclick=()=>{

        console.log("Today");

    };

    document
        .getElementById("printSchedule")
        .onclick=()=>{

        window.print();

    };

    document
        .getElementById("exportSchedule")
        .onclick=()=>{

        alert("PDF export coming soon.");

    };

    document
        .getElementById("fullscreenSchedule")
        .onclick=()=>{

        const wrapper=document.querySelector(".schedule-wrapper");

        if(!document.fullscreenElement){

            wrapper.requestFullscreen();

        }

        else{

            document.exitFullscreen();

        }

    };

}
