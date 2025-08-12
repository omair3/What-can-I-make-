document.addEventListener("DOMContentLoaded", () => {
  const recipesContainer = document.getElementById("recipe-results");
  const searchBtn = document.getElementById("search-btn");
  const input = document.getElementById("ingredients");

  searchBtn.addEventListener("click", () => {
    const ingredients = input.value.trim();
    if (!ingredients) {
      alert("Please enter some ingredients!");
      return;
    }
    fetchRecipes(ingredients);
  });

  function showLoading() {
    recipesContainer.innerHTML = `<div class="loading-spinner">Loading...</div>`;
  }

  function fetchRecipes(ingredients) {
    showLoading();

    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
      ingredients
    )}&number=6&apiKey=36bcc5ee8e5a4a1b90d23c41e784a8f4`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        displayRecipes(data);
      })
      .catch((err) => {
        recipesContainer.innerHTML =
          '<p class="empty-message">Error loading recipes. Try again.</p>';
        console.error(err);
      });
  }

  function displayRecipes(recipes) {
    if (!recipes.length) {
      recipesContainer.innerHTML =
        '<p class="empty-message">No recipes found. Try different ingredients.</p>';
      return;
    }
    recipesContainer.innerHTML = "";
    recipes.forEach((r) => {
      const div = document.createElement("div");
      div.classList.add("recipe");
      div.innerHTML = `
        <img src="${r.image}" alt="${r.title}" />
        <div class="recipe-content">
          <h3>${r.title}</h3>
          <p><strong>Used Ingredients:</strong> ${r.usedIngredientCount}</p>
          <p><strong>Missed Ingredients:</strong> ${r.missedIngredientCount}</p>
          <a href="https://spoonacular.com/recipes/${r.title
            .replace(/\s+/g, "-")
            .toLowerCase()}-${r.id}" target="_blank" rel="noopener noreferrer">
            View Recipe →
          </a>
        </div>
      `;
      recipesContainer.appendChild(div);
    });
  }
});
