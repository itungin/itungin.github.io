document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    const payload = {
        name: name,
        email: email,
        No_hp: phone,
        password: password
    };

    try {
        const response = await fetch("https://asia-southeast2-awangga.cloudfunctions.net/itungin/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        const messageDiv = document.getElementById('message');

        if (result.status === 'success') {
            messageDiv.style.color = 'green';
            messageDiv.textContent = "Registration successful! ID: " + result.data.id;
        } else {
            messageDiv.style.color = 'red';
            messageDiv.textContent = "Registration failed: " + result.message;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred. Please try again.';
    }
});


// Event listener for "Back to main menu" button
document.getElementById('back-btn').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default button behavior
    window.location.href = 'https://itung.in.my.id/'; // Redirect to LP.html
});
