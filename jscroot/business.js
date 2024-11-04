import JSCroot from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.1/api.js';

let currentTable = 'salesTable'; // Default ke tabel sales

function showSales() {
    document.getElementById('salesTable').classList.remove('hidden');
    document.getElementById('expensesTable').classList.add('hidden');
    currentTable = 'salesTable';
    fetchSalesData();
}

function showExpenses() {
    document.getElementById('expensesTable').classList.remove('hidden');
    document.getElementById('salesTable').classList.add('hidden');
    currentTable = 'expensesTable';
    fetchExpensesData();
}

async function fetchSalesData() {
    const response = await fetch('http://localhost:8081/transaksi');
    let salesData = await response.json();

    // Contoh dekripsi data, jika tersedia fungsi decryptData di JSCroot
    salesData = await Promise.all(salesData.map(async sale => {
        sale.customer_name = await JSCroot.decryptData(sale.customer_name);  // Menggunakan dekripsi, jika perlu
        sale.products = await Promise.all(sale.products.map(async product => {
            product.name = await JSCroot.decryptData(product.name);
            return product;
        }));
        return sale;
    }));

    const salesTableBody = document.getElementById('salesTableBody');
    salesTableBody.innerHTML = '';

    salesData.forEach(sale => {
        const productNames = sale.products.map(product => product.name).join(', ');
        const row = `<tr>
            <td>${new Date(sale.transactionDate).toLocaleDateString()}</td>
            <td>${sale.customer_name}</td>
            <td>${productNames}</td>
            <td>${sale.total_amount}</td>
            <td>${sale.payment_method}</td>
        </tr>`;
        salesTableBody.innerHTML += row;
    });
}

async function fetchExpensesData() {
    const response = await fetch('http://localhost:8081/expense');
    let expensesData = await response.json();

    // Dekripsi nama pengeluaran
    expensesData = await Promise.all(expensesData.map(async expense => {
        expense.expense_name = await JSCroot.decryptData(expense.expense_name);
        return expense;
    }));

    const expensesTableBody = document.getElementById('expensesTableBody');
    expensesTableBody.innerHTML = '';

    expensesData.forEach(expense => {
        const row = `<tr>
            <td>${new Date(expense.expense_date).toLocaleDateString()}</td>
            <td>${expense.expense_name}</td>
            <td>${expense.amount}</td>
            <td>${expense.category}</td>
        </tr>`;
        expensesTableBody.innerHTML += row;
    });
}

async function fetchCustomers() {
    const response = await fetch('http://localhost:8081/customers');
    let customersData = await response.json();

    // Dekripsi data pelanggan jika diperlukan
    customersData = await Promise.all(customersData.map(async customer => {
        customer.name = await JSCroot.decryptData(customer.name);
        customer.email = await JSCroot.decryptData(customer.email);
        customer.phone = await JSCroot.decryptData(customer.phone);
        customer.address = await JSCroot.decryptData(customer.address);
        return customer;
    }));

    const customersTableBody = document.getElementById('customersTableBody');
    customersTableBody.innerHTML = '';

    customersData.forEach(customer => {
        const row = `<tr>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
        </tr>`;
        customersTableBody.innerHTML += row;
    });
}

function exportCurrentTableToCSV() {
    const tableBodyId = currentTable === 'salesTable' ? 'salesTableBody' : 'expensesTableBody';
    const filename = currentTable === 'salesTable' ? 'sales_transactions.csv' : 'expense_transactions.csv';
    exportToCSV(tableBodyId, filename);
}

function exportToCSV(tableId, filename) {
    const rows = document.querySelectorAll(`#${tableId} tr`);
    const csvContent = Array.from(rows).map(row => {
        const columns = row.querySelectorAll('th, td');
        return Array.from(columns).map(column => column.textContent).join(',');
    }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

// Fetch initial data
showSales();
fetchCustomers();