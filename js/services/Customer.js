angular.module('WebposApp').service('Invoice',function(){
	this.initField= [
		'customer_id',
		'customer_group_id',
		'customer_fname',
		'customer_lname',
		'customer_gender',
		'customer_gender',
		'customer_email',
		'customer_city',
		'customer_mobile',
		'customer_telephone',
		'customer_street',
		'customer_address',
		'customer_note',
		'customer_birthday',
		
	];
	/*
		list Customer
	*/
	this.listCustomer = [];
	/*
		Customer select
	*/
	this.customerSelect = {};
	/*
		create init Customer
	*/
	this.customerInit = function(){
		var customer = {};
		$.each(this.initField, function(key, value){
			customer[value]  = value != null ? null : "";
		});
		return customer;
	};

	/*
		list customer empty
	*/
	this.setListCustomerEmpty = function(){
		var self = this;
		if(self.listCustomer.constructor === Array){
			self.listCustomer = [];
		}
	}
	/*
		add customer to list Customer
	*/
	this.addCustomer = function(data){
		var self = this;
		var customer = {};
		$.each(this.initField, function(key, value){
			customer[value] = data[value] != null ? data[value]: '';
		});
		self.listCustomer.push(customer);
	};

	/*
		get customer in list customer
	*/
	this.getCustomer = function(customerId){
		var self  = this;
		return this.listCustomer.find(i => i.customer_id === customerId) ? this.listCustomer.find(p => p.customer_id === customerId ) : null;	
	};

	/*
		get Value => key of invoice
	*/
	this.getValueCustomer = function(customerId, key){
		var self = this;
		var customer = self.listCustomer.find(i => i.customer_id === customerId);
		return customer[key];
	};

	/*
		set value => key of product
	*/
	this.setValueCustomer = function(customerId, key){
		var self = this;
		var customer = self.listCustomer.find(i => i.customer_id === customerId);
	};

	this.setCustomerSelectEmpty = function(){
		var self = this;
		if(self.customerSelect.constructor === Object){
			self.customerSelect = {};
		}
	};

	/**
     * set product select to data
     * @param {*} data 
     */
    this.setCustomerSelect = function(data) {
        var self = this;
        var customer = {};
        $.each(this.initField, function(key, value) {
            customerr[value] = data[value] != null ? data[value] : '';
        });
        self.customerSelect = customer;
    };

});