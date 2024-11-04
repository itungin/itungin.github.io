// Import JSCroot from the CDN
import JSCroot from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.1/api.js';

// Async function to submit the expense form
async function submitExpense(event) {
    event.preventDefault();

    const expenseData = {
        expense_name: document.getElementById('expense_name').value,
        amount: parseFloat(document.getElementById('amount').value),
        category: document.getElementById('category').value,
        expense_date: new Date(document.getElementById('expense_date').value).toISOString(),
        payment_method: document.getElementById('payment_method') ? document.getElementById('payment_method').value : "",
        notes: document.getElementById('notes') ? document.getElementById('notes').value : ""
    };

    try {
        // Using JSCroot for fetch request
        const response = await JSCroot.post('http://localhost:8081/expense', expenseData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response && response.status === 200) {
            alert('Pengeluaran berhasil ditambahkan!');
            window.location.href = 'Business.html'; // Redirect to main page
        } else {
            const errorData = await response.json();
            alert(`Gagal menambahkan pengeluaran: ${errorData.message}`);
        }
    } catch (error) {
        alert(`Terjadi kesalahan: ${error.message}`);
    }
}

// Event listener to handle form submission
document.getElementById('expenseForm').addEventListener('submit', submitExpense);
