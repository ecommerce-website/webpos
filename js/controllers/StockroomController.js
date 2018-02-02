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

    
});