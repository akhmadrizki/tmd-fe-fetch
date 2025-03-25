document.addEventListener("DOMContentLoaded", () => {
  const charactersContainer = document.getElementById("characters-container");
  const loadMoreButton = document.getElementById("load-more");
  const characterCardTemplate = document.getElementById(
    "character-card-template"
  );
  let nextPageUrl = "https://dragonball-api.com/api/characters"; // Initial API URL

  // Fetch characters from the Dragon Ball API
  async function fetchCharacters(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      // Log the data to inspect its structure
      console.log(data);

      // Access the characters from the "items" array
      const characters = Array.isArray(data.items)
        ? data.items
        : (() => {
            throw new Error("Unexpected API response structure");
          })();

      // Render characters
      characters.forEach((character) => {
        // Clone the template
        const cardElement = characterCardTemplate.content.cloneNode(true);

        // Set image
        const imageElement = cardElement.querySelector(".character-image");
        imageElement.src = character.image;
        imageElement.alt = character.name;

        // Set name
        const nameElement = cardElement.querySelector(".character-name");
        nameElement.textContent = character.name;

        // Set race
        const raceElement = cardElement.querySelector(".character-race");
        raceElement.textContent = `Race: ${character.race}`;

        // Append to container
        charactersContainer.appendChild(cardElement);
      });

      // Update the next page URL
      nextPageUrl = data.links.next || null;

      // Hide the "Load More" button if there's no next page
      if (!nextPageUrl) {
        loadMoreButton.style.display = "none";
      }
    } catch (error) {
      console.error("Error fetching characters:", error);

      // Create error message element
      const errorDiv = document.createElement("div");
      errorDiv.className = "col-12";
      errorDiv.innerHTML = `
        <div class="alert alert-danger">
          Failed to load characters. Please try again later.
        </div>
      `;

      charactersContainer.appendChild(errorDiv);
    }
  }

  // Event listener for the "Load More" button
  loadMoreButton.addEventListener("click", () => {
    if (nextPageUrl) {
      fetchCharacters(nextPageUrl);
    }
  });

  // Initial fetch
  fetchCharacters(nextPageUrl);
});
