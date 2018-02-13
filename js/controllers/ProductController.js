angular.module('WebposApp').directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                if(changeEvent.target.files.length > 0){
                    reader.readAsDataURL(changeEvent.target.files[0]);
                }
            });
        }
    }
}])
.controller('ProductController', function($rootScope, $scope, $http, $timeout, $log, Product, CallApi, BuildUrl) {

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
        $log.info(Product); 
        $scope.products = Product.listProduct;
    }); 

    CallApi.callRestApiGet('products').then(function(data){
        $scope.products = data.data.data;
        $scope.panigation = data.data;
        Product.setListProductEmpty();
        data.data.data.forEach(function(product) {
            // console.log(JSON.stringify(product))
            Product.addProduct(product);
            Product.setProductSelect(product);
        });

        $scope.products = Product.listProduct;
    });
    $scope.printCount = 0;

    $scope.resetPopup = function(){
        $scope.product_stock_number = 1;
        $scope.product_name = "";
        $scope.product_retail_price = null;
        $scope.product_cost = null;
        $scope.product_description = "";
        $scope.product_min_quantity = 0;
        $scope.product_max_quantity = 0;
        $scope.product_tags = "";
        $scope.product_img = null;
        angular.element("input[type='file']").val(null);
    }
    $scope.resetPopup();

    $scope.openPopup = function(product_id){
        var url = 'invoices/show/' + invoice_id;
        CallApi.callRestApiGet(url).then(function(data){
            $scope.inv = data.data;
            $scope.invoiceListProduct = data.data.invoice_products;
        });
    };

    $scope.changePage = function(url){
        CallApi.callApiGet(url).then(function(data){
            $scope.products = data.data.data;
            $scope.panigation = data.data;
            Product.setListProductEmpty();
            data.data.data.forEach(function(product) {
                // console.log(JSON.stringify(product))
                Product.addProduct(product);
                Product.setProductSelect(product);
            });

            $scope.products = Product.listProduct;
        });
    }

    $scope.changeRestPage = function(url){
        CallApi.callRestApiGet(url).then(function(data){
            $scope.products = data.data.data;
            $scope.panigation = data.data;
            Product.setListProductEmpty();
            data.data.data.forEach(function(product) {
                Product.addProduct(product);
                Product.setProductSelect(product);
            });
            $scope.products = Product.listProduct;
        });
    }

    $scope.addProduct = function(){
        var product= {
                product: {
                    product_stock_number : $scope.product_stock_number,
                    product_name : $scope.product_name,
                    product_retail_price: $scope.product_retail_price,
                    product_cost: $scope.product_cost,
                    product_description: $scope.product_description || "Chưa có mô tả nào",
                    product_min_quantity: $scope.product_min_quantity || 0,
                    product_max_quantity: $scope.product_max_quantity || 0,
                    product_tags: $scope.product_tags || "",
                    product_img: $scope.product_img
                }
            };
            // console.log(JSON.stringify(product));
        CallApi.callRestApiPost('products/store',product).then(function(data){
            if(data['status'] == 200){
                $scope.changeRestPage('products?page=1');
                $scope.resetPopup();
                console.log("Thêm sp thành công");
            } else {
                console.log("Thêm sp thất bại");
            }
        });
    }
    $scope.showPro = function(id){
        $scope.product_selected = Product.getProduct(id);
        Product.setProductSelect($scope.product_selected);
    }
    $scope.showHistoryPro = function(id){
        CallApi.callRestApiGet('products/show/' + id).then(function(data){
            $scope.product_detail = data.data;
            // console.log(JSON.stringify(data.data));
        });
    }
    $scope.updateProduct = function(id){
        var eProduct= {
                product: {
                    product_stock_number : parseInt($scope.edit_product_stock_number),
                    product_name : $scope.edit_product_name,
                    product_retail_price: parseInt($scope.edit_product_retail_price),
                    product_cost: parseInt($scope.edit_product_cost),
                    product_description: $scope.edit_product_description || "Chưa có mô tả nào",
                    product_min_quantity: parseInt($scope.edit_product_min_quantity || 0),
                    product_max_quantity: parseInt($scope.edit_product_max_quantity || 0),
                    product_tags: $scope.edit_product_tags || "",
                    product_img: $scope.product_img
                }
            };
            CallApi.callRestApiPost('products/edit/'+id,eProduct).then(function(data){
                editedProduct = data.data.editedProduct;
                Product.setProduct(editedProduct.product_id, editedProduct);
            });
    }

    $scope.editPro = function(id){
        var result = Product.getProduct(id);
        $scope.id_product = id;
        $scope.edit_product_stock_number = parseInt(result.product_stock_number);
        $scope.edit_product_name = result.product_name;
        $scope.edit_product_retail_price = result.product_retail_price;
        $scope.edit_product_cost = result.product_cost;
        $scope.edit_product_description = result.product_description;
        $scope.edit_product_min_quantity = result.product_min_quantity;
        $scope.edit_product_max_quantity = result.product_max_quantity;
        $scope.edit_product_img = result.product_img;
    }

    $scope.delProduct = function(id){
        var product = {
                product: [id]
            };
        CallApi.callRestApiPost('products/delete',product).then(function(data){
            if(data['status'] == 200){
                $scope.changeRestPage('products?page=' + $scope.panigation.current_page);
                console.log("Xóa sp thành công");
            } else {
                console.log("Xóa sp thất bại");
            }
        });
    }

    $scope.searchProduct = function(Query){
        var data = {
            query : Query
        };
        CallApi.callRestApiPost('products/query', data).then(function(data){
            $scope.products = data.data.data;
            $scope.panigation = data.data;
            Product.setListProductEmpty();
            data.data.data.forEach(function(product) {
                // console.log(JSON.stringify(product))
                Product.addProduct(product);
                Product.setProductSelect(product);
            });

            $scope.products = Product.listProduct;
        });
    }

    $scope.getNumber = function(num) {
        return new Array(num);   
    }

    $scope.print = function(){
        var innerContents = document.getElementById('print-barcode').innerHTML;
        var popupWinindow = window.open('', '_blank', 'scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/printBarcode.css" /></head><body><script type="text/javascript">setTimeout(function () { window.print(); }, 500);window.onfocus = function () { setTimeout(function () { window.close(); }, 500); }</script>' + innerContents + '</body></html>');
        popupWinindow.document.close();
    }
});