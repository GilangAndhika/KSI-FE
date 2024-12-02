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

// Variable to store designer data
let designerData = null;

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

        designerData = await response.json();

        // Populate form fields with designer data
        document.querySelector('input[name="id_user"]').value = designerData.id;
        document.querySelector('input[name="username"]').value = designerData.username;

        // Enable the form submit button after the data is fetched
        document.querySelector('button[type="submit"]').disabled = false;

    } catch (error) {
        console.error('Error fetching designer data:', error);
    }
}

// Function to handle form submission and send data to backend
async function handleFormSubmit(event) {
    event.preventDefault();  // Prevent the default form submission

    if (!designerData || !designerData.id) {
        alert('Designer data is missing or incomplete.');
        return;
    }

    // Get the form data
    const form = event.target;
    const formData = new FormData(form);

    // Use the designerData.id for the id_user
    formData.set('id_user', designerData.id); // Set the user ID from designer data

    // Get the auth token from cookies
    const authToken = getCookie('Auth');
    if (!authToken) {
        alert("Unauthorized: Token is missing.");
        return;
    }

    try {
        // Send the form data to the backend
        const response = await fetch('http://127.0.0.1:8080/portofolio', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`, // Include the auth token for authentication
            },
            body: formData, // Send form data, including file and other form inputs
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Portfolio created successfully with ID: ${result.portofolio_id}`);
        } else {
            const errorText = await response.text(); // Read the response as text
            alert(`Failed to create portfolio: ${errorText}`);
        }
    } catch (error) {
        console.error('Error submitting portfolio:', error);
        alert('Error submitting portfolio. Please try again.');
    }

    console.log('Design Image:', formData.get('design_image'));
    console.log('Design Title:', formData.get('design_title'));
    console.log('Design Description:', formData.get('design_description'));
    console.log('Design Type:', formData.get('design_type'));

}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchDesignerData(); // Populate form with user data

    // Initially disable the submit button until designer data is fetched
    document.querySelector('button[type="submit"]').disabled = true;

    // Add submit event listener to the form
    document.querySelector('form').addEventListener('submit', handleFormSubmit);
});
