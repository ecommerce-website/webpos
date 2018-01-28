angular.module('WebposApp').controller('StockroomController', function($rootScope, $scope, $http, $timeout, $log, Product, CallApi, BuildUrl) {

  $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();

        products.forEach(function(product) {
            Product.addProduct(product);
            Product.setProductSelect(product);
        });

        $log.info(Product);
        // $log.info(CallApi.callApiGet("https://api.themoviedb.org/3/movie/popular?api_key=931e54c126cfca6e31b0c905d36d6614&language=en-US&page=1"));
    });

    $scope.product = Product.initProduct();

    products = [{
            id: "001",
            type: "Regular Product",
            active: "true",
            stock: "123",
            name: "Product",
            cost: "10000",
            retail_price: "10000",
            description: "abc abc",
            img: "img.png",
            max_quantity: "100",
            min_quantity: "0",
            unit_string: "10000",
            unit_quantity: "50",
        },
        {
            id: "002",
            type: "Regular Product",
            active: "true",
            stock: "123",
            name: "Product 2",
            cost: "10000",
            retail_price: "10000",
            description: "abc abc 2",
            img: "img.png",
            max_quantity: "100",
            min_quantity: "0",
            unit_string: "10000",
            unit_quantity: "50",
        },
    ];

});