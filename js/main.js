/* Webpos App */
var WebposApp = angular.module("WebposApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize"
]);
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
            data: { pageTitle: 'Stock Room' },
            controller: "StockroomController",
            resolve: {  
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'WebposApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'css/product.css',
                            'assets/pages/scripts/table-datatables-managed.min.js',
                            'assets/global/plugins/icheck/icheck.min.js',
                            'assets/pages/scripts/form-icheck.min.js',
                            'js/product.js',
                            'js/print.js',
                            'js/services/Product.js',
                            'js/services/BuildUrl.js',
                            'js/services/CallApi.js',
                            'js/controllers/StockroomController.js',
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