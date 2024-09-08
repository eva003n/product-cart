import { cart, addToCart, increaseProductQuantity, decreaseProductQuantity} from "./data/cart.js";
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


export function getProducts(func) {
  const requestUrl = "data.json";
  const request = new Request(requestUrl);
  fetch(request)
    .then((response) => {
      if (!response.ok) {
        //error checking
        throw new Error(`${response.status} (Not Found)`);
      }
      return response.json();
    })
    .then((data) => {
      func(data);
    })
    .catch((err) => {
      //errro handling
      console.warn(err.message);
    });
}

export function loadProducts() {
  getProducts(renderProducts);
}

function renderProducts(products) {
  let productSummary = "";

  products.forEach((product) => {
    product.price = convertToCents(product.price);  /*convert money to cents to do math */

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
              <button class="add-to-cart button js-add-to-cart added-${product.category.slice(0, 3)}"         data-product-name="${product.name}" data-product-category="${product.category.slice(0, 3)}">
                <img src="assets/images/icon-add-to-cart.svg" alt="cart icon" >
                Add to cart 
              </button>
              <div class="update_quantity button js-update-quantity js-update-quantity-${product.category.slice(0, 3)} ">
              <button class="js-decrease" data-product-category="${product.category.slice(0, 3)}" data-product-name="${product.name}"><svg class="svg"xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path  d="M0 .375h10v1.25H0V.375Z"/></svg></button>
                <span class="quantiiy js-product-quantity-${(product.category).slice(0, 3)}"></span>
                
                <button class="js-increase "data-product-name="${product.name}" data-product-category="${product.category.slice(0, 3)}"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path  d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg></button>
              </div>
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
      const { productName, productCategory } = addToCartButton.dataset;
      

    

      document.querySelector(`.added-${productCategory.slice(0, 3)}`).classList.add("product-added");
      document.querySelector(`.js-update-quantity-${productCategory.slice(0, 3)}`).classList.add("change-quantity");

      addToCart(
        products,
        productName
      ); /*identify which product to add via name */
      document.querySelector(
        `.js-product-quantity-${productCategory.slice(0, 3)}`
      ).innerHTML = getProductQuantity(productName);
      document.querySelector('.js-confirm-button').classList.remove('sr-only');
      renderPaymentSummary(); /*reload the cart and payment summary */
    });
  });
  document.querySelectorAll('.js-increase ').forEach((plusButton) => {
plusButton.addEventListener('click', () => {
const {productName, productCategory} = plusButton.dataset;
increaseProductQuantity(productName);
document.querySelector(`.js-product-quantity-${productCategory.slice(0, 3)}`).innerHTML = getProductQuantity(productName);
renderPaymentSummary();
});
  });
  document.querySelectorAll('.js-decrease').forEach((Button) => {
Button.addEventListener('click', () => {
  const {productName, productCategory} = Button.dataset;

  decreaseProductQuantity(productName);
document.querySelector(
  `.js-product-quantity-${productCategory.slice(0, 3)}`
).innerHTML = getProductQuantity(productName);
renderPaymentSummary();

});
  });

  document.querySelectorAll('.js-decrease').forEach((minusButton) => {
    minusButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
     console.log('event.key')
     
    }

    });
      });




}

export function getProductQuantity(productName) {
  let productQuantity;
  let matchingCartItem;
  cart.forEach((cartItem) => {
    if (cartItem.productName === productName) {
      matchingCartItem = cartItem;
    }
  });
  productQuantity = matchingCartItem.quantity;
  return productQuantity
}

