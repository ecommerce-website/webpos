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
    });

    invoices = [{
            invoice_id : "001",
            invoice_customer_id : "C001",
            invoice_total : "1000",
            invoice_quantity_bought : "5",
            invoice_transaction : "Normal",
            invoice_ref : "1-1515767727387",
            invoice_remark : "note 1",
            invoice_payment_term : "dasd",
            invoice_status: "posted",
            invoice_date: "7-7-1997",
        },
        {
            invoice_id : "003",
            invoice_customer_id : "C0321",
            invoice_total : "10320",
            invoice_quantity_bought : "10",
            invoice_transaction : "Normal",
            invoice_ref : "ABD5767727387",
            invoice_remark : "note 2",
            invoice_payment_term : "dasxsd",
            invoice_status: "posted",
            invoice_date: "10-10-1010",
        },
    ];

});