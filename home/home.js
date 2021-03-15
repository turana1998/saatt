  // This allows to expose several variables to the global scope, to be used in scripts
  window.theme = {
    template: "index",
    localeRootUrl: '',
    shopCurrency: "GBP",
    moneyFormat: "£{{amount}}",
    moneyWithCurrencyFormat: "£{{amount}} GBP",
    useNativeMultiCurrency: false,
    currencyConversionEnabled: true,
    currencyConversionMoneyFormat: "money_format",
    currencyConversionRoundAmounts: true,
    productImageSize: "natural",
    searchMode: "product,article",
    showPageTransition: true,
    showElementStaggering: false,
    showImageZooming: false
  };

  window.languages = {
    cartAddNote: "Add Order Note",
    cartEditNote: "Edit Order Note",
    productImageLoadingError: "This image could not be loaded. Please try to reload the page.",
    productFormAddToCart: "Add to cart",
    productFormUnavailable: "Unavailable",
    productFormSoldOut: "Sold Out",
    shippingEstimatorOneResult: "1 option available:",
    shippingEstimatorMoreResults: "{{count}} options available:",
    shippingEstimatorNoResults: "No shipping could be found"
  };

  window.lazySizesConfig = {
    loadHidden: false,
    hFac: 0.5,
    expFactor: 2,
    ricTimeout: 150,
    lazyClass: 'Image--lazyLoad',
    loadingClass: 'Image--lazyLoading',
    loadedClass: 'Image--lazyLoaded'
  };

  document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
  document.documentElement.style.setProperty('--window-height', window.innerHeight + 'px');

  // We do a quick detection of some features (we could use Modernizr but for so little...)
  (function () {
    document.documentElement.className += ((window.CSS && window.CSS.supports(
      '(position: sticky) or (position: -webkit-sticky)')) ? ' supports-sticky' : ' no-supports-sticky');
    document.documentElement.className += (window.matchMedia('(-moz-touch-enabled: 1), (hover: none)')).matches ?
      ' no-supports-hover' : ' supports-hover';
  }());

  // This code is done to force reload the page when the back button is hit (which allows to fix stale data on cart, for instance)
  (function () {
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
  })();

