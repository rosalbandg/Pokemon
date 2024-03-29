document.addEventListener("DOMContentLoaded", () => {
    const pokemonListElement = document.getElementById("pokemon-list"); 
    const pokemonDetailsElement = document.getElementById("pokemon-details");
    const searchForm = document.getElementById("search-form");
    const searchResultsElement = document.getElementById("search-results");


    function fetchData() {
        const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                displayPokemon(data.results);
            })
            .catch(error => {
                console.error('Erreur :', error);
            });
    }

    function displayPokemon(pokemonList) {
        pokemonList.forEach((pokemon) => {
            console.log(pokemon)
            const li = document.createElement("li");
            li.textContent = pokemon.name; 
            li.style.cursor = "pointer";
            li.addEventListener("click", () =>
                afficherDetailsPokemon(pokemon.url)); 
            pokemonListElement.appendChild(li);
        });
    }

    function afficherDetailsPokemon(url) {
        fetch(url)
            .then((response) => response.json())
            .then((pokemon) => { 
                pokemonDetailsElement.innerHTML = `
                <h2>${pokemon.name}</h2>
                <p>Numéro: ${pokemon.id}</p>
                <p>Hauteur: ${pokemon.height} m</p> <!-- Ajout de la hauteur -->
                <p>Poids: ${pokemon.weight} grammes</p> <!-- Ajout du poids -->
                <p><strong>Image:</strong> <img src="${pokemon.sprites.front_default}" alt="Image de ${pokemon.name}"></p> 
                <p><strong>Statistiques:</strong> ${JSON.stringify(pokemon.stats)}</p>
            `;
            })
            .catch((error) => {
                console.error
                ('Une erreur est survenue lors de la récupération des détails du pokémon :', error);
            });
    }

    fetchData(); 
});
