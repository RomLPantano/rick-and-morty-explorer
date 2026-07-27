const STORAGE_KEY = "rickMortyExplorer";

export function saveState(appState) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
            search: appState.search,
            status: appState.status,
            gender: appState.gender,
            sort: appState.sort,
            currentPage: appState.currentPage
        })
    );
}

export function loadSavedState() {
    const savedState = localStorage.getItem(STORAGE_KEY);

    return savedState ? JSON.parse(savedState) : null;
}