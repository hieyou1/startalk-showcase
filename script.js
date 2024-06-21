const makeTooltip = (text, tooltip) => {
    let elem = document.createElement("span");
    elem.setAttribute("data-bs-toggle", "tooltip");
    elem.setAttribute("data-bs-title", tooltip);
    elem.innerText = text;
    new bootstrap.Tooltip(elem);
    return elem;
}

window.onload = async () => {
    let projects = await (await fetch("/projects.json")).json();
    document.querySelector("#showcase-container").innerText = "";
    for (let i of projects) {
        let card = document.createElement("div");
        card.classList.add("card", "project");
        let img = document.createElement("img");
        img.src = i.picture;
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
        let desc = document.createElement("p");
        desc.classList.add("card-text");
        desc.innerText = i.description;
        cardBody.appendChild(desc);
        let open = document.createElement("a");
        open.classList.add("btn", "btn-primary");
        open.href = i.url;
        open.target = "_blank";
        open.innerText = "Open Project";
        cardBody.appendChild(open);
        card.appendChild(cardBody);
        document.querySelector("#showcase-container").appendChild(card);
    }
};