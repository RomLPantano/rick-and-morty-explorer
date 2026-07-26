import { getCharacters } from "./api.js";
import { renderCharacters, renderPagination, renderModal } from "./ui.js";

/****************** DOM ELEMENTS ********************/
const $charactersContainer = document.getElementById("characters-container");
const $btnPrevious = document.getElementById("previous");
const $btnNext = document.getElementById("next");
const $btnPage = document.getElementById("page");
const $search = document.getElementById("search-input");
const $statusFilter = document.getElementById("status-filter");
const $genderFilter = document.getElementById("gender-filter");
const $sortSelect = document.getElementById("sort-select");
const $btnReset = document.getElementById("reset-button");
const $pagination = document.getElementById("pagination");

/****************** APPLICATION STATE ********************/

const appState = {
    currentPage: 1,
    apiInfo: {
        count:0,
        pages:0,
        next: "",
        prev:""
    },
    currentCharacters: [],
    search: "",
    status: "",
    gender: "",
    sort: "asc",
    selectedCharacter: null
};

const SEARCH_DELAY = 500;

/****************** Initialization ********************/
initializeEvents();
loadCharacters();

/****************** EVENT LISTENERS ********************/

function initializeEvents() {
    let debounceTimer;

    $search.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            handleSearch();
        }, SEARCH_DELAY);
    });

    $statusFilter.addEventListener("change", handleStatusFilter);

    $genderFilter.addEventListener("change", handleGenderFilter);
    
    $btnReset.addEventListener("click", resetFilters);

    $sortSelect.addEventListener("change", handleSort);
}

/****************** Main functions ********************/
async function loadCharacters() {

    $charactersContainer.innerHTML = `
        <div class="loader">
            <div class="loader-spinner"></div>
            <p>Loading characters...</p>
        </div>
    `;

    try {
       // const { currentPage } = appState;
        const data = await getCharacters(appState);

        appState.apiInfo = data.info;
        appState.currentCharacters = data.results;
        appState.apiInfo = data.info;

        sortCharacters();
        renderCharacters(appState.currentCharacters, $charactersContainer, handleCharacterClick);
        renderPagination($pagination, appState.apiInfo, appState.currentPage, changePage);

    } catch (error) {

        console.error(error);

        $charactersContainer.innerHTML = `
            <p>Failed to load characters.</p>
        `;
    }

}

async function changePage(page) {
    appState.currentPage = page;
    await loadCharacters();
    console.log(appState);
}

/******************     Filters     ********************/

function handleSearch() {
    appState.search = $search.value.trim();
    reloadFromFirstPage();
}

function handleStatusFilter() {
    appState.status = $statusFilter.value;
    reloadFromFirstPage();
}

function handleGenderFilter() {
    appState.gender = $genderFilter.value;
    reloadFromFirstPage();
}

function handleSort() {
    appState.sort = $sortSelect.value;
    
    sortCharacters();
    renderCharacters(appState.currentCharacters, $charactersContainer);
}

function resetFilters() {
    $search.value = "";
    $statusFilter.value = "";
    $genderFilter.value = "";
    $sortSelect.value = "asc";

    appState.search = "";
    appState.status = "";
    appState.gender = "";
    appState.sort = "asc";
    appState.currentPage = 1;

    loadCharacters();
}

function handleCharacterClick(character) {
    appState.selectedCharacter = character;
    renderModal(character);
}

/****************** HELPERS ********************/
function reloadFromFirstPage() {
    appState.currentPage = 1;
    loadCharacters();
}

function sortCharacters() {
    if (appState.sort === "asc") {
        appState.currentCharacters.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    } else {
        appState.currentCharacters.sort((a, b) =>
            b.name.localeCompare(a.name)
        );
    }
}

console.log(appState);




