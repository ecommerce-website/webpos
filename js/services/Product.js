angular.module('WebposApp').service('Product', function() {
    /**
     * init field product
     */
    this.initField = [
        'product_id',
        'product_type',
        'product_active',
        'product_stock_number',
        'product_name',
        'product_cost',
        'product_retail_price',
        'product_description',
        'product_img',
        'product_max_quantity',
        'product_min_quantity',
        'product_unit_string',
        'product_unit_quantity',
        'product_on_hand',  
        'product_barcode',
        'product_tag',
        'product_count',
        'product_discount'
    ];
    /**
     * list product
     */
    this.listProduct = [];
    /**
     * product select
     */
    this.productSelect = {};
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
            self.listProduct = [];
        };

        /**
         * add product to list product
         * @param {*} data 
         */
    this.addProduct = function(data) {
        var self = this;
        var product = {};
        $.each(this.initField, function(key, value) {
            product[value] = data[value] != null ? data[value] : '';
        });
        self.listProduct.push(product);
    };

    /**
     * get product in list product
     * @param {*} productId 
     */
    this.getProduct = function(productId) {
        var self = this;
        return this.listProduct.find(p => p.product_id === productId) ? this.listProduct.find(p => p.product_id === productId) : null;
    };
    /**
     * set product in list product
     * @param {*} productId 
     * @param {*} product 
     */
    this.setProduct = function(productId, product) {
        var self = this;
        var tmpProduct = self.listProduct.find(p => p.product_id === productId);
        $.each(this.initField, function(key, value) {
            if(value in tmpProduct && value in product){
                tmpProduct[value] = product[value];
            }
        });
    };
    /**
     * get value => key of product 
     * @param {*} productId 
     * @param {*} key 
     */
    this.getValueProduct = function(productId, key) {
        var self = this;
        var product = self.listProduct.find(p => p.product_id === productId);
        return product[key];
    };
    /**
     * set value => key of product
     * @param {*} productId 
     * @param {*} key 
     * @param {*} value 
     */
    this.setValueProduct = function(productId, key, value) {
        var self = this;
        self.listProduct.find(p => p.product_id === productId)[key] = value;
    };
    /**
     * product select empty
     */
    this.setProductSelectEmpty = function() {
        var self = this;
        if (self.productSelect.constructor === Object) {
            self.productSelect = {};
        }
    };
    /**
     * set product select to data
     * @param {*} data 
     */
    this.setProductSelect = function(data) {
        var self = this;
        var product = {};
        $.each(this.initField, function(key, value) {
            product[value] = data[value] != null ? data[value] : '';
        });
        self.productSelect = product;
    };
    /**
     * get value => key product select
     * @param {*} key 
     */
    this.getValueProductSelect = function(key) {
        var self = this;
        return self.productSelect[key];
    };
    /**
     * set value => key product select
     * @param {*} key 
     * @param {*} value 
     */
    this.setValueProductSelect = function(key, value) {
        var self = this;
        self.productSelect[key] = value;
    };
});