document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Mencegah submit form secara default

    // Mengambil nilai dari form
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const noHp = document.getElementById('No_hp').value.trim(); // Sesuaikan nama variabel

    // Validasi input sebelum mengirim data
    if (!name || !email || !password || !noHp) {
        alert('Semua field wajib diisi!');
        return;
    }

    // Membuat object untuk dikirim ke backend
    const data = {
        name: name,
        email: email,
        password: password,
        No_hp: noHp // Sesuaikan key dengan field di server
    };

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
            // Redirect atau tindakan lain setelah sukses
        } else {
            const error = await response.json();
            alert('Registration failed: ' + (error.response || 'Unknown error'));
            console.error(error);
        }
    } catch (err) {
        alert('Error occurred: ' + err.message);
        console.error(err);
    }
});


// Event listener for "Back to main menu" button
document.getElementById('back-btn').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default button behavior
    window.location.href = 'https://itung.in.my.id/'; // Redirect to LP.html
});
