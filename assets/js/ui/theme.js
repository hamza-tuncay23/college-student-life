export function initializeTheme(){

    const savedTheme =
        localStorage.getItem("theme");

    if(savedTheme==="dark"){

        document.body.classList.remove("light");

        document.body.classList.add("dark");

    }
    else{

        document.body.classList.remove("dark");

        document.body.classList.add("light");

    }

}
