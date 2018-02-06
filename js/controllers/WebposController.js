angular.module('WebposApp').controller('WebposController', function($rootScope, $scope, $http, $timeout, $log, Product, CallApi, BuildUrl) {

  $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();

        CallApi.callRestApiGet('products').then(function(data){
            $scope.products = data.data.data;
            console.log(data.data.data);
            data.data.data.forEach(function(product) {
                Product.addProduct(product);
                Product.setProductSelect(product);
            });
        });

        $scope.products = Product.listProduct;
    });

    $scope.carts = [];
    $scope.tmp = 0;
    $scope.subTotal = 0;
    $scope.total = 0;
    $scope.tax = 0;
    $scope.amount = 0;
    $scope.change = 0;

    $scope.addProductToCart = function(product) {

        if ($scope.carts.length === 0){
            product['product_count'] = 1;
            $scope.carts.push(product);
        }else{
            var repeat = false;
            for (var i = 0; i < $scope.carts.length; i++) {
                if ($scope.carts[i].product_id === product.product_id) {
                    $scope.carts[i].product_count ++;
                    repeat = true;
                }
            }
            if (!repeat) {
                product['product_count'] = 1;
                $scope.carts.push(product);
            }
        }
    };

    $scope.removeProductFromCart = function(product){
           
        if(product.product_count > 1){
            product.product_count -= 1;
        }
        else if(product.product_count === 1){
             var index = $scope.carts.indexOf(product);
             $scope.carts.splice(index, 1);
        }
    };

    $scope.removeAllProductFromCart = function(product){
           
        for (var i = 0; i < $scope.carts.length; i++) {
            if($scope.carts[i].product_id == product.product_id){
                $scope.carts.splice(i,1);
                return;
            }
        }
    };

    $scope.emptyCart = function(){
        $scope.carts = [];
    };

    $scope.subTotal = function() {
        var subTotal = 0;
        angular.forEach($scope.carts, function(product) {
            subTotal += product.product_count * product.product_retail_price;
        });
        return subTotal;
    }

    $scope.total = function() {
        var subTotal = $scope.subTotal();
        

        return subTotal - subTotal * $scope.tax;
    }

    $('.checkout').click(function(event) {
        // $("#main_trans_1").addClass('bounceOutRight');
        $('#main_trans_1').css('display', 'none');
        $('#main_trans_2').css('display', 'block');
    });
    $('#payment_back_href').click(function(event) {
        $('#main_trans_1').css('display', 'block');
        $('#main_trans_2').css('display', 'none');
    });





    $(document).ready(function() {
    // $('#salesman_det_div').toggle(function () {
    //  
    // });
        $('#salesman_det_div').click(function(event) {
            $("#transaction_actions_container_normal").css('display', 'none');
            $('#transaction_actions_container_salesman').css('display', 'block');
        });
        $('#salesman_det_div_select').click(function(event) {
            $('#transaction_actions_container_salesman').css('display', 'none');
            $('#transaction_actions_container_normal').css('display', 'block');
        });

        $('#check').click(function() {
            $('#other_payment_details').load('views/check.html');
        });

        $('#gift').click(function() {
            $('#other_payment_details').load('views/gift.html');
        });

        $('#other').click(function() {
            $('#other_payment_details').load('views/other.html');
        });

        $('#print').click(function () {
            var print = document.getElementById('in');
            var wme = window.open("","","width=900, height = 700");
            wme.document.write(print.outerHTML);
            wme.document.close();
            wme.focus();
            wme.print();
            wme.close();
        });

    });
});