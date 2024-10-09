class Cart  {
     cart;
     constructor(cartItem) {
        this.cart = cartItem;
     }

     saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

     addToCart(products, productName) {
        let matchingProduct ;
        products.forEach((product) => {
            if(product.name === productName) {
                matchingProduct = product;
            }
        });
        let matchingCartItem;
        this.cart.forEach((cartItem) => {                         /*avoid adding two products with same name to cart */
            if(cartItem.productName === productName) {
            matchingCartItem = cartItem;
            }
        })
        if(matchingCartItem) {
            matchingCartItem.quantity += 1;                 /*instead increase the quantity */
        }else {
             this.cart.push(
                 {
                  productName,
                  priceCents: matchingProduct.price,         /*adding a new product */
                  quantity: 1,
                  productId:matchingProduct.id
    
          
                 }
               ); 
         }     
         
    this.saveToStorage();                                           /*save to local storage */
    }
     updateCartQuantity() {
        let cartQuantity = 0;
        this.cart.forEach((cartItem) => {
            cartQuantity += 1;
    
        });
        
        return cartQuantity;
    }

     removeFromCart(productName) {
        const newCart = [];
        this.cart.forEach((cartItem) => {
            if(cartItem.productName !== productName) {
                newCart.push(cartItem);
    
            }
    
        });
        this.cart = newCart;
        this.saveToStorage();
    }
    
     increaseProductQuantity(productName) {
        let matchingCartItem;
        this.cart.forEach((cartItem) => {
            if(cartItem.productName === productName) {
            matchingCartItem = cartItem;
            }
        });
        if(matchingCartItem) {
            matchingCartItem.quantity += 1;
        }
    
    }
     decreaseProductQuantity(productName) {
        let matchingCartItem;
        this.cart.forEach((cartItem) => {
            if(cartItem.productName === productName) {
            matchingCartItem = cartItem;
            }
        });
        if(matchingCartItem.quantity > 1) {
            matchingCartItem.quantity -= 1;
        }
    
    }


}
export const productCart = new Cart(JSON.parse(localStorage.getItem('cart')) || []);
