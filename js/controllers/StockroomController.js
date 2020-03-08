angular.module('WebposApp').controller('StockroomController', function($rootScope, $scope, $http, $timeout, $log, Product, CallApi, BuildUrl) {

    $scope.$on('$viewContentLoaded', function() {    
        Layout.init();
        // $scope.product_stock_number = 1;
    //     // initialize core components
    //     App.initAjax();

    //     products.forEach(function(product) {
    //         Product.addProduct(product);
    //         Product.setProductSelect(product);
    //     });

    //     $log.info(Product);
    //     // $log.info(CallApi.callApiGet("https://api.themoviedb.org/3/movie/popular?api_key=931e54c126cfca6e31b0c905d36d6614&language=en-US&page=1"));
    });
    Layout.init();

    // $scope.list_product = Product.listProduct;
    // $log.info($scope.pro_quantity);
    // $scope.addNewPro = function(){
    //     var pro = Product.productInit();
    //     pro["product_type"] = $scope.pro_type;
    //     pro["product_stock"] = $scope.pro_stock;
        
    // };

    // $scope.openPopup = function(product_id){
    //     $scope.productPopUp = Invoice.getProduct(product_id);  
    // };

});