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
        product.quantity = 0;
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
            tmp += value.product_cost * value.quantity;
        });
        $scope.totalCost = tmp;
    }
});