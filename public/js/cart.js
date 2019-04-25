'use strict';

(function () {
  var cart = document.getElementsByClassName('js-manage-cart');
  Array.from(cart).forEach(function (element) {
    element.addEventListener('click', function (e) {
      var prodId = e.target.getAttribute("data-prod-id");
      if (e.target.classList.contains('js-plus')) {
        var cartCount = document.getElementById("js-cart-count-header").textContent;
        ++cartCount;
        addCartProduct(prodId);
        var prodPrice = +document.getElementById('js-prod-price_' + prodId).textContent;
        var prodQty = +document.getElementById('js-cart-prod-qnty_' + prodId).textContent + 1;
        document.getElementById('js-cart-prod-qnty_' + prodId).textContent = prodQty;
        document.getElementById('js-prod-total_' + prodId).textContent = prodPrice * prodQty;
        var cartTotal = +document.getElementById('js-cart-amt').textContent;
        document.getElementById('js-cart-amt').textContent = cartTotal + prodPrice;
        document.getElementById("js-cart-count-header").textContent = cartCount;
      } else if (e.target.classList.contains('js-minus')) {
        var cartCount = document.getElementById("js-cart-count-header").textContent;
        --cartCount;

        var prodPrice = +document.getElementById('js-prod-price_' + prodId).textContent;
        var prodQty = +document.getElementById('js-cart-prod-qnty_' + prodId).textContent;
        var removeTag = false;
        if (prodQty == 1) {
          removeTag = true;
        }
        --prodQty;
        document.getElementById('js-cart-prod-qnty_' + prodId).textContent = prodQty;
        document.getElementById('js-prod-total_' + prodId).textContent = prodPrice * prodQty;

        var cartTotal = +document.getElementById('js-cart-amt').textContent;
        document.getElementById('js-cart-amt').textContent = cartTotal - prodPrice;
        if (removeTag) {
          document.getElementById("prod_" + prodId).remove();
        }
        document.getElementById("js-cart-count-header").textContent = cartCount;
        subCartProduct(prodId);
      } else {
        ++cartCount;
        addCartProduct(prodId);
      }
    });
  });

  var cartTotal = getData('/api/cartCount').then(function (res) {
    return setCartData(res.cartCount);
  });
})();

function addCartProduct(prodId) {
  postData('/api/addToCart', { prodId: prodId }).then(function (data) {
    setCartData(data.cartCount);
  }).catch(function (error) {
    return console.error(error);
  });
}

function subCartProduct(prodId) {
  postData('/api/subToCart', { prodId: prodId }).then(function (data) {
    setCartData(data.cartCount);
  }).catch(function (error) {
    return console.error(error);
  });
}

function postData() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // Default options are marked with *
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.json();
  });
}

function getData() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  // Default options are marked with *
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (response) {
    return response.json();
  });
}
function setCartData() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var cartItemChange = document.getElementsByClassName('js-cartCount');
  Array.from(cartItemChange).forEach(function (el) {
    el.innerHTML = count;
  });
}