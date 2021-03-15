try {
  if (window.Shopify && window.Shopify.checkout && window.Shopify.checkout.order_id && window.Shopify.checkout.line_items) {
    SearchlySendOrderStatistic(window.Shopify.checkout, window.Shopify.checkout.line_items);
  }

  function SearchlySendOrderStatistic(checkout, lineItems, e) {
    var orderId = checkout.order_id ? checkout.order_id : 0;
    checkout = checkout.presentment_currency ? checkout.presentment_currency : checkout.currency ? checkout.currency : '';

    var g = null; //Commerceinstruments.GetLocalStorage('aikon-shopify-cart-currency'); // TODO get real value
    var h = {
      external_order_id: orderId,
      currency: checkout,
      viewer_id: -1, //TODO get real value
      customer_id: -1, //TODO get real value
      order_items: []
    };

    var storedClickedProducts = SearchlyGetLocalStorage('searchlyOrderAnalytics') || [];
    var shop = storedClickedProducts.length > 0 ? storedClickedProducts[0].tid : null;

    for (var N = 0; N < lineItems.length; N++) {
      var isProductClicked = SearchlyIsProductClicked(lineItems[N].product_id, storedClickedProducts),
        recommendationData = false; //TODO get real value
      if (isProductClicked || recommendationData) {
        var l = lineItems[N].currency ? lineItems[N].currency : checkout,
          n = lineItems[N].price,
          m = lineItems[N].price;
        //g && g.hasOwnProperty(l) && (m = (m / g[l].rate).toFixed(2)); //TODO get real value
        h.order_items.push({
          product_id: lineItems[N].product_id,
          variant_id: lineItems[N].variant_id,
          price: SearchlyFormatMoney(m),
          original_price: SearchlyFormatMoney(n),
          quantity: lineItems[N].quantity,
          currency: l,
          add_also_bought: isProductClicked,
          add_ra_revenue: !1 !== recommendationData,
          widget_key: !1 !== recommendationData ? recommendationData.widget_key : ''
        });
      }
    }

    if (0 === h.order_items.length) {
      SearchlySetLocalStorage('searchlyOrderAnalytics', []);
    } else {
      var xhr = new XMLHttpRequest();
      var url = 'https://fmmj9lgg7i.execute-api.us-west-1.amazonaws.com/prod';
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          SearchlySetLocalStorage('searchlyOrderAnalytics', []);
        }
      };
      var data = JSON.stringify({
        api_key: shop,
        order_data: h
      });
      xhr.send(data);
      /*jQuery.ajax({
        url: 'https://fmmj9lgg7i.execute-api.us-west-1.amazonaws.com/prod',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
          api_key: shop,
          order_data: h
        }),
        complete: function() {
          SearchlySetLocalStorage('searchlyOrderAnalytics', []);
        }
      });*/
    }
  }

  function SearchlyIsProductClicked(productId, storedClickedProducts) {
    var result = false;
    for (var e = 0; e < storedClickedProducts.length; e++)
      if (productId.toString() === storedClickedProducts[e].pid) {
        result = true;
        break;
      }
    return result;
  }

  function SearchlyGetLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  function SearchlyFormatMoney(price) {
    'string' == typeof price && (price = price.replace('.', ''));
    if (isNaN(price) || null == price) return 0;
    price = (price / 100).toFixed(2);
    price = price.split('.');
    var b = price[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    price = price[1] ? '.' + price[1] : '';
    return b + price;
  }

  function SearchlySetLocalStorage(a, b) {
    localStorage.setItem(a, JSON.stringify(b));
  }
} catch (e) {
  console.log(e);
}
