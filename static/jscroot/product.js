// Import JSCroot from the CDN (pastikan JSCroot sudah di-load sebelum script ini dijalankan)
{/* <script src="https://path-to-jscroot-cdn.js"></script> */}
import JSCroot from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.1/api.js';

// Function to format numbers as Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(number);
}

// Array to store product data retrieved from backend
let products = [];
let currentPage = 1;
const itemsPerPage = 8; // Number of products per page

// Function to fetch products from the backend using JSCroot
async function fetchProducts() {
    try {
        products = await JSCroot.get(
            "https://asia-southeast2-awangga.cloudfunctions.net/itungin/products"
        ); // Updated URL

        // Render the product table with initial page
        renderProductTable(products, currentPage);
        setupPagination(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Function to render product table
function renderProductTable(productsArray, page) {
    const productTable = document.getElementById("product-table");

    // Clear existing rows
    document.querySelectorAll(".row.product").forEach((row) => row.remove());

    // Calculate start and end index for the current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const paginatedProducts = productsArray.slice(startIndex, endIndex);

    // Loop through the paginated products and create new rows
    paginatedProducts.forEach((product) => {
        const row = document.createElement("div");
        row.classList.add("row", "product");

        row.innerHTML = `
            <div class="cell" data-title="Product">${product.name}</div>
            <div class="cell" data-title="Unit Price">${formatRupiah(product.price)}</div>
            <div class="cell" data-title="Category">${product.category}</div>
            <div class="cell" data-title="Description">${product.description}</div>
            <div class="cell" data-title="Stock">${product.stock}</div>
            <div class="cell">
                <button type="button" class="btn btn-edit" data-id="${product.id}">
                    <i class="fas fa-pencil-alt"></i> <!-- Edit icon -->
                </button>
                <button type="button" class="btn btn-delete" data-id="${product.id}">
                    <i class="fas fa-trash-alt"></i> <!-- Delete icon -->
                </button>
            </div>
        `;

        productTable.appendChild(row);
    });
}

// Event delegation for edit and delete buttons
document.getElementById("product-table").addEventListener("click", function (event) {
    const target = event.target;
    const productId = target.closest("button")?.getAttribute("data-id"); // Get product ID from closest button

    if (target.closest(".btn-edit")) {
        editProduct(productId); // Call edit function if edit button is clicked
    } else if (target.closest(".btn-delete")) {
        deleteProduct(productId); // Call delete function if delete button is clicked
    }
});

// Function to delete a product using JSCroot
async function deleteProduct(productId) {
    if (confirm("Are you sure you want to delete this product?")) {
        try {
            const response = await JSCroot.delete(
                `https://asia-southeast2-awangga.cloudfunctions.net/itungin/products/${productId}`
            );

            if (response.ok) {
                alert("Product deleted successfully!");
                fetchProducts(); // Reload the product list after deletion
            } else {
                alert("Failed to delete the product.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }
}

// Remaining functions: setupPagination, updatePaginationLinks, editProduct, etc.
// These functions remain the same, as they do not require `fetch` or `JSCroot`
// ...

// Call the function to fetch and display products when the page loads
window.onload = fetchProducts;

// Event listeners for adding new product and exporting to CSV
document.getElementById("exportCsvBtn").addEventListener("click", function () {
    window.location.href =
        "https://asia-southeast2-awangga.cloudfunctions.net/itungin/products-export-csv"; // Updated URL
});

document.getElementById("addProductBtn").addEventListener("click", function () {
    window.location.href = "AddProduct.html";
});
