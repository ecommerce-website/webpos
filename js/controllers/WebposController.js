angular.module('WebposApp').controller('WebposController', function($rootScope, $scope, $http, $timeout, $log, Product, CallApi, BuildUrl) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
        CallApi.callRestApiGet('products').then(function(data){
            $scope.products =data.data.data;
            Product.setListProductEmpty();
            data.data.data.forEach(function(product) {
                Product.addProduct(product);
                Product.setProductSelect(product);
            });
        });
    });
    // console.log(Product);
    $scope.carts = [];
    $scope.tmp = 0;
    $scope.subTotal = 0;
    $scope.discountAll = 0;

    $scope.bought = 0;

    $scope.addProductToCart = function(product) {
        if(product){

            product.product_discount = 0;

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
            $scope.tmp = product['product_stock_number'] -  product['product_count'];
        // console.log("sau" + $scope.tmp );
        }
    };
   
// giảm 1 sản phẩm
    $scope.removeProductFromCart = function(product){
           
        if(product.product_count > 1){
            product.product_count -= 1;
        }
        else if(product.product_count === 1){
             var index = $scope.carts.indexOf(product);
             $scope.carts.splice(index, 1);
        }
    };
// giảm cả sản phẩm đấy trong giỏ hàng
    $scope.removeAllProductFromCart = function(product){
           
        for (var i = 0; i < $scope.carts.length; i++) {
            if($scope.carts[i].product_id == product.product_id){
                $scope.carts.splice(i,1);
                return;
            }
        }
    };

// xóa giỏ hàng
    $scope.emptyCart = function(){
        $scope.carts = [];
    };
// tính toán lại số lượng
    $scope.updateStock = function () {
        for (var i = 0; i < $scope.carts.length; i++) {
            $scope.carts[i].product_stock_number -= $scope.carts[i].product_count;
            // console.log($scope.carts[i].product_stock_number);
        }
    }
// checkout xong thì về lại trang tính toán
    $scope.backUpStore = function () {
        $scope.emptyCart();
        $('#main_trans_1').css('display', 'block');
        $('#main_trans_2').css('display', 'none');
    }

// Tổng tiền trước khi giảm giá của mỗi sản phẩm
    $scope.subTotal = function() {
        var subTotal = 0;
        angular.forEach($scope.carts, function(product) {
            subTotal += product.product_count * product.product_retail_price;
        });
        return subTotal;
    }

// giá sau khi giảm giá  của 1 sp

    $scope.getCost = function (product) {
        if ($scope.discountAll != 0) {
            product.product_discount = $scope.discountAll;
        }
        $scope.x = product.product_retail_price * product.product_count;
        $scope.y = product.product_retail_price * product.product_count * product.product_discount /100;
        
        return $scope.x - $scope.y;
    }
// Tổng tiền sau khi giảm giá

    $scope.getTotal = function() {
        var totalDis = 0;
        angular.forEach($scope.carts, function(product) {
            totalDis += $scope.getCost(product);
        });
        // console.log(totalDis);
        return totalDis;
    }

    $scope.getDiscount = function() {
        
        return $scope.subTotal() - $scope.getTotal();
    }



    $scope.amount = $scope.getTotal();
    console.log($scope.amount);

// tính toán tiền thừa
    $scope.getChange = function() {
        return $scope.amount - $scope.getTotal();
    }

// tim kiems
    $scope.listSearch = [];
    $scope.keyUp = function (argument) {
        CallApi.callRestApiGet('products/search?search = '+ $scope.search).then(function(data){
            $scope.listSearch = data.data.data;
        });
    }

    $('.checkout').click(function(event) {
        // $("#main_trans_1").addClass('bounceOutRight');
        if ($scope.carts.length>0) {
            $('#main_trans_1').css('display', 'none');
            $('#main_trans_2').css('display', 'block');
        }else{
            $.notify("Chọn mặt hàng", "error");
        }
    });
    $('#payment_back_href').click(function(event) {
        $('#main_trans_1').css('display', 'block');
        $('#main_trans_2').css('display', 'none');
    });

    $scope.listId = [];
    $scope.quantity = [];


    $scope.getInvoice = function () {
        for (var i = 0; i < $scope.carts.length; i++) {
            $scope.bought += $scope.carts[i].product_count;
            $scope.listId.push($scope.carts[i].product_id);
            $scope.quantity[i] = $scope.carts[i].product_count;
        }
        // console.log($scope.listId);
    }

    $scope.saveInvoice = function () {
        // console.log($scope.listId);
        var qlinvoice= {
            qlinvoice: {
                invoice_user_id : "1",
                invoice_customer_id : "1",
                invoice_total: 100,
                invoice_quantity_bought: $scope.bought,
                invoice_remark: "hello",
                invoice_date: "2018-10-20 23:59:59",
                ql_invoices_product_id: $scope.listId,
                ql_invoices_quantity_bought: $scope.quantity,
                ql_invoices_discount: []
            }
        };
        console.log(JSON.stringify(qlinvoice));
        CallApi.callRestApiPost('insert',qlinvoice).then(function(data){
            alert('done');
        });
    }

    $scope.print = function(invoice) {
        var innerContents = document.getElementById('invoice').innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/print.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
      }
    



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

    });
});