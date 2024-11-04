import JSCroot from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.1/api.js';

// Event listener untuk form submit
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Mencegah submit form secara default

    // Mengambil nilai dari form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const umkmName = document.getElementById('umkm_name').value;

    try {
        // Enkripsi data sebelum dikirim
        const encryptedName = await JSCroot.encryptData(name);
        const encryptedEmail = await JSCroot.encryptData(email);
        const encryptedPassword = await JSCroot.encryptData(password);
        const encryptedUmkmName = await JSCroot.encryptData(umkmName);

        // Membuat object untuk dikirim ke backend dengan data terenkripsi
        const data = {
            name: encryptedName,
            email: encryptedEmail,
            password: encryptedPassword,
            umkm_name: encryptedUmkmName
        };

        const response = await fetch('http://localhost:8081/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Mengecek response dari server
        if (response.ok) {
            const result = await response.json();
            alert('Registration successful!');
            console.log(result);
            // Redirect atau lakukan sesuatu setelah berhasil
        } else {
            const error = await response.json();
            alert('Registration failed: ' + error.message);
            console.error(error);
        }
    } catch (err) {
        alert('Error occurred: ' + err.message);
        console.error(err);
    }
});

// Event listener untuk tombol "Back to main menu"
document.getElementById('back-btn').addEventListener('click', function (e) {
    e.preventDefault(); // Mencegah default button behavior
    window.location.href = 'LP.html'; // Redirect ke halaman LP.html
});