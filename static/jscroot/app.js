    import JSCroot from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.1/api.js';

    // Data dummy untuk faktur dan pengeluaran
    const invoices = [
        { id: 1, description: 'Faktur 001', amount: 5000000 },
        { id: 2, description: 'Faktur 002', amount: 3000000 },
    ];

    const expenses = [
        { id: 1, description: 'Pembelian Barang', amount: 1000000 },
        { id: 2, description: 'Pembayaran Gaji', amount: 2000000 },
    ];

    // Fungsi untuk menampilkan faktur
    async function displayInvoices() {
        const invoiceList = document.getElementById('invoice-list');
        invoiceList.innerHTML = ''; // Kosongkan daftar faktur

        for (const invoice of invoices) {
            const li = document.createElement('li');
            // Misalnya, enkripsi data sebelum menampilkannya
            const encryptedDescription = await JSCroot.encryptData(invoice.description);
            li.textContent = `${encryptedDescription} - Rp ${invoice.amount}`;
            invoiceList.appendChild(li);
        }
    }

    // Fungsi untuk menampilkan pengeluaran
    async function displayExpenses() {
        const expenseList = document.getElementById('expense-list');
        expenseList.innerHTML = ''; // Kosongkan daftar pengeluaran

        for (const expense of expenses) {
            const li = document.createElement('li');
            // Enkripsi deskripsi pengeluaran
            const encryptedDescription = await JSCroot.encryptData(expense.description);
            li.textContent = `${encryptedDescription} - Rp ${expense.amount}`;
            expenseList.appendChild(li);
        }
    }

    // Panggil fungsi untuk menampilkan data saat halaman dimuat
    window.onload = async function () {
        await displayInvoices();
        await displayExpenses();
    };

