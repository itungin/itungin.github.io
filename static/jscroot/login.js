import JSCroot from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.1/api.js';

document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login-btn'); // Ganti selector tombol login
    const emailInput = document.getElementById('email'); // Ganti selector untuk email
    const passwordInput = document.getElementById('password');

    loginButton.addEventListener('click', async function (event) {
        event.preventDefault(); // Mencegah pengiriman form secara default
        const email = emailInput.value; // Ambil nilai dari input email
        const password = passwordInput.value;

        if (!email || !password) {
            alert('Please complete all fields');
            return;
        }

        try {
            // Enkripsi email dan password sebelum mengirim
            const encryptedEmail = await JSCroot.encryptData(email);
            const encryptedPassword = await JSCroot.encryptData(password);

            const data = {
                email: encryptedEmail,
                password: encryptedPassword,
            };

            const response = await fetch('http://localhost:8081/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const result = await response.json();
            console.log(result);
            alert('Login successful!');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed. Check your email and password.');
        }
    });
});