angular.module('WebposApp').controller('OfficeController', function($rootScope, $scope, $http, $timeout, $log, Invoice, CallApi, BuildUrl) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();

        $log.info(Invoice); 
        $scope.invoices = Invoice.listInvoice;

    });


    CallApi.callRestApiGet('invoices').then(function(data){
        $scope.invoices = data.data.data;
        console.log(data.data.data);
        data.data.data.forEach(function(invoice) {
            Invoice.addInvoice(invoice);
            Invoice.setInvoiceSelect(invoice);

        });

        $scope.invoices = Invoice.listInvoice;
    });

    $scope.openPopup = function(invoice_id){
        var url = 'invoices/show/' + invoice_id;
        CallApi.callRestApiGet(url).then(function(data){
            $scope.inv = data.data;
            console.log($scope.inv);
            $scope.invoiceListProduct = data.data.invoice_products;
            console.log($scope.invoiceListProduct);
        });
    };
});