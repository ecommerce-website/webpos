angular.module('WebposApp').controller('InvoiceController', function($rootScope, $scope, $http, $timeout, $log, Invoice, CallApi, BuildUrl) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
    });

    CallApi.callRestApiGet('invoices').then(function(data){
        $scope.invoices = data.data.data;
        $scope.panigation = data.data;
        Invoice.setListInvoiceEmpty();
        data.data.data.forEach(function(invoice){
            Invoice.addInvoice(invoice);
            Invoice.setInvoiceSelect(invoice);
        });
    });


    $scope.changePage = function(url){
        CallApi.callApiGet(url).then(function(data){
            $scope.invoices = data.data.data;
            $scope.panigation = data.data;
            Invoice.setListInvoiceEmpty();
            data.data.data.forEach(function(invoice) {
                Invoice.addInvoice(invoice);
                Invoice.setInvoiceSelect(invoice);
            });
        });
    }

    $scope.changeRestPage = function(url){
        CallApi.callRestApiGet(url).then(function(data){
            $scope.invoices = data.data.data;
            $scope.panigation = data.data;
            Invoice.setListInvoiceEmpty();
            data.data.data.forEach(function(invoice) {
                Invoice.addInvoice(invoice);
                Invoice.setInvoiceSelect(invoice);
            });
        });
    }

    $scope.searchInvoice = function(invoiceId){
        CallApi.callRestApiGet('invoices?id='+invoiceId).then(function(data){
            $scope.invoices = data.data.data;
            $scope.panigation = data.data;
            Invoice.setListInvoiceEmpty();
            data.data.data.forEach(function(invoice){
                Invoice.addInvoice(invoice);
                Invoice.setInvoiceSelect(invoice);
            });
        });
    }

    $scope.detailInvoice = function(invoiceId){
        CallApi.callRestApiGet('invoices/show/'+invoiceId).then(function(data){
            $scope.invoice = data.data;
        });
    }
});