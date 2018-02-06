angular.module('WebposApp').service('Inventory',function(){
	this.initField= [
		'product_id',
		'product_name',
		'product_cost',
		'product_retail_price',
		'product_on_hand',
		'product_stock_number',
	];
	/*
		list inventory
	*/
	this.listInventory = [];
	/*
		Invoice select
	*/
	this.inventorySelect = {};
	/*
		create init inventory
	*/
	this.inventoryInit = function(){
		var inventory = {};
		$.each(this.initField, function(key, value){
			product[value]  = value != null ? null : "";
		});
		return inventory;
	};

	/*
		list Inventory empty
	*/
	this.setListInventoryEmpty = function(){
		var self = this;
		if(self.listInventory.constructor === Array){
			self.listInventory = [];
		}
	}
	/*
		add Inventory to list Inventory
	*/
	this.addInvoice = function(data){
		var self = this;
		var inventory = {};
		$.each(this.initField, function(key, value){
			inventory[value] = data[value] != null ? data[value]: '';
		});
		self.listInventory.push(inventory);
	};

	/*
		get inventory in list inventory
	*/
	this.getInventory = function(productId){
		var self  = this;
		return this.listInventory.find(i => i.product_id === productId) ? this.listInventory.find(p => p.product_id === productId ) : null;	
	};

	/*
		get Value => key of invoice
	*/
	this.getValueInventory = function(productId, key){
		var self = this;
		var inventory = self.listInventory.find(i => i.product_id === productId);
		return inventory[key];
	};

	/*
		set value => key of product
	*/
	this.setValueInventory = function(productId, key){
		var self = this;
		var inventory = self.listInventory.find(i => i.product_id === productId);
	};

	this.setInventorySelectEmpty = function(){
		var self = this;
		if(self.inventorySelect.constructor === Object){
			self.inventorySelect = {};
		}
	};

	/**
     * set product select to data
     * @param {*} data 
     */
    this.setInventorySelect = function(data) {
        var self = this;
        var inventory = {};
        $.each(this.initField, function(key, value) {
            inventory[value] = data[value] != null ? data[value] : '';
        });
        self.inventorySelect = inventory;
    };

});