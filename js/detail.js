document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://dragonball-api.com/api/characters"; // Base API URL

  // Get character ID from the query string
  const urlParams = new URLSearchParams(window.location.search);
  const characterId = urlParams.get("id");

  if (!characterId) {
      console.error("Character ID not found in the URL.");
      return;
  }

  // Fetch character details
  async function fetchCharacterDetails(id) {
      try {
          const response = await fetch(`${apiUrl}/${id}`);
          if (!response.ok) {
              throw new Error("Failed to fetch character details.");
          }

          const character = await response.json();

          // Populate the page with character details
          document.getElementById("character-image").src = character.image;
          document.getElementById("character-image").alt = character.name;
          document.getElementById("character-name").textContent = character.name;
          document.getElementById("character-description").textContent =
              character.description || "No description available.";
          document.getElementById("character-race").textContent = character.race || "Unknown";
          document.getElementById("character-power").textContent = character.powerLevel || "N/A";
      } catch (error) {
          console.error("Error fetching character details:", error);
      }
  }

  // Fetch and display character details
  fetchCharacterDetails(characterId);
});