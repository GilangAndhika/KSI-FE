// Function to fetch and display user data
async function fetchUserData() {
    try {
        const response = await fetch('http://127.0.0.1:8080/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Allow cookies if needed
        });

        if (response.ok) {
            const data = await response.json();
            const tableBody = document.querySelector("#user-table tbody");

            // Clear existing rows
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

// Function to edit user
async function editUser(userId) {
    try {
        const response = await fetch(`http://127.0.0.1:8080/profile/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.ok) {
            const user = await response.json();
            // Open a modal or populate an edit form with the user data
            console.log('Editing user:', user);

            // You could populate the edit form with the user's current data here
            // Example: document.getElementById('edit-username').value = user.username;
            // Then show a modal or a new page to update the user info
        } else {
            console.error("Failed to fetch user data for editing:", response.status);
        }
    } catch (error) {
        console.error("Error fetching user data for editing:", error);
    }
}

// Function to delete user
async function deleteUser(userId) {
    const confirmation = confirm("Are you sure you want to delete this user?");
    if (!confirmation) {
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8080/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.ok) {
            console.log('User deleted successfully');
            // Reload the user list to reflect changes
            fetchUserData();
        } else {
            console.error("Failed to delete user:", response.status);
        }
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}
