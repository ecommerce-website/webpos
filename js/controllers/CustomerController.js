angular.module('WebposApp').controller('CustomerController', function($rootScope, $scope, $http, $timeout, $log, Customer, CallApi, BuildUrl) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();

        customer.forEach(function(invoice) {
            Customer.addInvoice(customer);
            Customer.setInvoiceSelect(customer);
        });

        // Invoice.setValueInvoiceSelect("name", "Regularrrrr");

        $log.info(Customer); 
        $scope.listCustomer = Invoice.listCustomer;
        // console.log($scope.invoice);

    });

    $scope.addCustomer = function(){
        $scope.  
    };
});