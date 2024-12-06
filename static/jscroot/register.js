document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Ambil nilai dari form
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const noHp = document.getElementById('No_hp').value.trim();

    // Validasi input
    if (!name || !email || !password || !noHp) {
        alert('Semua field wajib diisi!');
        return;
    }

    // Buat payload untuk backend
    const data = {
        name: name,
        email: email,
        No_hp: noHp, // Sesuai dengan raw body Postman
        password: password
    };

    console.log('Payload yang dikirim:', JSON.stringify(data)); // Debugging

    try {
        const response = await fetch('https://asia-southeast2-awangga.cloudfunctions.net/itungin/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Registration successful!');
            console.log(result);
        } else {
            const error = await response.json();
            alert('Registration failed: ' + (error.response || 'Unknown error'));
            console.error('Error dari server:', error);
        }
    } catch (err) {
        alert('Error occurred: ' + err.message);
        console.error('Error:', err);
    }
});

// Event listener for "Back to main menu" button
document.getElementById('back-btn').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default button behavior
    window.location.href = 'https://itung.in.my.id/'; // Redirect to LP.html
});
