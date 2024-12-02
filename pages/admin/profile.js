// Function to fetch and display admin profile by ID
async function fetchAdminProfile() {
    const userId = '46130da0-a342-4e65-bca4-ce921676bb14'; // Replace with actual admin ID

    try {
        const response = await fetch(`http://127.0.0.1:8080/profile/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Allow cookies if needed
        });

        if (response.ok) {
            const data = await response.json();

            if (data) {
                // Populate the profile data on the page
                document.getElementById('profile-id').textContent = data.id;
                document.getElementById('profile-username').textContent = data.username;
                document.getElementById('profile-email').textContent = data.email;
                document.getElementById('profile-phone').textContent = data.phone;
                document.getElementById('profile-role').textContent = data.role === 0 ? 'User' : data.role === 1 ? 'Admin' : 'Designer';
            } else {
                // Handle case where no profile data is found
                document.getElementById('profile-details').innerHTML = '<p>Profile not found.</p>';
            }
        } else {
            console.error("Failed to fetch profile data:", response.status);
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
    }
}

// // Function to fetch and display user list in table
// async function fetchUserList() {
//     try {
//         const response = await fetch('http://127.0.0.1:8080/users', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             credentials: 'include', // Allow cookies if needed
//         });

//         if (response.ok) {
//             const users = await response.json();
//             const tableBody = document.getElementById('user-table').getElementsByTagName('tbody')[0];

//             // Clear existing rows
//             tableBody.innerHTML = '';

//             // Add rows for each user
//             users.forEach(user => {
//                 const row = tableBody.insertRow();
//                 row.insertCell(0).textContent = user.id;
//                 row.insertCell(1).textContent = user.username;
//                 row.insertCell(2).textContent = user.email;
//                 row.insertCell(3).textContent = user.phone;
//                 row.insertCell(4).textContent = user.role === 0 ? 'User' : user.role === 1 ? 'Admin' : 'Designer';
//             });
//         } else {
//             console.error("Failed to fetch users:", response.status);
//         }
//     } catch (error) {
//         console.error("Error fetching users:", error);
//     }
// }

// Call the functions to fetch and display profile data and user list
fetchAdminProfile();
fetchUserList();
