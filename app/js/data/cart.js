
export let cart = JSON.parse(localStorage.getItem('cart')) ;
if(!cart) {
    cart = [
       /* {
            productName: 'Waffle with Berries',
            priceCents: 650,
            quantity: 1
        },
        {
            productName: 'Vanilla Bean Crème Brûlée',
            priceCents: 700,
            quantity: 2
        }*/
        
    ]

}
/*save to local storage */
export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/*add to cart */
export function addToCart(products, productName) {
    let matchingProduct ;
    products.forEach((product) => {
        if(product.name === productName) {
            matchingProduct = product;

        }


    });
    let matchingCartItem;
    cart.forEach((cartItem) => {
        if(cartItem.productName === productName) {
        matchingCartItem = cartItem;
        }
    })
    if(matchingCartItem) {
        matchingCartItem.quantity += 1;
    }else {
         cart.push(
             {
              productName,
              priceCents: matchingProduct.price,
              quantity: 1
      
             }
      
      
           ); 
           

     }

  
saveToStorage();
   
   
}

export function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += 1;

    });
    
    return cartQuantity;
}
export function removeFromCart(productName) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if(cartItem.productName !== productName) {
            newCart.push(cartItem);

        }

    });
    cart = newCart;
    saveToStorage();
}

export function increaseProductQuantity(productName) {
    let matchingCartItem;
    cart.forEach((cartItem) => {
        if(cartItem.productName === productName) {
        matchingCartItem = cartItem;
        }
    });
    if(matchingCartItem) {
        matchingCartItem.quantity += 1;
    }

}
export function decreaseProductQuantity(productName) {
    let matchingCartItem;
    cart.forEach((cartItem) => {
        if(cartItem.productName === productName) {
        matchingCartItem = cartItem;
        }
    });
    if(matchingCartItem.quantity > 1) {
        matchingCartItem.quantity -= 1;
    }

}


