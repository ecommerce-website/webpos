angular.module('WebposApp').service('Product', function() {
    /**
     * init field product
     */
    this.initField = [
        'product_id',
        'product_type',
        'product_active',
        'product_stock',
        'product_name',
        'product_cost',
        'product_retail_price',
        'product_description',
        'product_img',
        'product_max_quantity',
        'product_min_quantity',
        'product_unit_string',
        'product_unit_quantity',
        'product_barcode',
        'product_tag',
        'product_count' = 1
    ];
    /**
     * list product
     */
    this.cart = [];
    /**
     * create init product
     */
    this.productInit = function() {
        var product = {};
        $.each(this.initField, function(key, value) {
            product[value] = value != null ? null : "";
        });
        return product;
    };
    /**
     * list product empty
     */
    this.setListProductEmpty = function() {
            var self = this;
            if (self.listProduct.constructor === Array) {
                self.listProduct = [];
            }
        };

        /**
         * add product to list product
         * @param {*} data 
         */
    this.addProductToCart = function(product) {

        for (var i = 0; i < cart.length; i++) {
            if (cart[i].product_id === product.product_id) {
                cart[i].product_count ++;
                return;
            }
        }
        cart.push(product);
    };

    this.removeProductFromCart = function (pro_id) {
        for (var i = 0; i < cart.length; i++) {
            if(cart[i].product_id === pro_id){
                cart.slice(i,1);
                return;
            }
        }
    }
});