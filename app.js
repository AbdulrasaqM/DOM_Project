//To Select Elements
const productsE1 = document.querySelector(".products");
const cartItemsE1 = document.querySelector(".cart-items");
const subtotalE1 = document.querySelector(".subtotal");
const totalItemsInCartE1 = document.querySelector(".total-items-in-cart");

const likeItemE1 = document.querySelector(".total-wishlist");


//TO render Products
function renderProducts() {
    products.forEach((product) => {
        productsE1.innerHTML += `
        <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                        ${product.description}
                        </p>
                    </div>
                    <div class="add-to-wishlist" onclick="addToWishList(${product.id})">
                        <img src="./icons/heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart" onClick="addToCart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
        `;
    });
}
// renderProducts();


//To add items to cart

//      cart array
let cart = [];

function addToCart(id) {
    //check if product exist in cart
    if (cart.some((item) => item.id === id)) {
        alert('product already in cart');
    } else {
        const item = products.find((product) => product.id === id);
        cart.push({ ...item, numberOfUnits: 1, });
    }
    updateCart();
}

// TO Update Cart
function updateCart() {
    renderCartItems();
    renderSubtotal();
    // likeButton();

}

// Calculate and render subtotal
function renderSubtotal() {
    let totalPrice = 0, totalItems = 0;

    cart.forEach(item => {
        totalPrice += (item.price * item.numberOfUnits);
        totalItems += item.numberOfUnits
    });
    subtotalE1.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
    totalItemsInCartE1.innerHTML = totalItems;
}

function renderCartItems() {
    cartItemsE1.innerHTML = ''; // clear cart element
    cart.forEach((item) => {
        cartItemsE1.innerHTML += `
        <div class="cart-item">
            <div class="item-info">
                <img src="${item.imgSrc}" alt="t-shirt 1">
                <div class="item-detail"><h6>${item.name}</h6>
                <button onclick="removeItemFromCart(${item.id})">Remove</button>
                </div>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>
        </div>
        `
    })

}

//  function addToWishList() {
//     document.getElementById("wishList").style.filter = 'invert(30%) sepia(96%) saturate(6575%) hue-rotate(354deg) brightness(89%) contrast(123%)';
// updateCart();
// }


//ADD TO WISHLIST
let like = [];

function addToWishList(id) {
    //check if product exist in wishlist
    if (like.some((item) => item.id === id)) {
        alert('product already in your wishlist');
    } else {
        const item = products.find((product) => product.id === id);
        like.push({ ...item, numberOfLikes: 1, });
    }
    totalWishlist();
}

function totalWishlist() {
    let totalLikes = 0;

    like.forEach(item => {
        totalLikes += item.numberOfLikes
    });

    likeItemE1.innerHTML = totalLikes;
}


//Change number of units
function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;

        if (item.id === id) {
            if (action === 'minus' && numberOfUnits > 1) {
                numberOfUnits--;
            } else if (action === 'plus' && numberOfUnits < item.instock) {
                numberOfUnits++;
            }
        }

        return { ...item, numberOfUnits };
    });

    updateCart();
}

//Remove number of units for an item
function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id !== id)

    updateCart();
}


//Toggle Like Button

//Disable Button

function disable(x) {
    x.disabled = true;
}