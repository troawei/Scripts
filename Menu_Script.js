import {cart, saveToStorage, updateTotalPrice} from './cart-checkout.js';
import {products} from './Products_Container.js';

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
    <div class = "item-container1">
        <img src="${product.img}">
        <div class="item-name">
            ${product.itemName}
            <div class="item-desc">
                ${product.itemDesc}
            </div>
        </div>
        <button class="order-button script-add-to-cart" data-product-name="${product.itemName}">
        Add to Cart
        </button>
    </div>
    `;
});

document.querySelector('.productsScripts').innerHTML = productsHTML;

document.querySelectorAll('.script-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        if (cart.length >= 10) {
            alert('Cart is full, you cannot enter more items');
            return;
        }
        const productName = button.dataset.productName;
        let itemMatch;

        cart.forEach((cartItem) => {
            if (productName === cartItem.productName) {
                itemMatch = cartItem;
            }
        });
    
        if (itemMatch) {
            itemMatch.quantity = 1;
        } else {
            cart.push({
                productName: productName,
                quantity: 1
            });
        }
        saveToStorage();
        updateTotalPrice();
    });
});