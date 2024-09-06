import { cart, addToCart, updateCartQuantity } from "./data/cart.js";
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
      console.log(err.message);
    });
}

export function loadProducts() {
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
              <button class="add-to-cart button js-add-to-cart added-${product.category.slice(
                0,
                3
              )} " data-product-name="${
      product.name
    }" data-product-category="${product.category.slice(0, 3)}">
                <img src="assets/images/icon-add-to-cart.svg" alt="cart icon" />
                Add to cart
              </button>
              <button class="update_quantity  button js-update-quantity " data-product-name="${
                product.name
              }">

              
                <img src="assets/images/icon-decrement-quantity.svg" alt="dexrease cart quantity icon" class="js-increase-quantity">
                <span class="quantiiy js-product-quantity-${product.category.slice(
                  0,
                  3
                )}"></span>
                
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
      const { productName, productCategory } = addToCartButton.dataset;

    

      document.querySelector(`.added-${productCategory.slice(0, 3)}`).classList.add("product-added");

      addToCart(
        products,
        productName
      ); /*identify which product to add via name */
      document.querySelector(
        `.js-product-quantity-${productCategory.slice(0, 3)}`
      ).innerHTML = getProductQuantity(productName);

      renderPaymentSummary(); /*reload the cart and payment summary */
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
  return productQuantity;
}
