

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultContainer = document.getElementById('result-container');

searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query) {
        try {
            const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`, {
                headers: {
                    'X-Api-Key': '0C0Kqwnl57Aag2frNVJkaw==oTPc603sQuwTGCzK' // Replace with your actual API key
                }
            });
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                const resultHTML = data.items.map((item) => {
                    return `
                        <h2>${item.name}</h2>
                        <p>Calories: ${item.calories}</p>
                        <p>Fat: ${item.fat_total_g}g (Total), ${item.fat_saturated_g}g (Saturated)</p>
                        <p>Protein: ${item.protein_g}g</p>
                        <p>Carbohydrates: ${item.carbohydrates_total_g}g</p>
                        <p>Sugar: ${item.sugar_g}g</p>
                        <p>Fiber: ${item.fiber_g}g</p>
                        <p>Sodium: ${item.sodium_mg}mg</p>
                        <p>Potassium: ${item.potassium_mg}mg</p>
                    `;
                }).join('');
                resultContainer.innerHTML = resultHTML;
            } else {
                resultContainer.innerHTML = 'No results found.';
            }
        } catch (error) {
            console.error(`Error fetching data: ${error.message}`);
            resultContainer.innerHTML = 'Error: Unable to fetch data. Please try again.';
        }
    } else {
        resultContainer.innerHTML = 'Please enter a search query.';
    }
});