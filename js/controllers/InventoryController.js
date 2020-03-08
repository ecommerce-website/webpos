angular.module('WebposApp').controller('InventoryController', function($rootScope, $scope, $http, $timeout, $log, Inventory, CallApi, BuildUrl) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
    });

    CallApi.callRestApiGet('inventories').then(function(data){
        $scope.inventories = data.data.data;
        $scope.panigation = data.data;
        Inventory.setListInventoryEmpty();
        data.data.data.forEach(function(inventory) {
            Inventory.addInventory(inventory);
            Inventory.setInventorySelect(inventory);
        });
    });

    // CallApi.callRestApiGet('inventories?all=true').then(function(data){
    //     $scope.inventories_all = data.data;
    // });

    $scope.changePage = function(url){
        CallApi.callApiGet(url).then(function(data){
            $scope.inventories = data.data.data;
            $scope.panigation = data.data;
            Inventory.setListInventoryEmpty();
            data.data.data.forEach(function(inventory) {
                Inventory.addInventory(inventory);
                Inventory.setInventorySelect(inventory);
            });
        });
    }

    $scope.changeRestPage = function(url){
        CallApi.callRestApiGet(url).then(function(data){
            $scope.inventories = data.data.data;
            $scope.panigation = data.data;
            Inventory.setListInventoryEmpty();
            data.data.data.forEach(function(inventory) {
                Inventory.addInventory(inventory);
                Inventory.setInventorySelect(inventory);
            });
        });
    }

    $scope.openPopup = function(productId){
        var api1 = 'products/sales/' + productId;
        var api2 = 'products/transactions/' + productId;
        CallApi.callRestApiGet(api1).then(function(data){
            $scope.saleProduct = data.data.data[0];
            console.log($scope.saleProduct);
            $scope.listSale = data.data.data[0].ql_invoices;
        });

        CallApi.callRestApiGet(api2).then(function(data){
            $scope.nhapProduct = data.data.data[0];
            $scope.listNhap = data.data.data[0].ql_invoices;
            console.log($scope.listProduct);
        });
    };

    $scope.searchInventory = function(Query){
        var data = {
            query : Query
        };
        CallApi.callRestApiPost('inventories/query', data).then(function(data){
            $scope.inventories = data.data.data;
            $scope.panigation = data.data;
            Inventory.setListInventoryEmpty();
            data.data.data.forEach(function(inventory) {
                Inventory.addInventory(inventory);
                Inventory.setInventorySelect(inventory);
            });
        });
    }

    $scope.print = function($div, $all){
        if($all){
            CallApi.callRestApiGet('inventories?all=true').then(function(data){
                $scope.inventories_all = data.data;
                $scope.print_inventories = $scope.inventories_all; 
            });
        } else {
            $scope.print_inventories = $scope.inventories;
        }
        setTimeout(function() {
            $scope.$apply(printDiv($div));
        }, 1000);
    }

    $scope.printDiv = function($div) {
        var innerContents = document.getElementById($div).innerHTML;
        var popupWinindow = window.open('', '_blank', 'scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write("<html><head><title> Kho hàng </title>");
        popupWinindow.document.write('<link href="assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>');
        popupWinindow.document.write("</head><body>");
        popupWinindow.document.write('<script type="text/javascript">setTimeout(function () { window.print(); }, 500);window.onfocus = function () { setTimeout(function () { window.close(); }, 500); }</script>');
        popupWinindow.document.write(innerContents);
        popupWinindow.document.write("</body></html>");
        popupWinindow.document.close();

    }
});