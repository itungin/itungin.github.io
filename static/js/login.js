document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login-btn'); // Ganti selector tombol login
    const emailInput = document.getElementById('email'); // Ganti selector untuk email
    const passwordInput = document.getElementById('password');

    loginButton.addEventListener('click', function (event) {
        event.preventDefault(); // Mencegah pengiriman form secara default
        const email = emailInput.value; // Ambil nilai dari input email
        const password = passwordInput.value;

        if (!email || !password) {
            alert('Please complete all fields');
            return;
        }

        const data = {
            email: email, // Ganti username dengan email
            password: password,
        };

        fetch('https://asia-southeast2-awangga.cloudfunctions.net/itungin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(result => {
            console.log(result);
            setCookie("login", result.token);
            alert('Login successful!');

            // Simpan data pengguna ke localStorage
            localStorage.setItem('userName', result.name);
            localStorage.setItem('userEmail', result.email);
            localStorage.setItem('userPhoneNumber', result.phone);

            // Redirect setelah user menekan OK
            window.location.href = 'https://itung.in.my.id/dashboard/';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Login failed. Check your email and password.');
        });
    });
});

document.getElementById('back-btn').addEventListener('click', function (e) {
    e.preventDefault(); // Mencegah default button behavior
    window.location.href = 'index.html'; // Redirect ke halaman LP.html
});

function setCookie(name, value) {
    const hours = 8; // Masa berlaku cookie dalam jam
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}
