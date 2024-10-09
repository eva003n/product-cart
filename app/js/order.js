//imports
import { productCart } from "./data/cartObject.js";
import { getProducts, loadProducts } from "./products.js";
import { formatCurrency } from "./utils/money.js";
import { renderPaymentSummary } from "./payment-summary.js";

export function checkout() {
  getProducts(renderOrderSummary);
}
checkout();

function renderOrderSummary(products) {
  let orderHtml = "";
  let matchingProduct;
  let productTotal = 0;
  let orderTotal = 0;
  let productName;

  if(productCart.cart.length !== 0 ) { 

  productCart.cart.forEach((cartItem) => {
    productName = cartItem.productName;
    products.forEach((product) => {
      if (product.name === productName) {
        matchingProduct = product; /*Normalization */
      }
    });
    productTotal = cartItem.quantity * cartItem.priceCents;
    orderTotal += productTotal;

    orderHtml += `
         <div class="ordered-products__product flex">
          <div class="products-details ordered-flex">
            <div class="product__image">
              <img
                src="${matchingProduct.image.thumbnail}"
                alt="product thumbnail"
                width="45px"
              />
            </div>
            <div class="left-side">
              <p class="product-description">${matchingProduct.name}</p>
              <span class="quantity-mutiple">
              ${cartItem.quantity}x</span>
              <span class="price">@ &dollar;${formatCurrency(
                cartItem.priceCents
              )}</span>
            </div>
          </div>

          <p class="ordered-price">&dollar;${formatCurrency(productTotal)}</p>
        </div>
         
        `;
  });


  orderHtml = orderHtml + totalCost(orderTotal);
  document.querySelector(".js-order-summary").innerHTML = orderHtml;

  function totalCost(orderTotal) {
    let totalCostHtml = `
    <div class="flex">
            <div class="left-side">
              <p>Order Total</p>
            </div>
            <div class="right-side">
              <h3>&dollar;${formatCurrency(orderTotal)}</h3>
            </div>
          </div>
    `;
    return totalCostHtml;
  }
  

}
 

}

function startNewOrder() {
    productCart.cart.splice(0, productCart.cart.length);
    productCart.saveToStorage();

   
  }
  
  document.querySelector('.js-new-order').addEventListener('click', () => {
    document.querySelector('.js-popup').classList.remove('appear');
    document.querySelector('.js-popup').classList.add('disappear');
    document.querySelector('.js-overlay').classList.remove('overlay-appear');
    document.querySelector('.js-overlay').classList.add('overlay-disappear');
  
    startNewOrder();

     renderPaymentSummary();
     loadProducts();
  
  });

