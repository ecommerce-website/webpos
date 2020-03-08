angular.module('WebposApp').service('Transaction', function(){
	this.initField = [
		'transaction_id',
		'transaction_ref',
		'transaction_name',
		'transaction_type',
		'transaction_user',
		'transaction_status'
	];

	this.listTransaction = [];

	this.transactionSelect = {};

	this.setListTransactionEmpty = function() {
        var self = this;
        if (self.listTransaction.constructor === Array) {
            self.listTransaction = [];
        }
        self.listTransaction = [];
    };

	this.addTransaction = function(data){
		var self = this;
		var transaction = {};
		$.each(this.initField, function(key, value){
			transaction[value] = data[value] != null ? data[value]: '';
		});
		self.listTransaction.push(transaction);
	};

	this.pushTransaction = function(data){
		var self = this;
		var transaction = {};
		$.each(this.initField, function(key, value){
			transaction[value] = data[value] != null ? data[value]: '';
		});
		self.listTransaction.splice(0, 0, transaction);
	};

	this.getTransaction = function(transactionId){
		var self = this;
		var transaction = self.listTransaction.find(i => i.transaction_id === transactionId);
		return transaction[key];
	};

	this.setTransactionSelect = function(data){
		var self = this;
		var transaction = {};
		$.each(this.initField, function(key, value){
			transaction[value] = data[value] != null ? data[value]: '';
		});
		self.transactionSelect = transaction;
	}
});	