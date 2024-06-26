const LOAD_TEST_PROJECTS = true;
const DEFAULT_PICTURE = "startalk.png";

const makeTooltip = (text, tooltip) => {
    let elem = document.createElement("span");
    elem.setAttribute("data-bs-toggle", "tooltip");
    elem.setAttribute("data-bs-title", tooltip);
    elem.innerText = text;
    new bootstrap.Tooltip(elem);
    return elem;
}

window.onload = async () => {
    if (LOAD_TEST_PROJECTS) document.querySelector("#title").innerText += " - TEST";
    let { projects } = await (await fetch(LOAD_TEST_PROJECTS ? "/test/projects.json" : "/projects.json")).json();
    document.querySelector("#showcase-container").innerText = "";
    for (let i of projects) {
        let card = document.createElement("div");
        card.classList.add("card", "project", "project-" + i.type);
        let img = document.createElement("img");
        img.src = i.picture ?? DEFAULT_PICTURE;
        img.classList.add("card-img-top");
        card.appendChild(img);
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        let title = document.createElement("h5");
        title.classList.add("card-title");
        title.innerText = i.title;
        cardBody.appendChild(title);
        let subtitle = document.createElement("h6");
        subtitle.classList.add("card-subtitle", "mb-2", "text-body-secondary");
        subtitle.appendChild(makeTooltip(i.author.hanzi, i.author.pinyin));
        let subtitleEng = document.createElement("span");
        subtitleEng.innerText = ` (${i.author.english})`;
        subtitle.appendChild(subtitleEng);
        cardBody.appendChild(subtitle);
        if (i.description) {
            let desc = document.createElement("p");
            desc.classList.add("card-text");
            desc.innerText = i.description;
            cardBody.appendChild(desc);
        }
        let open = document.createElement("a");
        open.classList.add("btn", "btn-primary");
        open.href = i.url;
        open.target = "_blank";
        open.innerText = "Open Project";
        cardBody.appendChild(open);
        card.appendChild(cardBody);
        document.querySelector("#showcase-container").appendChild(card);
    }
    document.querySelector("#toggle").onchange = () => {
        let checked = "";

        for (let i of document.querySelectorAll("[name=toggle-state]")) {
            if (i.checked) {
                checked = i.id;
                break;
            }
        }

        switch (checked) {
            case "toggle-all": {
                for (let i of document.getElementsByClassName("project-data")) i.hidden = false;
                for (let i of document.getElementsByClassName("project-web")) i.hidden = false;
                break;
            }
            case "toggle-data": {
                for (let i of document.getElementsByClassName("project-data")) i.hidden = false;
                for (let i of document.getElementsByClassName("project-web")) i.hidden = true;
                break;
            }
            case "toggle-web": {
                for (let i of document.getElementsByClassName("project-data")) i.hidden = true;
                for (let i of document.getElementsByClassName("project-web")) i.hidden = false;
                break;
            }
            default: {
                console.log("Unrecognized checkbox:", checked);
                break;
            }
        }
    };
    for (let i of document.querySelectorAll("[name=toggle-state]")) {
        i.disabled = false;
    }
};