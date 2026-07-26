const BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(appState) {

    const params = new URLSearchParams();
    
    params.append("page", appState.currentPage);

    if (appState.search) {
        params.append("name", appState.search);
    }

    if (appState.status) {
        params.append("status", appState.status);
    }

    if (appState.gender) {
        params.append("gender", appState.gender);
    }

    const response = await fetch(
        `${BASE_URL}/character?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch characters.");
    }
    return await response.json();
}

//getCharacterById() 