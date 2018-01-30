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

    $scope.list_product = Product.listProduct;
    $log.info($scope.pro_quantity);
    $scope.addNewPro = function(){
        var pro = Product.productInit();
        pro["product_type"] = $scope.pro_type;
        pro["product_stock"] = $scope.pro_stock;
        
    };

    $scope.openPopup = function(product_id){
        $scope.productPopUp = Invoice.getProduct(product_id);  
    };
    products = [{
        product_id: "001",
        product_type: "Regular Product",
        product_active: "true",
        product_stock: "123",
        product_name: "Product",
        product_cost: "10000",
        product_retail_price: "10000",
        product_description: "abc abc",
        product_img: "img.png",
        product_max_quantity: "100",
        product_min_quantity: "0",
        product_unit_string: "10000",
        product_unit_quantity: "50",
        product_tag: "ok",
    },
    {
        product_id: "002",
        product_type: "Regular Product 1",
        product_active: "true",
        product_stock: "123",
        product_name: "Product",
        product_cost: "10000",
        product_retail_price: "10000",
        product_description: "abc abc",
        product_img: "img.png",
        product_max_quantity: "100",
        product_min_quantity: "0",
        product_unit_string: "10000",
        product_unit_quantity: "50",
        product_tag: "ok2",

    }
    ];

});