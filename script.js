const pokemonInput = document.getElementById('pokemon-input');
const searchButton = document.getElementById('search-button');
const pokemonInfoDiv = document.getElementById('pokemon-info');


searchButton.addEventListener('click', () => {
    const pokemonNameOrId = pokemonInput.value.toLowerCase();
    if (pokemonNameOrId) {
        fetchPokemonData(pokemonNameOrId);
    }
});

async function fetchPokemonData(nameOrId) {
    const API_URL = `https://pokeapi.co/api/v2/pokemon/${nameOrId}`;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error: Pokemon not found');
        }
        const data = await response.json();

        displayPokemonInfo(data);

    } catch (error) {
        pokemonInfoDiv.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayPokemonInfo(pokemon) {
    // Clear previous results
    pokemonInfoDiv.innerHTML = '';

    const nameElement = document.createElement('h2');
    nameElement.textContent = pokemon.name.toUpperCase();

    const idElement = document.createElement('p');
    idElement.textContent = `ID: #${pokemon.id}`;
    //Bonus: Type
    const typeElement = document.createElement('p');
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    typeElement.textContent = `Type(s): ${types}`;

    const spriteElement = document.createElement('img');
    spriteElement.src = pokemon.sprites.front_default;
    spriteElement.alt = `${pokemon.name} sprite`;

    pokemonInfoDiv.appendChild(nameElement);
    pokemonInfoDiv.appendChild(idElement);
    pokemonInfoDiv.appendChild(typeElement); // Bonus: Type
    pokemonInfoDiv.appendChild(spriteElement);
}