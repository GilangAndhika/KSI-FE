async function fetchPortofolios() {
    try {
        const response = await fetch('http://127.0.0.1:8080/portofolios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Allow cookies to be included if needed
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData); // Debug response to check structure

            // Extract the `portofolios` array
            const data = responseData.portofolios;

            if (Array.isArray(data)) {
                const container = document.querySelector('.container');

                // Clear any existing portfolio items
                container.innerHTML = `
                    <h1>Portofolio</h1>
                `;

                // Loop through the data and create portfolio items
                data.forEach(portofolio => {
                    const portfolioItem = document.createElement('div');
                    portfolioItem.className = 'portfolio-item';
                    portfolioItem.innerHTML = `
                        <img src="http://127.0.0.1:8080/uploads/${portofolio.image}" alt="${portofolio.title}" style="width: 50%; height: auto;">
                        <h2>${portofolio.title}</h2>
                        <p>${portofolio.description}</p>
                        <p>by ${portofolio.username}</p>
                        <span class="design-type">${portofolio.type}</span>
                        <hr>
                    `;
                    container.appendChild(portfolioItem);
                });
            } else {
                console.error("Portfolios data is not an array:", data);
            }
        } else {
            console.error("Failed to fetch portfolio data:", response.status);
        }
    } catch (error) {
        console.error("Error fetching portfolio data:", error);
    }
}

// Function to handle editing portfolio (placeholder)
function editPortofolio(portofolioId) {
    console.log(`Edit portofolio with ID: ${portofolioId}`);
    // Implement edit functionality here (e.g., open a modal, go to an edit page, etc.)
}

// Function to handle deleting portfolio (placeholder)
function deletePortofolio(portofolioId) {
    if (confirm(`Are you sure you want to delete portfolio with ID: ${portofolioId}?`)) {
        // Call API to delete portfolio (to be implemented)
        console.log(`Portfolio with ID ${portofolioId} deleted`);
    }
}

// Call the function to fetch and display portfolio data when the page loads
fetchPortofolios();
