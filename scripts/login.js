document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form submission

    // Collect form data
    const formData = new FormData(this);
    const loginData = {
        username: formData.get('username'),
        password: formData.get('password'),
    };

    // Send the data to the backend
    try {
        const response = await fetch('http://127.0.0.1:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            credentials: 'include',
        });

        const data = await response.json();
        console.log('Response JSON:', data); // Debugging response

        if (response.ok && data.token) {
            // Save token in cookies with key "Auth"
            document.cookie = `Auth=${data.token}; path=/; max-age=86400; SameSite=Lax`;

            // Redirect to dashboard or success page
            // document.getElementById('response-message').textContent = 'Login successful! Redirecting...';
            window.location.href = '/dashboard.html'; // Replace with your actual dashboard URL
        } else {
            // Handle error
            document.getElementById('response-message').textContent = `Galat: ${data.message || 'Invalid response from server'}`;
        }
    } catch (error) {
        console.error('Error during login:', error);
        document.getElementById('response-message').textContent = 'There was an error during login.';
    }
});