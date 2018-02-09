angular.module('WebposApp').service('Customer',function(){
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
	
});