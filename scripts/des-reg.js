
document.getElementById('register-form-designer').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent form submission

    // Collect form data
    const formData = new FormData(this);
    const userData = {
        username: formData.get('username'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: formData.get('password'),
        role: 2
    };

    // Send the data to the backend
    try {
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            // Handle success
            // document.getElementById('response-message').textContent = `User registered successfully! User ID: ${data.user_id}`;

            console.log('redirect to /pages/login.html');
            window.location.href = '/pages/login.html';
        } else {
            // Handle error
            document.getElementById('response-message').textContent = `Error: ${data.message}`;
        }
    } catch (error) {
        console.error('Error during registration:', error);
        document.getElementById('response-message').textContent = 'There was an error during registration.';
    }
});