import{cart,addToCart,increaseProductQuantity,decreaseProductQuantity}from"./data/cart.js";import{formatCurrency,convertToCents}from"./utils/money.js";import{renderPaymentSummary}from"./payment-summary.js";export function getProducts(t){const e=new Request("data.json");fetch(e).then((t=>{if(!t.ok)throw new Error(`${t.status} (Not Found)`);return t.json()})).then((e=>{t(e)})).catch((t=>{console.warn(t.message)}))}export function loadProducts(){getProducts(renderProducts)}function renderProducts(t){let e="";t.forEach((t=>{t.price=convertToCents(t.price),e+=`\n        <div class="products__product" >\n            <div class="product__image">\n              <picture>\n                <source\n                  media="(min-width: 960px)"\n                  srcset="${t.image.desktop}"\n                />\n                <source\n                  media="(min-width: 600px)"\n                  srcset="${t.image.tablet}"\n                />\n                <img\n                  src="${t.image.mobile}"\n                  alt="Waffle with berries"\n                />\n                \n              </picture>\n            </div>\n            <div class="product__details">\n              <button class="add-to-cart button js-add-to-cart added-${t.category.slice(0,3)}"         data-product-name="${t.name}" data-product-category="${t.category.slice(0,3)}">\n                <img src="assets/images/icon-add-to-cart.svg" alt="cart icon" >\n                Add to cart \n              </button>\n              <div class="update_quantity button js-update-quantity js-update-quantity-${t.category.slice(0,3)} ">\n              <button class="js-decrease" data-product-category="${t.category.slice(0,3)}" data-product-name="${t.name}"><svg class="svg"xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path  d="M0 .375h10v1.25H0V.375Z"/></svg></button>\n                <span class="quantiiy js-product-quantity-${t.category.slice(0,3)}"></span>\n                \n                <button class="js-increase "data-product-name="${t.name}" data-product-category="${t.category.slice(0,3)}"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path  d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg></button>\n              </div>\n              <p class="product-name">${t.name}</p>\n              <p class="product-description">${t.category}</p>\n              <p class="product-price">&dollar;${formatCurrency(t.price)}</p>\n            </div>\n          </div>\n        `})),document.querySelector(".js-product-summary").innerHTML=e,document.querySelectorAll(".js-add-to-cart").forEach((e=>{e.addEventListener("click",(()=>{const{productName:r,productCategory:a}=e.dataset;document.querySelector(`.added-${a.slice(0,3)}`).classList.add("product-added"),document.querySelector(`.js-update-quantity-${a.slice(0,3)}`).classList.add("change-quantity"),addToCart(t,r),document.querySelector(`.js-product-quantity-${a.slice(0,3)}`).innerHTML=getProductQuantity(r),document.querySelector(".js-confirm-button").classList.remove("sr-only"),renderPaymentSummary()}))})),document.querySelectorAll(".js-increase ").forEach((t=>{t.addEventListener("click",(()=>{const{productName:e,productCategory:r}=t.dataset;increaseProductQuantity(e),document.querySelector(`.js-product-quantity-${r.slice(0,3)}`).innerHTML=getProductQuantity(e),renderPaymentSummary()}))})),document.querySelectorAll(".js-decrease").forEach((t=>{t.addEventListener("click",(()=>{const{productName:e,productCategory:r}=t.dataset;decreaseProductQuantity(e),document.querySelector(`.js-product-quantity-${r.slice(0,3)}`).innerHTML=getProductQuantity(e),renderPaymentSummary()}))})),document.querySelectorAll(".js-decrease").forEach((t=>{t.addEventListener("keydown",(t=>{"Enter"===t.key&&console.log("event.key")}))}))}export function getProductQuantity(t){let e,r;return cart.forEach((e=>{e.productName===t&&(r=e)})),e=r.quantity,e}//# sourceMappingURL=products.js.map
