import { cart, updateCartQuantity, removeFromCart } from "./data/cart.js"
import {  formatCurrency } from "./utils/money.js";
import { loadProducts } from "./products.js";
import {checkout} from './order.js';

export function renderPaymentSummary() {
    let cartSummaryHtml = '';
    let totalCostCents = 0;

    cart.forEach((cartItem) => {
        
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
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
                  </button>
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




checkout();/*keep the order checkout updated  */

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
       

  `
  document.querySelector('.js-confirm-button').addEventListener('click', () => {
    const popUp = document.querySelector('.js-popup');
    popUp.classList.add('appear');
    popUp.classList.remove('disappear');
    if(popUp.classList.contains('sr-only')) {
      popUp.classList.remove('sr-only')
    }
    document.querySelector('.js-overlay').classList.add('overlay-appear');
    document.querySelector('.js-overlay').classList.remove('overlay-disappear');
  });

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
       document.querySelector('.js-confirm-button').classList.add('sr-only');
       

  return emptyCartHtml;

} 
}



