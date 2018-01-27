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
		list invoice
	*/
	this.listInvoice = [];
	/*
		Invoice select
	*/
	this.invoiceSelect = {};
	/*
		create init invoice
	*/
	this.invoiceInit = function(){
		var invoice = {};
		$.each(this.initField, function(key, value){
			product[value]  = value != null ? null : "";
		});
		return invoice;
	};

	/*
		list invoice empty
	*/
	this.setListInvoiceEmpty = function(){
		var self = this;
		if(self.listInvoice.constructor === Array){
			self.listInvoice = [];
		}
	}
	/*
		add invoice to list invoice
	*/
	this.addInvoice = function(data){
		var self = this;
		var invoice = {};
		$.each(this.initField, function(key, value){
			invoice[value] = data[value] != null ? data[value]: '';
		});
		self.listInvoice.push(invoice);
	};

	/*
		get invoice in list invoice
	*/
	this.getInvoice = function(invoiceId){
		var self  = this;
		return this.listInvoice.find(i => i.invoice_id === invoiceId) ? this.listInvoice.find(p => p.invoice_id === invoiceId ) : null;	
	};

	/*
		get Value => key of invoice
	*/
	this.getValueInvoice = function(invoiceId, key){
		var self = this;
		var invoice = self.listInvoice.find(i => i.invoice_id === invoiceId);
		return invoice[key];
	};

	/*
		set value => key of product
	*/
	this.setValueInvoice = function(invoiceId, key){
		var self = this;
		var invoice = self.listInvoice.find(i => i.invoice_id === invoiceId);
	};

	this.setInvoiceSelectEmpty = function(){
		var self = this;
		if(self.invoiceSelect.constructor === Object){
			self.invoiceSelect = {};
		}
	};

	/**
     * set product select to data
     * @param {*} data 
     */
    this.setInvoiceSelect = function(data) {
        var self = this;
        var invoice = {};
        $.each(this.initField, function(key, value) {
            invoice[value] = data[value] != null ? data[value] : '';
        });
        self.invoiceSelect = invoice;
    };

});