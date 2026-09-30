
const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        price: 2499,
        category: "Electronics",
        description: "High-quality wireless headphones with clear sound and comfortable design.",
        info: "Wireless headphones suitable for music, calls and everyday entertainment."
    },

    {
        id: 2,
        name: "Casual Sneakers",
        price: 1999,
        category: "Fashion",
        description: "Comfortable casual sneakers suitable for everyday use.",
        info: "Lightweight sneakers designed for comfort and daily wear."
    },

    {
        id: 3,
        name: "Smart Watch",
        price: 3499,
        category: "Accessories",
        description: "A modern smart watch with useful everyday features.",
        info: "Smart watch designed for everyday activity tracking and notifications."
    },

    {
        id: 4,
        name: "Desk Lamp",
        price: 899,
        category: "Home",
        description: "Modern desk lamp perfect for study and workspace.",
        info: "Compact desk lamp suitable for study tables, offices and workspaces."
    }

];

let cart = JSON.parse(localStorage.getItem("cart")) || [];



function addToCart(productId) {

    const product = products.find(
        product => product.id === productId
    );

    if (!product) {
        return;
    }

    
    const existingProduct = cart.find(
        item => item.id === productId
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();

    console.log("Cart:", cart);
}



function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}

function displayCart() {

    const cartContainer =
        document.getElementById("cart-container");

    if (!cartContainer) {
        return;
    }

    cartContainer.innerHTML = "";

    let subtotal = 0;

    cart.forEach(product => {

        const productTotal =
            product.price * product.quantity;

        subtotal += productTotal;

        const productElement =
            document.createElement("div");

        productElement.className = "cart-item";

        productElement.innerHTML = `
            <h3>${product.name}</h3>

            <p>Price: ₹${product.price}</p>

            <p>
                Quantity:
                <button onclick="decreaseQuantity(${product.id})">
                    −
                </button>

                <strong>${product.quantity}</strong>

                <button onclick="increaseQuantity(${product.id})">
                    +
                </button>
            </p>

            <p>
                Product Total: ₹${productTotal}
            </p>

            <button
                onclick="removeFromCart(${product.id})">
                Remove
            </button>

            <hr>
        `;

        cartContainer.appendChild(productElement);
    });


    
    let shipping = 0;

    if (subtotal > 0 && subtotal < 1000) {
        shipping = 100;
    }


    const grandTotal =
        subtotal + shipping;


    

    const subtotalElement =
        document.getElementById("cart-subtotal");

    const shippingElement =
        document.getElementById("cart-shipping");

    const totalElement =
        document.getElementById("cart-total");


    if (subtotalElement) {
        subtotalElement.textContent =
            `₹${subtotal}`;
    }

    if (shippingElement) {
        shippingElement.textContent =
            `₹${shipping}`;
    }

    if (totalElement) {
        totalElement.textContent =
            `₹${grandTotal}`;
    }
}
function displayCheckout() {

    const checkoutItems =
        document.getElementById("checkout-items");

    if (!checkoutItems) {
        return;
    }

    checkoutItems.innerHTML = "";

    let subtotal = 0;


    cart.forEach(product => {

        const productTotal =
            product.price * product.quantity;

        subtotal += productTotal;


        const item =
            document.createElement("div");

        item.innerHTML = `
            <p>
                ${product.name}
                × ${product.quantity}
            </p>

            <p>
                ₹${productTotal}
            </p>

            <hr>
        `;

        checkoutItems.appendChild(item);
    });



    let shipping = 0;

    if (subtotal > 0 && subtotal < 1000) {
        shipping = 100;
    }


    const total =
        subtotal + shipping;


    

    const subtotalElement =
        document.getElementById("checkout-subtotal");

    const shippingElement =
        document.getElementById("checkout-shipping");

    const totalElement =
        document.getElementById("checkout-total");


    if (subtotalElement) {
        subtotalElement.textContent =
            `₹${subtotal}`;
    }

    if (shippingElement) {
        shippingElement.textContent =
            `₹${shipping}`;
    }

    if (totalElement) {
        totalElement.textContent =
            `₹${total}`;
    }
}
displayCart();
function increaseQuantity(productId) {

    const product = cart.find(
        item => item.id === productId
    );

    if (product) {
        product.quantity++;
    }

    saveCart();
    displayCart();
}


