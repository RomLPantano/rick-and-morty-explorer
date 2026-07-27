
export function renderCharacters(characters, container, onCharacterClick) {
    container.innerHTML = "";

    characters.forEach(character => {
        const card = createCharacterCard(character, onCharacterClick);
        container.append(card);
    });
}

function createCharacterCard(character, onCharacterClick) {
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

    card.addEventListener("click", () => {
        onCharacterClick(character);
    });

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

export function renderEmptyState(container) {
    container.innerHTML = `
        <div class="empty-state">
            <h2>👽</h2>
            <h3>No characters found</h3>
            <p>Try another search.</p>
        </div> `;
}

export function renderLoader(container){
    container.innerHTML = `
        <div class="loader">
            <div class="loader-spinner"></div>
            <p>Loading characters...</p>
        </div>
    `;
}

/****************** Modal ********************/

export function renderModal(character) {
    const modal = document.getElementById("character-modal");

    modal.innerHTML = `
    <div class="modal-content">
        <button class="modal-close">&times;</button>
        <div class="modal-header">
            <img src="${character.image}" alt="${character.name}" class="modal-image">

            <div class="modal-title">
                <h2>${character.name}</h2>
                <p class="character-status ${getStatusClass(character.status)}">
                    ${character.status}
                </p>
            </div>
        </div>

        <div class="modal-info">
            <div class="info-item">
                <span>Species</span>
                <p>${character.species}</p>
            </div>

            <div class="info-item">
                <span>Gender</span>
                <p>${getGenderIcon(character.gender)} ${character.gender}</p>
            </div>

            <div class="info-item">
                <span>Origin</span>
                <p>${character.origin.name}</p>
            </div>

            <div class="info-item">
                <span>Last Location</span>
                <p>${character.location.name}</p>
            </div>

            <div class="info-item">
                <span>Episodes</span>
                <p>${ formatEpisodes(character)}</p>
            </div>
        </div>
    </div>
    `;

    document.body.style.overflow = "hidden";

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    const closeButton = modal.querySelector(".modal-close");
    closeButton.addEventListener("click", closeModal);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    modal.classList.remove("hidden");

}

function getStatusClass(status) {
    switch (status) {
        case "Alive":
            return "status-alive";
        case "Dead":
            return "status-dead";
        default:
            return "status-unknown";
    }
}


function getGenderIcon(gender) {
    switch (gender) {
        case "Male":
            return "♂";

        case "Female":
            return "♀";

        case "Genderless":
            return "⚪";

        default:
            return "❓";
    }
}

function formatEpisodes(character) {
    const total = character.episode.length;

    return total === 1
        ? "1 Episode"
        : `${total} Episodes`;
}

function closeModal() {
    const modal = document.getElementById("character-modal");
    modal.classList.add("hidden");
    modal.innerHTML = "";
    document.body.style.overflow = "";
}



//showLoader()       

//showError()       