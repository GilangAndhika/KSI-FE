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
            
            // Get table body elements
            const adminTableBody = document.querySelector("#admin-table tbody");
            const designerTableBody = document.querySelector("#designer-table tbody");
            const userTableBody = document.querySelector("#user-table tbody");

            // Clear existing rows
            adminTableBody.innerHTML = '';
            designerTableBody.innerHTML = '';
            userTableBody.innerHTML = '';

            // Loop through the data and distribute users into appropriate tables
            data.forEach(user => {
                const row = document.createElement('tr');
                const roleName = getRoleName(user.role);
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${roleName}</td>
                    <td>
                        <button onclick="editUser('${user.id}')">Edit</button>
                        <button onclick="deleteUser('${user.id}')">Delete</button>
                    </td>
                `;

                if (user.role === 1) {
                    adminTableBody.appendChild(row); // Admin role
                } else if (user.role === 2) {
                    designerTableBody.appendChild(row); // Designer role
                } else {
                    userTableBody.appendChild(row); // User role
                }
            });
        } else {
            console.error("Failed to fetch user data:", response.status);
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

// Function to get role name
function getRoleName(role) {
    switch (role) {
        case 0:
            return 'Customer';
        case 1:
            return 'Admin';
        case 2:
            return 'Designer';
        default:
            return 'Undefined';
    }
}

// Function to open the modal for adding a new user
function openInputUserModal() {
    // Clear any previous input data in the modal
    document.getElementById('input-username').value = '';
    document.getElementById('input-phone').value = '';
    document.getElementById('input-email').value = '';
    document.getElementById('input-password').value = '';
    document.getElementById('input-role').value = 0;  // Default role to Customer

    // Show the modal
    document.getElementById('inputUserModal').style.display = 'block';
}

// Function to close the modal for adding a new user
function closeInputModal() {
    document.getElementById('inputUserModal').style.display = 'none';
}

// Function to add a new user
async function inputNewUser() {
    const username = document.getElementById('input-username').value;
    const phone = document.getElementById('input-phone').value;
    const email = document.getElementById('input-email').value;
    const password = document.getElementById('input-password').value;
    const role = document.getElementById('input-role').value;

    const newUser = {
        username,
        phone,
        email,
        password,
        role: parseInt(role),
    };

    try {
        const response = await fetch('http://127.0.0.1:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            alert("User added successfully!");
            closeInputModal();
            fetchUserData(); // Refresh the user table to include the new user
        } else {
            console.error("Failed to add user:", response.status);
            alert("Error: Could not add user.");
        }
    } catch (error) {
        console.error("Error adding user:", error);
        alert("An unexpected error occurred.");
    }
}

// Function to open the edit modal and populate data
async function editUser(userId) {
    try {
        const response = await fetch(`http://127.0.0.1:8080/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.ok) {
            const user = await response.json();
            document.getElementById('edit-user-id').value = user.id;
            document.getElementById('edit-username').value = user.username;
            document.getElementById('edit-email').value = user.email;
            document.getElementById('edit-phone').value = user.phone;
            document.getElementById('edit-role').value = user.role;

            document.getElementById('editUserModal').style.display = 'block';
        } else {
            console.error("Failed to fetch user data for editing:", response.status);
        }
    } catch (error) {
        console.error("Error fetching user data for editing:", error);
    }
}

// Function to save changes to the user
async function saveUserChanges() {
    const userId = document.getElementById('edit-user-id').value;
    const username = document.getElementById('edit-username').value;
    const phone = document.getElementById('edit-phone').value;
    const email = document.getElementById('edit-email').value;
    const role = document.getElementById('edit-role').value;

    // Membuat data untuk dikirimkan ke backend
    const updatedUser = {
        username,
        phone,
        email,
        role: parseInt(role), // Pastikan role adalah angka
    };

    try {
        const response = await fetch(`http://127.0.0.1:8080/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
            console.log("User updated successfully.");
            alert("User updated successfully!");
            closeEditModal(); // Menutup modal setelah update
            fetchUserData(); // Refresh the user table
        } else {
            console.error("Failed to update user:", response.status);
            alert("Error: Could not update user.");
        }
    } catch (error) {
        console.error("Error updating user:", error);
        alert("An unexpected error occurred.");
    }
}

// Function to delete user
async function deleteUser(userId) {
    // Validate userId
    if (!userId) {
        console.error("Invalid user ID provided for deletion.");
        return;
    }

    // Confirm deletion
    const confirmation = confirm(`Are you sure you want to delete the user with ID: ${userId}?`);
    if (!confirmation) {
        console.log("User deletion canceled.");
        return;
    }

    try {
        // Send DELETE request
        const response = await fetch(`http://127.0.0.1:8080/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.ok) {
            console.log(`User with ID: ${userId} deleted successfully.`);
            // Refresh the user list
            await fetchUserData();
        } else {
            const errorMessage = await response.text();
            console.error(`Failed to delete user (ID: ${userId}):`, response.status, errorMessage);
            alert(`Error: Could not delete user. ${errorMessage}`);
        }
    } catch (error) {
        console.error(`Error deleting user (ID: ${userId}):`, error);
        alert("An unexpected error occurred. Please try again.");
    }
}

// Function to close the edit modal
function closeEditModal() {
    document.getElementById('editUserModal').style.display = 'none';
}

// Call the function to fetch and display data when the page loads
fetchUserData();

// Add event listener for "Tambah User" button
document.getElementById('addUserButton').addEventListener('click', openInputUserModal);
