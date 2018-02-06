angular.module('WebposApp').controller('InventoryController', function($rootScope, $scope, $http, $timeout, $log, Inventory, CallApi, BuildUrl) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();


        inventories.forEach(function(inventory) {
            Inventory.addInvoice(inventory);
            Inventory.setInvoiceSelect(inventory);
        });

        // Invoice.setValueInvoiceSelect("name", "Regularrrrr");

        $log.info(Inventory); 
        $scope.inventories = Invoice.listInventory;
        // console.log($scope.invoice);

    });

    CallApi.callRestApiGet('inventories').then(function(data){
        $scope.inventories = data.data.data;
        console.log(data.data.data);
        data.data.data.forEach(function(inventory) {
            Inventory.addInvoice(inventory);
            Inventory.setInvoiceSelect(inventory);
        });

        $scope.inventories = Inventory.listInventory;
    });


    // $scope.openPopup = function(product_id){
    //     $scope.inventoryPopup = Inventory.getInventory(product_id);  
    // };
});