// Setup Basic HTML Structure for Product Page
// Fetch Products from the API Using Fetch and Promises
document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

function fetchProducts() {
    // Create a custom Promise to handle the fetch operation
    const productPromise = new Promise((resolve, reject) => {
        fetch("https://www.course-api.com/javascript-store-products")
            .then(response => {
                if (!response.ok) {
                    reject("Network response was not ok");
                }
                return response.json();
            })
            .then(products => {
                resolve(products);
            })
            .catch(error => {
                reject(error);
            });
    });
    productPromise
    .then(products => {
        displayProducts(products);
    })
    .catch(error => {
        console.error("Fetch error:", error);
        document.getElementById("product-container").innerHTML = `
            <p class="error-message">Products failed to load. Please try again later.</p>
        `;
    });
}