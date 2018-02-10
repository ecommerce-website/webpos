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
        CallApi.callRestApiPost('products/store',product).then(function(data){
        });
    }
    $scope.showPro = function(id){
        CallApi.callRestApiGet('products/show/' + id).then(function(data){
            $scope.product_detail = data.data.data[0];
            $scope.barcode = data.data.data[0].product_barcodes;
        });
    }
    $scope.updateProduct = function(id){
            $scope.$watch(function($scope){
               return $scope.edit_product_stock_number;
               return $scope.edit_product_name;
            },function(){
                CallApi.callRestApiGet('products').then(function(data){
                    $scope.products = data.data.data;
                });
            });
            var product= {
                product: {
                    product_stock_number : parseInt($scope.edit_product_stock_number),
                    product_name : $scope.edit_product_name,
                    product_retail_price: parseInt($scope.edit_product_retail_price),
                    product_cost: parseInt($scope.edit_product_cost),
                    product_description: $scope.edit_product_description,
                    product_min_quantity: parseInt($scope.edit_product_min_quantity),
                    product_max_quantity: parseInt($scope.edit_product_max_quantity),
                    product_tags: $scope.edit_product_tags != null ? $scope.edit_product_tags : "",
                }
            };
            CallApi.callRestApiPost('products/edit/'+id,product).then(function(data){

            });
            
    }

    $scope.editPro = function(id){
        CallApi.callRestApiGet('products/show/' + id).then(function(data){
            var result = data.data.data[0];
            $scope.id_product = id;
            $scope.edit_product_stock_number = parseInt(result.product_stock_number);
            $scope.edit_product_name = result.product_name;
            $scope.edit_product_retail_price = result.product_retail_price;
            $scope.edit_product_cost = result.product_cost;
            $scope.edit_product_description = result.product_description;
            $scope.edit_product_min_quantity = result.product_min_quantity;
            $scope.edit_product_max_quantity = result.product_max_quantity;
        });
    }

    $scope.delProduct = function(id){
        var product = {
            product : [id]
        }
        CallApi.callRestApiPost('products/delete',product).then(function(data){

        });

        CallApi.callRestApiGet('products').then(function(data){
            $scope.products = data.data.data;
        });

    }
});