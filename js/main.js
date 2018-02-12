/* Webpos App */
var WebposApp = angular.module("WebposApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    'ui.select'
]);

angular.module('WebposApp').filter('propsFilter', function() {
    return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function(item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});
// Handle global LINK click
WebposApp.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e) {
                    e.preventDefault();
                });
            }
        }
    };
});
WebposApp.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});
WebposApp.filter("formatPrice", function() {
  return function(price, digits, thoSeperator, decSeperator, bdisplayprice) {
    var i;
    digits = (typeof digits === "undefined") ? 2 : digits;
    bdisplayprice = (typeof bdisplayprice === "undefined") ? true : bdisplayprice;
    thoSeperator = (typeof thoSeperator === "undefined") ? "." : thoSeperator;
    decSeperator = (typeof decSeperator === "undefined") ? "," : decSeperator;
    price = "" + price;
    var _temp = price.split(".");
    var dig = (typeof _temp[1] === "undefined") ? "00" : _temp[1];
    if (bdisplayprice && parseInt(dig,10)===0) {
        dig = "-";
    } else {
        dig = dig.toString();
        if (dig.length > digits) {
            dig = (Math.round(parseFloat("0." + dig) * Math.pow(10, digits))).toString();
        }
        for (i = dig.length; i < digits; i++) {
            dig += "0";
        }
    }
    var num = _temp[0];
    var s = "",
        ii = 0;
    for (i = num.length - 1; i > -1; i--) {
        s = ((ii++ % 3 === 2) ? ((i > 0) ? thoSeperator : "") : "") + num.substr(i, 1) + s;
    }
    return s;
}
});
/* Setup Layout Part - Header */
WebposApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
WebposApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
WebposApp.controller('QuickSidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        setTimeout(function() {
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Footer */
WebposApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);



WebposApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard.html");

    $stateProvider
    // Dashboard
        .state('dashboard', {
            url: "/dashboard.html",
            templateUrl: "views/dashboard.html",
            data: { pageTitle: 'Admin Dashboard Webpos' },
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'WebposApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',
                            'assets/global/plugins/jquery.sparkline.min.js',

                            'assets/pages/scripts/dashboard.min.js',
                            'js/controllers/DashboardController.js',
                        ]
                    });
                }]
            }
        })
        .state('webpos', {
            url: "/webpos.html",
            templateUrl: "views/webpos.html",
            data: { pageTitle: 'Webpos' },
            controller: "WebposController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'WebposApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'assets/global/plugins/morris/morris.css',

                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',
                            'assets/global/plugins/jquery.sparkline.min.js',
                            'assets/pages/scripts/dashboard.min.js',
                            'js/print.js',
                            'js/services/Product.js',
                            'js/services/BuildUrl.js',
                            'js/services/CallApi.js',
                            'js/controllers/WebposController.js',
                            'js/store.js',
                        ]
                    });
                }]
            }
        })
        .state('orderlisting', {
            url: "/orderlisting.html",
            templateUrl: "views/orderlisting.html",
            data: { pageTitle: 'Danh sách đơn hàng' }
        })
        .state('checkout', {
            url: "/checkout.html",
            templateUrl: "views/checkout.html",
            data: { pageTitle: 'Checkout' }
        })
        .state('stockroom', {
            url: "/stockroom.html",
            templateUrl: "views/stockroom.html",
            data: { pageTitle: 'StockRoom' },
            controller: "StockroomController",
            resolve:{
                deps: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load({
                        name: 'WebposApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'css/product.css',
                            'assets/global/plugins/morris/morris.css',
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',
                            'assets/global/plugins/jquery.sparkline.min.js',
                            'assets/pages/scripts/dashboard.min.js',
                            'js/print.js',
                            'js/services/Product.js',
                            'js/services/Inventory.js',
                            'js/services/Transaction.js',
                            'js/services/BuildUrl.js',
                            'js/services/CallApi.js',
                            'js/controllers/StockroomController.js',
                            'js/controllers/InventoryController.js',
                            'js/controllers/TransactionController.js',
                            'js/controllers/ProductController.js'
                        ]
                    });
                }]
            }
        })
        .state('office', {
            url: "/office.html",
            templateUrl: "views/office.html",
            data: { pageTitle: 'Danh sách đơn hàng' },
            controller: "OfficeController",
            resolve:{
                deps: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load({
                        name: 'WebposApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'assets/global/plugins/morris/morris.css',
                            'assets/global/plugins/morris/morris.min.js',
                            'assets/global/plugins/morris/raphael-min.js',
                            'assets/global/plugins/jquery.sparkline.min.js',
                            'assets/pages/scripts/dashboard.min.js',
                            'js/services/Invoice.js',
                            'js/services/BuildUrl.js',
                            'js/services/CallApi.js',
                            'js/controllers/OfficeController.js',
                        ]
                    });
                }]
            }
        })
        .state('customer', {
            url: "/customer.html",
            templateUrl: "views/customer.html",
            data: { pageTitle: 'Khách hàng' }
        })
        .state('login', {
            url: "/login.html",
            templateUrl: "views/login.html",
            data: { pageTitle: 'Đăng nhập' }
        })
}]);