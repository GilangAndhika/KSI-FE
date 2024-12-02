// Function to fetch portfolio data from the backend
async function fetchPortfolios() {
    try {
        const response = await fetch('http://127.0.0.1:8080/portofolios'); // Adjust endpoint if needed
        if (!response.ok) {
            throw new Error('Failed to fetch portfolios');
        }

        const data = await response.json(); // Get the JSON data

        // Get the table body element
        const tableBody = document.querySelector('#portfolio-table tbody');
        tableBody.innerHTML = ''; // Clear any existing rows

        // Loop through the portfolios and add rows to the table
        data.portofolios.forEach(portfolio => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${portfolio.id}</td>
                <td>${portfolio.title}</td>
                <td>${portfolio.username}</td>
                <td>${portfolio.email}</td>
                <td>${portfolio.phone}</td>
                <td>
                    ${portfolio.role === 0 ? 'Customer' : portfolio.role === 1 ? 'Admin' : 'Designer'}
                </td>
                <td>${portfolio.description}</td>
                <td><img src="http://127.0.0.1:8080/uploads/${portfolio.image}" alt="Design Image" width="100"></td>
                <td>${portfolio.type}</td>
                <td>
                    <button class="edit-btn" data-id="${portfolio.id}">Edit</button>
                    <button class="delete-btn" data-id="${portfolio.id}">Delete</button>
                </td>
            `;
            
            tableBody.appendChild(row); // Add the new row to the table
        });
    } catch (error) {
        console.error('Error fetching portfolios:', error);
    }
}

// Call fetchPortfolios function on page load
document.addEventListener('DOMContentLoaded', fetchPortfolios);

// Handle "Input" button click to redirect to portfolio input page
document.getElementById('input-button').addEventListener('click', function () {
    window.location.href = '/pages/admin/input-portofolio.html'; // Adjust the URL for the input form
});

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
