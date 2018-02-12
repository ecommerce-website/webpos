angular.module('WebposApp').controller('TransactionController', function($rootScope, $scope, $http, $timeout, $log, Transaction, CallApi, BuildUrl) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();

        transcations.forEach(function(transaction){
            Transaction.addTransaction(transaction);
            Transaction.setTransactionSelect(transaction);
        });
        $scope.transcations = Transaction.listTransaction;
    });

    CallApi.callRestApiGet('transactions').then(function(data){
        $scope.transactions = data.data.data;
        data.data.data.forEach(function(transaction){
            Transaction.addTransaction(transaction);
            Transaction.setTransactionSelect(transaction);
        });
    });
    $scope.addProduct = [];
    $scope.totalCost = 0;


    $scope.openPopup = function(productId){
        CallApi.callRestApiGet('transactions').then(function(data){
            // $scope.
        });
    }

    $scope.searchProduct = function(Query){
        var data = {
            query : Query
        };
        CallApi.callRestApiPost('products/query', data).then(function(data){
            $scope.products = data.data.data;
        });
    }

    $scope.addProductLine = function(product){
        product.product_quantity_bought = 0;
        $scope.addProduct = $scope.addProduct.concat(product);
        $scope.calcTotalCost();
    }

    $scope.removeProductLine = function(product){
        var index = $scope.addProduct.indexOf(product);
        $scope.addProduct.splice(index, 1);
        $scope.calcTotalCost();   
    }

    $scope.calcTotalCost = function(){
        var tmp = 0;
        angular.forEach($scope.addProduct, function(value, key){
            tmp += value.product_cost * value.product_quantity_bought;
        });
        $scope.totalCost = tmp;
    }

    $scope.addTransaction = function(){
        var transaction = {
            transaction: {
                transaction_type: "Nhập hàng",
                transaction_ref: "",
                transaction_remark: "",
                transaction_supplier: $scope.supplier,
                transaction_product: $scope.addProduct
            }
        };
        console.log(JSON.stringify(transaction));
    }

    $scope.detailTransaction = function(transactionId){
        CallApi.callRestApiGet('transactions/show/'+transactionId).then(function(data){
            $scope.transaction = data.data;
            $scope.transaction.totalCost = 0;
            angular.forEach($scope.transaction.qltransactions, function(value, key){
                value.totalCost = value.ql_transactions_cost * value.ql_transactions_quantity_bought;
                $scope.transaction.totalCost += value.totalCost;
            });
        });
    }
});