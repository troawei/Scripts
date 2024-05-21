import {products, drinkProducts} from './Products_Container.js';

let cartHTML = '';
let totalPrice = 0;

const allProducts = [...products, ...drinkProducts];

export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
        productName: 'Pastillas',
        quantity: 1
    }];
}

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateTotalPrice() {
    const totalPriceElement = document.getElementById('totalPrice');
    const totalPriceElement1 = document.getElementById('totalPrice1');
    totalPrice = 0;
    cart.forEach(cartItem => {
        const matchedProduct = allProducts.find(product => product.itemName === cartItem.productName);
        if (matchedProduct) {
            totalPrice += matchedProduct.itemPrice * cartItem.quantity;
        }
    });
    if (totalPriceElement) {
        totalPriceElement.textContent = `₱${totalPrice.toFixed(2)}`;
        totalPriceElement1.textContent = `₱${totalPrice.toFixed(2)}`;
    }
}

function renderCart() {
    const container = document.querySelector('.script-container-2');
    if (!container) {
        return;
    }

    cartHTML = '';

    cart.forEach((cartItem) => {
        const matchedProduct = allProducts.find(product => product.itemName === cartItem.productName);

        if (matchedProduct) {
            cartHTML += `
                <div class="item-container js-cart-item-container-${matchedProduct.itemName}">
                    <div>
                        <img class="img" src="${matchedProduct.img}">
                    </div>
                    <div class="item-name" id="itemName">
                        ${matchedProduct.itemName}
                    </div>
                    <div>
                        <button class="increasebutton buttonStyle" data-item-name="${matchedProduct.itemName}">+</button>
                        <label class="countlabel labelStyle">${cartItem.quantity}</label>
                        <button class="decreasebutton" data-item-name="${matchedProduct.itemName}">-</button>
                    </div>
                    <div>
                        <label class="countprice">₱${(matchedProduct.itemPrice * cartItem.quantity).toFixed(2)}</label>
                    </div>
                    <div>
                        <button class="removeButton scriptButtonRemove buttonStyle" data-item-name="${matchedProduct.itemName}">Remove</button>
                    </div>
                </div>
            `;
        }
    });

    container.innerHTML = cartHTML;
    updateTotalPrice()

    document.querySelectorAll('.increasebutton').forEach((increase) => {
        increase.addEventListener('click', () => {
            const itemName = increase.dataset.itemName;
            const cartItem = cart.find(item => item.productName === itemName);
            const matchedProduct = allProducts.find(product => product.itemName === itemName);

            if (cartItem && matchedProduct) {
                cartItem.quantity++;
                saveToStorage();
                updateCartItemDisplay(increase, cartItem, matchedProduct);
                updateTotalPrice()
            }
        });
    });

    document.querySelectorAll('.decreasebutton').forEach((decrease) => {
        decrease.addEventListener('click', () => {
            const itemName = decrease.dataset.itemName;
            const cartItem = cart.find(item => item.productName === itemName);
            const matchedProduct = allProducts.find(product => product.itemName === itemName);

            if (cartItem && matchedProduct && cartItem.quantity > 1) {
                cartItem.quantity--;
                saveToStorage();
                updateCartItemDisplay(decrease, cartItem, matchedProduct);
                updateTotalPrice()
                console.log(totalPrice);
            }
        });
    });

    document.querySelectorAll('.scriptButtonRemove').forEach((remove) => {
        remove.addEventListener('click', () => {
            const itemName = remove.dataset.itemName;
            removeItemFromCart(itemName);
            updateTotalPrice()
            console.log(totalPrice);
        });
    });
}

function updateCartItemDisplay(button, cartItem, matchedProduct) {
    const itemContainer = button.closest('.item-container');
    if (itemContainer) {
        const countLabel = itemContainer.querySelector('.countlabel');
        const countPrice = itemContainer.querySelector('.countprice');

        if (countLabel) {
            countLabel.textContent = cartItem.quantity;
        }

        if (countPrice) {
            countPrice.textContent = `₱${(matchedProduct.itemPrice * cartItem.quantity).toFixed(2)}`;
        }
    }
}

function removeItemFromCart(itemName) {
    cart = cart.filter(cartItem => cartItem.productName !== itemName);
    saveToStorage();
    renderCart();
}

renderCart();
updateTotalPrice()