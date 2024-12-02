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
                const tableBody = document.getElementById("portfolio-table").getElementsByTagName('tbody')[0];

                // Clear any existing rows
                tableBody.innerHTML = '';

                // Loop through the data and create rows for each portfolio
                data.forEach(portofolio => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${portofolio.id}</td>
                        <td>${portofolio.title}</td>
                        <td>${portofolio.description}</td>
                        <td><img src="${portofolio.image}" alt="${portofolio.title}" style="width: 100px; height: auto;"></td>
                        <td>${portofolio.type}</td>
                        <td>
                            <button onclick="editPortofolio('${portofolio.id}')">Edit</button>
                            <button onclick="deletePortofolio('${portofolio.id}')">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
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

// Function to handle editing portfolio (just a placeholder)
function editPortofolio(portofolioId) {
    console.log(`Edit portofolio with ID: ${portofolioId}`);
    // Implement edit functionality here (e.g., open a modal, go to an edit page, etc.)
}

// Function to handle deleting portfolio (just a placeholder)
function deletePortofolio(portofolioId) {
    if (confirm(`Are you sure you want to delete portfolio with ID: ${portofolioId}?`)) {
        // Call API to delete portfolio (to be implemented)
        console.log(`Portfolio with ID ${portofolioId} deleted`);
    }
}

// Call the function to fetch and display portfolio data when the page loads
fetchPortofolios();
