const BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(page = 1) {
    const response = await fetch(`${BASE_URL}/character?page=${page}`);
    return await response.json();
}