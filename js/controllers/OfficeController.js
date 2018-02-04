angular.module('WebposApp').controller('OfficeController', function($rootScope, $scope, $http, $timeout, $log, Invoice, CallApi, BuildUrl) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();


        invoices.forEach(function(invoice) {
            Invoice.addInvoice(invoice);
            Invoice.setInvoiceSelect(invoice);
        });

        // Invoice.setValueInvoiceSelect("name", "Regularrrrr");

        $log.info(Invoice); 
        $scope.invoices = Invoice.listInvoice;
        // console.log($scope.invoice);

    });


    CallApi.callRestApiGet('products').then(function(data){
        $scope.invoices = data.data.data;
        console.log(data.data.data);
        data.data.data.forEach(function(invoice) {
            Invoice.addInvoice(invoice);
            Invoice.setInvoiceSelect(invoice);
        });

        $scope.invoices = Invoice.listInvoice;
    });


    $scope.openPopup = function(invoice_id){
        $scope.invoicePopup = Invoice.getInvoice(invoice_id);  
    };
});