document.addEventListener("DOMContentLoaded", () => {

    const charactersContainer = document.getElementById("character-container");
    const loadMoreButton = document.getElementById("load-more");
    const characterCardTemplate = document.getElementById("character-card-template");

    // initial API URL
    let nextPageUrl = "https://dragonball-api.com/api/characters";

    // Fetch data character dragonball api
    async function fetchCharacters(url)
    {
        try {
            // good condition
            const response = await fetch(url);
            const data = await response.json();

            // console.log(data);

            // Access character from data api
            const characters = Array.isArray(data.items)
                ? data.items
                : (() => {
                    throw new Error("gak bisa dapet data nya");
                })();

            characters.forEach((character) => {
                const cardElement = characterCardTemplate.content.cloneNode(true);

                // set image
                const imageElement = cardElement.querySelector(".character-image");
                imageElement.src = character.image;
                imageElement.alt = character.name;

                // set name
                const nameElement = cardElement.querySelector(".character-name");
                nameElement.textContent = character.name;

                // set race
                const raceElement = cardElement.querySelector(".character-race");
                raceElement.textContent = `Race: ${character.race}`;

                // append to container
                charactersContainer.appendChild(cardElement);
            });

            // update pagination url
            nextPageUrl = data.links.next || null;

            // hide the btn if no next page
            if (!nextPageUrl) {
                loadMoreButton.style.display = "none";
            }

        } catch (error) {
            // error condition
            console.error("error dapetin data", error);
        }
    }

    // Event listener for load btn
    loadMoreButton.addEventListener("click", () => {
        if (nextPageUrl) {
            fetchCharacters(nextPageUrl);
        }
    });

    // init fetch
    fetchCharacters(nextPageUrl);

});