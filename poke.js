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


function handleSearchFormSubmit(event) {
    event.preventDefault(); 
    searchResultsElement.textContent = "Les résultats de votre recherche ne sont pas disponibles";
}
searchForm.addEventListener("submit", handleSearchFormSubmit);


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





document.addEventListener("DOMContentLoaded", () => {
    const pokemonGridElement = document.getElementById("pokemon-grid"); // Modifier pour utiliser un élément de grille
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
            const pokemonBox = document.createElement("div"); // Créer une case pour chaque Pokémon
            pokemonBox.classList.add("pokemon-box"); // Ajouter une classe pour styliser la case

            const pokemonImage = document.createElement("img"); // Créer une balise img pour afficher l'image du Pokémon
            pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`; // Générer l'URL de l'image du Pokémon à partir de l'API
            pokemonImage.alt = pokemon.name; // Alt text pour l'image
            pokemonBox.appendChild(pokemonImage); // Ajouter l'image à la case

            const pokemonName = document.createElement("p"); // Créer un paragraphe pour afficher le nom du Pokémon
            pokemonName.textContent = pokemon.name; // Afficher le nom du Pokémon
            pokemonBox.appendChild(pokemonName); // Ajouter le nom à la case

            pokemonBox.addEventListener("click", () => afficherDetailsPokemon(pokemon.url)); // Ajouter un écouteur d'événements pour afficher les détails du Pokémon lors du clic sur la case

            pokemonGridElement.appendChild(pokemonBox); // Ajouter la case à l'élément de grille
        });
    }

    function handleSearchFormSubmit(event) {
        event.preventDefault(); // Empêcher le comportement par défaut du formulaire
        searchResultsElement.textContent = "Les résultats de votre recherche ne sont pas disponibles";
    }
    searchForm.addEventListener("submit", handleSearchFormSubmit);

    function afficherDetailsPokemon(url) {
        fetch(url)
            .then((response) => response.json())
            .then((pokemon) => {
                pokemonDetailsElement.innerHTML = `
                <h2>${pokemon.name}</h2>
                <p>Numéro: ${pokemon.id}</p>
                <p>Hauteur: ${pokemon.height} m</p>
                <p>Poids: ${pokemon.weight} grammes</p>
                <p><strong>Image:</strong> <img src="${pokemon.sprites.front_default}" alt="Image de ${pokemon.name}"></p> 
                <p><strong>Statistiques:</strong> ${JSON.stringify(pokemon.stats)}</p>
            `;
            })
            .catch((error) => {
                console.error('Une erreur est survenue lors de la récupération des détails du pokémon :', error);
            });
    }

    fetchData(); 
});

