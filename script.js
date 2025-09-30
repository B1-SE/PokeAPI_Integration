document
  .getElementById("search-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from reloading the page
    const input = document.getElementById("pokemon-input").value.trim().toLowerCase();
    const resultDiv = document.getElementById("pokemon-result");
    if (!input) {
      resultDiv.textContent = "Please enter a Pokémon name or ID.";
      return;
    }
    resultDiv.textContent = "Searching...";
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(input)}`
      );
      if (!res.ok) throw new Error("Pokémon not found");
      const data = await res.json();
      resultDiv.innerHTML = `
              <h3>${
                data.name.charAt(0).toUpperCase() + data.name.slice(1)
              } (#${data.id})</h3>
              <img src="${data.sprites.front_default}" alt="${data.name}">
              <p>Type: ${data.types.map((t) => t.type.name).join(", ")}</p>
          `;
    } catch (e) {
      resultDiv.textContent =
        "Pokémon not found. Please try another name or ID.";
    }
  });