function decreaseQuantity(productId) {

    const product = cart.find(
        item => item.id === productId
    );

    if (product) {

        product.quantity--;

        if (product.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
    }

    saveCart();
    displayCart();
}


function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();
    displayCart();
}
displayCheckout();
function placeOrder(event) {

    event.preventDefault();

    
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    
    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!currentUser) {
        alert("Please login before placing an order.");
        window.location.href = "login.html";
        return;
    }

    
    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const city =
        document.getElementById("city").value.trim();

    const pincode =
        document.getElementById("pincode").value.trim();

    
    const paymentElement =
        document.querySelector(
            'input[name="payment"]:checked'
        );

    if (!paymentElement) {
        alert("Please select a payment method.");
        return;
    }

    const payment = paymentElement.value;

    
    let subtotal = 0;

    cart.forEach(product => {

        subtotal +=
            product.price * product.quantity;

    });

    
    let shipping = 0;

    if (subtotal > 0 && subtotal < 1000) {
        shipping = 100;
    }

    
    const total =
        subtotal + shipping;

    
    const order = {

        orderId:
            "ORD" + Date.now(),

        userId:
            currentUser.id,

        customer: {

            name: name,
            email: email,
            phone: phone,
            address: address,
            city: city,
            pincode: pincode

        },

        items: cart,

        subtotal: subtotal,

        shipping: shipping,

        total: total,

        paymentMethod: payment,

        orderDate:
            new Date().toLocaleString(),

        status: "Pending"

    };

    
    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];

    
    orders.push(order);

    
    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    
    cart = [];

    localStorage.removeItem("cart");

    
    alert(
        "Order placed successfully! Order ID: "
        + order.orderId
    );

    
    window.location.href =
        "../index.html";
}

function displayOrders() {

    const ordersContainer =
        document.getElementById("orders-container");

    if (!ordersContainer) {
        return;
    }

const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);

if (!currentUser) {
    return;
}

const allOrders =
    JSON.parse(
        localStorage.getItem("orders")
    ) || [];

