import { getCharacters } from "./api.js";
import { renderCharacters, renderPagination } from "./ui.js";

/****************** DOM ELEMENTS ********************/
const $charactersContainer = document.getElementById("characters-container");
const $btnPrevious = document.getElementById("previous");
const $btnNext = document.getElementById("next");
const $btnPage = document.getElementById("page");
const $search = document.getElementById("search-input");
const $statusFilter = document.getElementById("status-filter");
const $genderFilter = document.getElementById("gender-filter");
const $sort = document.getElementById("sort-select");
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
    sort: "asc"
};

async function loadCharacters() {

    $charactersContainer.innerHTML = `
        <div class="loader">
            <div class="loader-spinner"></div>
            <p>Loading characters...</p>
        </div>
    `;

    try {
        const { currentPage } = appState;
        const data = await getCharacters(currentPage);

        appState.currentCharacters = data.results;
        appState.apiInfo = data.info;

        renderCharacters(appState.currentCharacters, $charactersContainer);
        renderPagination($pagination, appState.apiInfo, currentPage, changePage);

    } catch (error) {

        console.error(error);

        $charactersContainer.innerHTML = `
            <p>Failed to load characters.</p>
        `;
    }
}



/****************** INITIALIZATION ********************/
loadCharacters();
console.log(appState);



async function changePage(page) {
    appState.currentPage = page;
    await loadCharacters();
    console.log(appState);
}

