// Function to get the value of a specific cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Retrieve the 'Auth' token, 'ID', and 'Role' cookies
const authToken = getCookie('Auth');  // Token for authentication
const userId = getCookie('ID');       // User ID for identifying the designer
const userRole = getCookie('Role');   // Role of the user (e.g., 2 for Designer)

console.log('Auth Token:', authToken);
console.log('User ID:', userId);
console.log('User Role:', userRole);


async function fetchDesignerData() {
    const userId = getCookie('ID'); // Get the user ID from the cookie
    const authToken = getCookie('Auth'); // Get the Auth token if necessary

    if (!userId || !authToken) {
        alert('User not logged in or missing authentication token.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8080/profile/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}` // Include the auth token if required
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch designer data');
        }

        const designerData = await response.json();

        // Populate form fields with designer data
        document.querySelector('input[name="username"]').value = designerData.username;
        document.querySelector('input[name="email"]').value = designerData.email;
        document.querySelector('input[name="phone"]').value = designerData.phone;
        document.querySelector('select[name="role"]').value = designerData.role;

    } catch (error) {
        console.error('Error fetching designer data:', error);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchDesignerData);