const orders = allOrders.filter(
    order => order.userId === currentUser.id
);
    ordersContainer.innerHTML = "";

    if (orders.length === 0) {

        ordersContainer.innerHTML = `
            <p>No orders found.</p>
        `;

        return;
    }

    orders.forEach(order => {

        const orderElement =
            document.createElement("div");

        orderElement.className =
            "order-card";

        orderElement.innerHTML = `
            <h3>
                Order ID: ${order.orderId}
            </h3>

            <p>
                Date:
                ${order.orderDate}
            </p>

            <p>
                Status:
                ${order.status}
            </p>

            <h4>Products</h4>

            ${order.items.map(item => `
                <p>
                    ${item.name}
                    × ${item.quantity}
                    — ₹${item.price * item.quantity}
                </p>
            `).join("")}

            <hr>

            <h3>
                Total:
                ₹${order.total}
            </h3>
        `;

        ordersContainer.appendChild(orderElement);
    });
}
displayOrders();
async function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("register-name").value.trim();

    const email =
        document.getElementById("register-email").value.trim();

    const password =
        document.getElementById("register-password").value;

    const confirmPassword =
        document.getElementById("register-confirm-password").value;


    // Check passwords

    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    // Send data to backend

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            alert(data.message);

            return;
        }


        alert("Registration successful!");

        window.location.href = "login.html";


    } catch (error) {

        console.error(error);

        alert(
            "Unable to connect to the server."
        );

    }

}
function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (!user) {
        alert("Invalid email or password.");
        return;
    }

    const loggedInUser = {
        id: user.id,
        name: user.name,
        email: user.email
    };

    localStorage.setItem(
        "currentUser",
        JSON.stringify(loggedInUser)
    );

    alert("Login successful!");

    window.location.href = "../index.html";
}
function updateNavbar() {

    const navLinks = document.getElementById("nav-links");

    if (!navLinks) return;

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    const isPagesFolder =
        window.location.pathname.includes("/pages/");

    const homeLink = isPagesFolder
        ? "../index.html"
        : "index.html";

    const productLink = isPagesFolder
        ? "product.html"
        : "pages/product.html";

    const cartLink = isPagesFolder
        ? "cart.html"
        : "pages/cart.html";

    const ordersLink = isPagesFolder
        ? "orders.html"
        : "pages/orders.html";

    const loginLink = isPagesFolder
        ? "login.html"
        : "pages/login.html";

    const registerLink = isPagesFolder
        ? "register.html"
        : "pages/register.html";

    const categoriesLink = isPagesFolder
        ? "../index.html#categories"
        : "#categories";


    if (currentUser) {

        navLinks.innerHTML = `
            <li><a href="${homeLink}">Home</a></li>

            <li><a href="${productLink}">Products</a></li>

            <li><a href="${categoriesLink}">Categories</a></li>

            <li><a href="${cartLink}">Cart</a></li>

            <li><a href="${ordersLink}">My Orders</a></li>

            <li>Welcome, ${currentUser.name}</li>

            <li>
                <a href="#" onclick="logoutUser(event)">Logout</a>
            </li>
        `;

    } else {

        navLinks.innerHTML = `
            <li><a href="${homeLink}">Home</a></li>

            <li><a href="${productLink}">Products</a></li>

            <li><a href="${categoriesLink}">Categories</a></li>

            <li><a href="${cartLink}">Cart</a></li>

            <li><a href="${ordersLink}">My Orders</a></li>

            <li><a href="${loginLink}">Login</a></li>

            <li><a href="${registerLink}">Register</a></li>
        `;
    }
}
function logoutUser(event) {

    if (event) {
        event.preventDefault();
    }

    localStorage.removeItem("currentUser");

    alert("You have been logged out.");

    if (window.location.pathname.includes("/pages/")) {
        window.location.href = "../index.html";
    } else {
        window.location.href = "index.html";
    }
}
updateNavbar();
function protectOrdersPage() {

    const ordersContainer =
        document.getElementById("orders-container");

    if (!ordersContainer) return;

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!currentUser) {

        alert("Please login to view your orders.");

        window.location.href = "login.html";
    }
}
protectOrdersPage();
function displayProductDetails() {

    const productName =
        document.getElementById("product-name");

    if (!productName) {
        return;
    }

    const urlParams =
        new URLSearchParams(window.location.search);

    const productId =
        Number(urlParams.get("id"));

    const product =
        products.find(
            product => product.id === productId
        );

    if (!product) {

        productName.textContent =
            "Product not found";

        return;
    }

    document.getElementById("product-category")
        .textContent = product.category;

    document.getElementById("product-name")
        .textContent = product.name;

    document.getElementById("product-price")
        .textContent = "₹" + product.price;

    document.getElementById("product-description")
        .textContent = product.description;

    document.getElementById("product-info-text")
        .textContent = product.info;

}
displayProductDetails();
function addProductFromDetails() {

    const urlParams =
        new URLSearchParams(window.location.search);

    const productId =
        Number(urlParams.get("id"));

    const quantity =
        Number(
            document.getElementById("quantity").value
        );

    if (quantity < 1) {

        alert("Quantity must be at least 1.");

        return;
    }

    const product =
        products.find(
            product => product.id === productId
        );

    if (!product) {

        alert("Product not found.");

        return;
    }

    for (let i = 0; i < quantity; i++) {

        addToCart(product.id);

    }

    alert(
        product.name +
        " added to cart!"
    );

}