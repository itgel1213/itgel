const apiKey = '34xEfRuPeWZqZ/4qhaMSYQ==dLHvIxG8CQjhOxNF'; // Your API key
const apiUrl = 'https://api.api-ninjas.com/v1/animals';

document.getElementById("animalName").addEventListener("keyup", function() {
    const name = this.value.trim();

    if (name.length < 3) {
        document.getElementById("suggestions").style.display = 'none'; // Hide dropdown if input is too short
        return;
    }

    // Fetch the possible animal names based on input
    fetch(`${apiUrl}?name=${name}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        const suggestionsList = document.getElementById("suggestions");
        suggestionsList.innerHTML = ''; // Clear previous suggestions

        if (data && data.length > 0) {
            // Display dropdown and populate with suggestions
            suggestionsList.style.display = 'block';
            data.forEach(animal => {
                const li = document.createElement("li");
                li.textContent = animal.name;
                li.addEventListener("click", function() {
                    document.getElementById("animalName").value = animal.name; // Set input value to selected animal
                    suggestionsList.style.display = 'none'; // Hide suggestions after selection
                    displayAnimalInfo(animal.name);
                });
                suggestionsList.appendChild(li);
            });
        } else {
            suggestionsList.style.display = 'none'; // Hide dropdown if no data
        }
    })
    .catch(error => {
        console.error('Error fetching animal data:', error);
    });
});

function displayAnimalInfo(name) {
    fetch(`${apiUrl}?name=${name}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        const animalInfoDiv = document.getElementById("animalInfo");
        animalInfoDiv.style.display = "block"; // Show the animal info div

        if (data && data.length > 0) {
            const animal = data[0]; // Take the first animal data
            const animalDetails = `
                <h3>${animal.name}</h3>
                <p><strong>Latin name:</strong> ${animal.latin_name || "Not available"}</p>
                <p><strong>Species:</strong> ${animal.species || "Not available"}</p>
                <p><strong>Life span:</strong> ${animal.life_span || "Not available"}</p>
                <p><strong>Habitat:</strong> ${animal.habitat || "Not available"}</p>
                <p><strong>Diet:</strong> ${animal.diet || "Not available"}</p>
            `;
            animalInfoDiv.innerHTML = animalDetails;
        } else {
            animalInfoDiv.innerHTML = '<p>No data found for this animal.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching animal details:', error);
    });
}
