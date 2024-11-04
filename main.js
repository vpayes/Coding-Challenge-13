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

// Display Product Details Dynamically
function displayProducts(products) {
    const productContainer = document.getElementById("product-container");

    products.forEach(product => {
        const { company, price, name } = product.fields;
        const imgUrl = product.fields.image[0].url;

        
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
            <img src="${imgUrl}" alt="${name}" class="product-image">
            <h2 class="product-name">${name}</h2>
            <p class="product-company">${company}</p>
            <p class="product-price">$${(price / 100).toFixed(2)}</p>
        `;

        productContainer.appendChild(productCard);
    });
}

// Handle Errors Gracefully
function fetchProducts() {
    fetch("https://www.course-api.com/javascript-store-products")
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(products => {
            displayProducts(products);
        })
        .catch(error => {
            console.error("Fetch error:", error);
            document.getElementById("product-container").innerHTML = `
                <p class="error-message">Failed to load products. Please try again later.</p>
            `;
        });
}
