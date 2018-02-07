angular.module('WebposApp').controller('ProductController', function($rootScope, $scope, $http, $timeout, $log, Product, CallApi, BuildUrl) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();

        $log.info(Product); 
        $scope.products = Product.listProduct;

    });


    CallApi.callRestApiGet('products').then(function(data){
        $scope.products = data.data.data;
        $scope.panigation = data.data;
        console.log(data.data);
        data.data.data.forEach(function(product) {
            Product.addProduct(product);
            Product.setProductSelect(product);
        });

        $scope.products = Product.listProduct;
    });

    $scope.openPopup = function(product_id){
        var url = 'invoices/show/' + invoice_id;
        CallApi.callRestApiGet(url).then(function(data){
            $scope.inv = data.data;
            console.log($scope.inv);
            $scope.invoiceListProduct = data.data.invoice_products;
            console.log($scope.invoiceListProduct);
        });
    };

    $scope.changePage = function(url){
        CallApi.callApiGet(url).then(function(data){
            $scope.products = data.data.data;
            $scope.panigation = data.data;
        });
    }

    $scope.addProduct = function(){
        var product= {
                product: {
                    product_stock_number : $scope.product_stock_number,
                    product_name : $scope.product_name,
                    product_retail_price: $scope.product_retail_price,
                    product_cost: $scope.product_cost,
                    product_description: $scope.product_description,
                    product_min_quantity: $scope.product_min_quantity,
                    product_max_quantity: $scope.product_max_quantity,
                    product_tags: $scope.product_tags
                }
            };
        console.log(product);
        CallApi.callRestApiPost('products/store',product).then(function(data){
            alert('done');
        });
    } 
});