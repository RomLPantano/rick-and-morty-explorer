
export function renderCharacters(characters, container) {
    container.innerHTML = "";

    characters.forEach(character => {
        const card = createCharacterCard(character);
        container.append(card);
    });
}

function createCharacterCard(character) {
    const card = document.createElement("article");
    card.classList.add("character-card");

    const image = document.createElement("img");
    image.src = character.image;
    image.alt = character.name;
    image.classList.add("character-image");

    const name = document.createElement("h2");
    name.textContent = character.name;
    name.classList.add("character-name");

    const status = document.createElement("p");
    status.textContent = `Status: ${character.status}`;
    status.classList.add("character-status");

    status.classList.add("character-status");

    switch (character.status) {
        case "Alive":
            status.classList.add("status-alive");
            break;

        case "Dead":
            status.classList.add("status-dead");
            break;

        default:
            status.classList.add("status-unknown");
    }

    const species = document.createElement("p");
    species.textContent = `Species: ${character.species}`;
    species.classList.add("character-species");

    const content = document.createElement("div");
    content.classList.add("character-content");
    content.append(name, status, species);

    card.append(image, content);
    return card;
}

export function renderPagination(pagination, apiInfo, currentPage, onPageChange) {
    pagination.innerHTML = "";
    const firstButton = createPaginationButton("<<");
    const previousButton = createPaginationButton("<");
    const pageInfo = document.createElement("span");
    const nextButton = createPaginationButton(">");
    const lastButton = createPaginationButton(">>");

    pageInfo.textContent = `Page ${currentPage} of ${apiInfo.pages}`;
    pageInfo.classList.add("btn");

    pagination.append(firstButton, previousButton, pageInfo, nextButton, lastButton);

    if (currentPage === 1) {
        firstButton.disabled = true;
        previousButton.disabled = true;
    } else if (currentPage === apiInfo.pages) {
        nextButton.disabled = true;
        lastButton.disabled = true;
    }

    /* Cuando presiono el boton de primera pagina */    
    firstButton.addEventListener("click", () => {
        onPageChange(1);
    });

    /* Cuando presiono el boton de pagina anterior */  
    previousButton.addEventListener("click", () => {
        onPageChange(currentPage - 1);
    });

    /* Cuando presiono el boton de proxima pagina */  
    nextButton.addEventListener("click", () => {
        onPageChange(currentPage + 1);
    });

    /* Cuando presiono el boton de ultima pagina */  
    lastButton.addEventListener("click", () => {
        onPageChange(apiInfo.pages);
    });
}

function createPaginationButton(text) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add("btn");
    return button;
}

//renderModal()      

//showLoader()       

//showError()       