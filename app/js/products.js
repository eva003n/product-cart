import { addToCart, cart } from "./data/cart.js";
import { formatCurrency, convertToCents } from "./utils/money.js";
import { renderPaymentSummary } from "./payment-summary.js";


 /*async function getProducts(func) {
  const requestUrl = "http://127.0.0.1:5501/data.json";
  
  try {
    const request = new Request(requestUrl);
  

  const response = await fetch(request);
  console.log(response.status);
  if(!response.ok) {
    throw new Error(`${response.status} (Not Found)`);
  }
  const products = await response.json();
  func(products);

  } catch(err) {
    console.warn(err.message);

  }
  
}*/

function getProducts(func) {
  const requestUrl = "http://127.0.0.1:5501/data.json";
fetch( requestUrl)
.then((response) => {
  if(!response.ok) { //error checking
  throw new Error((`${response.status} (Not Found)`));
  }
  return response.json();
  })
.then((data) => {
  func(data);
  })
.catch((err) => { //errro handling
  console.log(err.message);
  });
}




 export function loadProducts () {
  getProducts(renderProducts);
}




function renderProducts(products) {
  let productSummary = "";
  products.forEach((product) => {
    product.price = convertToCents(product.price);
    productSummary += `
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
              <button class="add-to-cart button js-add-to-cart added-to-cart-${product.name}" data-product-name="${
                product.name
              }">
                <img src="assets/images/icon-add-to-cart.svg" alt="cart icon" />
                Add to cart
              </button>
              <button class="update_quantity  button js-update-quantity " data-product-name="${
                product.name
              }">

              
                <img src="assets/images/icon-decrement-quantity.svg" alt="dexrease cart quantity icon" class="js-increase-quantity">
                <span class="quantiiy js-product-quantity"></span>
                
                <img src="assets/images/icon-increment-quantity.svg" alt="increase cart quantity icon" />

                
              </button>
              <p class="product-name">${product.name}</p>
              <p class="product-description">${product.category}</p>
              <p class="product-price">&dollar;${formatCurrency(
                product.price
              )}</p>
            </div>
          </div>
        `;
  });

  document.querySelector(".js-product-summary").innerHTML = productSummary;
  
  document.querySelectorAll(".js-add-to-cart").forEach((addToCartButton) => {
    addToCartButton.addEventListener("click", () => {
      const {productName} = addToCartButton.dataset
      
      addToCartButton.classList.add('product-added');
      
  

      addToCart(products, productName);/*identify which product to add via name */
   
    
       renderPaymentSummary();/*reload the cart and payment summary */
    });
  });
}



