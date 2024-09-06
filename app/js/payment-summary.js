import { cart, updateCartQuantity, removeFromCart } from "./data/cart.js"
import {  formatCurrency } from "./utils/money.js";
import { loadProducts } from "./products.js";

export function renderPaymentSummary() {
    let cartSummaryHtml = '';
    let totalCostCents = 0;


    cart.forEach((cartItem) => {
        
        // const priceCents = convertToCents(cartItem.price);
        const totalPerProduct = cartItem.priceCents * cartItem.quantity
         totalCostCents += totalPerProduct ;
         cartSummaryHtml +=
        `
         <div class="cart-product__details flex">
                <div class="left-side">
                  <p class="product-description">${cartItem.productName}</p>
                  <span class="quantity-mutiple">${cartItem.quantity}x</span>
                  <span class="price">@ &dollar;${formatCurrency(cartItem.priceCents)}</span>
                  <span class="product-total">&dollar;${formatCurrency(totalPerProduct)}</span>
                </div>
                <div class="right-side js-remove-cart-item" data-product-name="${cartItem.productName}" > 
                  <img
                    src="assets/images/icon-remove-item.svg"
                    alt="remove item icon"
                  >
                </div>
              </div>
              
        `
         
    });
    cartSummaryHtml = cartSummaryHtml + renderOrderTotal(totalCostCents);

cartSummaryHtml = cart.length !== 0 ? cartSummaryHtml : renderEmptyCart()
document.querySelector('.js-cart-products').innerHTML = cartSummaryHtml; 
 const cartQuantiy = updateCartQuantity();
document.querySelector('.js-cart-quantity').innerHTML = `(${cartQuantiy})`;



document.querySelectorAll(`.js-remove-cart-item`).forEach((removeButton) => {
    removeButton.addEventListener('click', () => {
        const {productName} = removeButton.dataset;
        removeFromCart(productName);
        loadProducts();
        renderPaymentSummary();
    
    
    
    });
    });


    
}
// renderPaymentSummary();

function renderOrderTotal(total) {
    let orderTotalHtml = '';
     orderTotalHtml += 
    `
    <div class="cart-product__details flex">
            <div class="left-side">
              <p>Order Total</p>
            </div>
            <div class="right-side">
              <h3>&dollar;${formatCurrency(total)}</h3>
            </div>
          </div>
          <div class="carbon-neutral">
            <p>
              <img
                src="assets/images/icon-carbon-neutral.svg"
                alt="carbon neutral icon"
              >
              This is a carbon neutral delivery
            </p>
          </div>
          <div class="order-confirmation">
            <button class="confirm-order">Confirm Order</button>
          </div>

    `
// document.querySelector('.js-order-total ').innerHTML = orderTotalHtml;
return orderTotalHtml;
}

function renderEmptyCart() {
    let emptyCartHtml = '';
    
         emptyCartHtml += 
        ` <div class="cart-product">
          <div class="cart-product__details">
            <div class="empty_cart-image">
              <img
                src="assets/images/illustration-empty-cart.svg"
                alt="empty cart icon"
              >
            </div>
            <p class="empty-cart-text">Your added items will appear here</p>
          </div>
        </div>
        `
    
   
    return emptyCartHtml;
}