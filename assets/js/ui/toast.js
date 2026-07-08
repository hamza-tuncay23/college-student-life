let toastContainer=null;

export function initializeToast(){

    toastContainer=document.createElement("div");

    toastContainer.id="toastContainer";

    document.body.appendChild(toastContainer);

}

export function showToast(

    message,

    type="success"

){

    const toast=document.createElement("div");

    toast.className=`toast ${type}`;

    let icon="fa-circle-check";

    if(type==="error"){

        icon="fa-circle-xmark";

    }

    if(type==="warning"){

        icon="fa-triangle-exclamation";

    }

    if(type==="info"){

        icon="fa-circle-info";

    }

    toast.innerHTML=`

<i class="fa-solid ${icon}"></i>

<span>${message}</span>

`;

    toastContainer.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },50);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },250);

    },3500);

}
