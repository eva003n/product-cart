
import { addToCart} from './data/cart.js'
import { formatCurrency, convertToCents } from "./utils/money.js";
import { renderPaymentSummary } from './payment-summary.js';

async function getProducts(func) {
    const requestUrl = '../../data.json';
    const request = new Request(requestUrl);

    const response = await fetch(request);
      const products = await response.json();
    func(products);   
}
export function loadProducts() {
    getProducts(renderProducts);
}
loadProducts();


function renderProducts(products) { 
    let productSummary = '';
    products.forEach((product) => {
        product.price = convertToCents(product.price)
        productSummary +=
        `
        <div class="products__product" >
            <div class="product__image">
              <picture>
                <source
                  media="(min-width: 960px)"
                  srcset="${product.image.desktop}"
                />
                <source
                  media="(min-width: 600px)"
                  srcset="${product.image.tablet}"
                />
                <img
                  src="${product.image.mobile}"
                  alt="Waffle with berries"
                />
              </picture>
            </div>
            <div class="product__details">
              <button class="add-to-cart button js-add_to-cart" data-product-name="${product.name}">
                <img src="assets/images/icon-add-to-cart.svg" alt="cart icon" />
                Add to cart
              </button>
              <button class="update_quantity  button sr-only js-update-quantity-${product.name}">

              
                <img src="assets/images/icon-decrement-quantity.svg" alt="dexrease cart quantity icon">
                <span class="quantiiy">1</span>
                
                <img src="assets/images/icon-increment-quantity.svg" alt="increase cart quantity icon" />

                
              </button>
              <p class="product-name">${product.name}</p>
              <p class="product-description">${product.category}</p>
              <p class="product-price">&dollar;${formatCurrency(product.price)}</p>
            </div>
          </div>
        
        
        `

    });
    document.querySelector('.js-product-summary').innerHTML = productSummary;
    document.querySelectorAll('.add-to-cart').forEach((addToCartButton) => {
   
      addToCartButton.addEventListener('click', () => {
      const {productName } = addToCartButton.dataset;
      console.log(productName);
   
     console.log(document.querySelector(`.js-update-quantity-${productName}`));
    addToCart(products, productName);
    renderPaymentSummary();
  
    
      
      
      });
  });
  


 
       
        

}



