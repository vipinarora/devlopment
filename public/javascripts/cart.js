var cart = document.getElementsByClassName('js-manage-cart');
Array.from(cart).forEach(function(element) {
  element.addEventListener('click', function(e){
    var prodId = e.target.getAttribute("data-prod-id");
      if(e.target.classList.contains('js-plus'))
       {
         var cartCount = document.getElementById("js-cart-count-header").textContent;    
         ++cartCount;
          addCartProduct(prodId);        
          var prodPrice = +document.getElementById('js-prod-price_'+prodId).textContent;
          var prodQty = +document.getElementById('js-cart-prod-qnty_'+prodId).textContent + 1;
          document.getElementById('js-cart-prod-qnty_'+prodId).textContent = prodQty;
          document.getElementById('js-prod-total_'+prodId).textContent = prodPrice * prodQty;
          var cartTotal = +document.getElementById('js-cart-amt').textContent;          
          document.getElementById('js-cart-amt').textContent = cartTotal + prodPrice; 
          document.getElementById("js-cart-count-header").textContent = cartCount;
       }
       else if(e.target.classList.contains('js-minus'))
       {
        var cartCount = document.getElementById("js-cart-count-header").textContent;            
         --cartCount;
        debugger
        var prodPrice = +document.getElementById('js-prod-price_'+prodId).textContent;
        var prodQty = +document.getElementById('js-cart-prod-qnty_'+prodId).textContent;
        var removeTag = false;
        if(prodQty == 1){
          removeTag = true;
        }
        --prodQty;
        document.getElementById('js-cart-prod-qnty_'+prodId).textContent = prodQty;
        document.getElementById('js-prod-total_'+prodId).textContent = prodPrice * prodQty;
        var cartTotal = +document.getElementById('js-cart-amt').textContent;
        document.getElementById('js-cart-amt').textContent = cartTotal - prodPrice;
        if(removeTag) {
          document.getElementById("prod_"+prodId).remove();
        }
        document.getElementById("js-cart-count-header").textContent = cartCount;
        subCartProduct(prodId);
       }
       else
       {
         ++cartCount;
         addCartProduct(prodId);
       }
      
    });
});

function addCartProduct(prodId)
{
  postData(`/api/addToCart`, {prodId})
    .then(data => {
      setCartData(data.cartCount);
    }) 
    .catch(error => console.error(error));
}

function subCartProduct(prodId)
{
  postData(`/api/subToCart`, {prodId})
    .then(data => {
      setCartData(data.cartCount);
    }) 
    .catch(error => console.error(error));
}


function postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json());
}

function getData(url = ``) {
  // Default options are marked with *
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(response => response.json());
}
function setCartData(count=0)
{
  var cartItemChange = document.getElementsByClassName('js-cartCount');
    Array.from(cartItemChange).forEach(function(el) {
      el.innerHTML = count;
    });
}
const cartTotal = getData('/api/cartCount').then(res => setCartData(res.cartCount));