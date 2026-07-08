const LANGUAGES=[

    {
        code:"en",
        flag:"🇬🇧",
        name:"English"
    },

    {
        code:"fr",
        flag:"🇫🇷",
        name:"Français"
    },

    {
        code:"ar",
        flag:"🇲🇦",
        name:"العربية"
    },

    {
        code:"tr",
        flag:"🇹🇷",
        name:"Türkçe"
    },

    {
        code:"ja",
        flag:"🇯🇵",
        name:"日本語"
    }

];

export function initializeLanguage(){

    const button=document.getElementById("languageButton");

    if(!button) return;

    button.onclick=openLanguageMenu;

}

function openLanguageMenu(){

    const old=document.getElementById("languageMenu");

    if(old){

        old.remove();

        return;

    }

    const menu=document.createElement("div");

    menu.id="languageMenu";

    menu.className="language-menu";

    LANGUAGES.forEach(language=>{

        const item=document.createElement("button");

        item.className="language-item";

        item.innerHTML=`

<span>${language.flag}</span>

<span>${language.name}</span>

`;

        item.onclick=()=>{

            localStorage.setItem(

                "language",

                language.code

            );

            location.reload();

        };

        menu.appendChild(item);

    });

    document.body.appendChild(menu);

    const rect=document

        .getElementById("languageButton")

        .getBoundingClientRect();

    menu.style.top=

        rect.bottom+10+"px";

    menu.style.right=

        "25px";

    setTimeout(()=>{

        document.addEventListener(

            "click",

            closeLanguageMenu,

            {

                once:true

            }

        );

    },100);

}

function closeLanguageMenu(){

    const menu=document.getElementById("languageMenu");

    if(menu){

        menu.remove();

    }

}
