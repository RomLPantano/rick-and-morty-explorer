import { loadSavedState, saveState } from "./storage.js";
import { getCharacters } from "./api.js";
import { renderCharacters, renderPagination, renderModal, renderEmptyState, renderSkeleton} from "./ui.js";

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
const $resultsInfo = document.getElementById("results-info");

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
const savedState = loadSavedState();

if (savedState) {
    Object.assign(appState, savedState);
}

$search.value = appState.search;
$statusFilter.value = appState.status;
$genderFilter.value = appState.gender;
$sortSelect.value = appState.sort;

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

    //renderLoader($charactersContainer);

    try {
        renderSkeleton($charactersContainer);

        const data = await getCharacters(appState);

        appState.apiInfo = data.info;
        appState.currentCharacters = data.results;
        appState.apiInfo = data.info;

        sortCharacters();
        renderCharacters(appState.currentCharacters, $charactersContainer, handleCharacterClick);
        renderPagination($pagination, appState.apiInfo, appState.currentPage, changePage);

        $resultsInfo.textContent = `${data.info.count} characters found`;
    } catch (error) {

        appState.currentCharacters = [];
        $charactersContainer.innerHTML = "";
        $pagination.innerHTML = "";
        $resultsInfo.textContent = "No characters found.";

        renderEmptyState($charactersContainer);
    }

}

async function changePage(page) {
    appState.currentPage = page;
    await loadCharacters();
    saveState(appState);
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
    renderCharacters(appState.currentCharacters, $charactersContainer, handleCharacterClick);
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
    saveState(appState);
}

function handleCharacterClick(character) {
    appState.selectedCharacter = character;
    renderModal(character);
}

/****************** HELPERS ********************/
function reloadFromFirstPage() {
    appState.currentPage = 1;
    loadCharacters();
    saveState(appState);
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




