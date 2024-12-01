// Function to fetch and display user data
async function fetchUserData() {
    try {
        const response = await fetch('http://127.0.0.1:8080/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Allow cookies to be included if needed
        });

        if (response.ok) {
            const data = await response.json();
            const tableBody = document.querySelector("#user-table tbody");

            // Clear any existing rows
            tableBody.innerHTML = '';

            // Loop through the data and create rows for each user
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.role === 0 ? 'User' : user.role === 1 ? 'Admin' : 'Designer'}</td>
                    <td><button onclick="editUser('${user.id}')">Edit</button><button onclick="deleteUser('${user.id}')">Delete</button></td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            console.error("Failed to fetch user data:", response.status);
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

// Call the function to fetch and display data when the page loads
fetchUserData();

// Example of edit user function (you can expand it with your own logic)
function editUser(userId) {
    console.log(`Edit user with ID: ${userId}`);
    // Implement edit functionality here (e.g., open a modal, go to an edit page, etc.)
}
