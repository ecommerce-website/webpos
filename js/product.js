$(document).ready(function(){
	// $('#check-all').on('ifChecked', function(event) {
	// 	$('.icheck').iCheck('check');
	// });
	// $('#check-all').on('ifUnchecked', function(event) {
	// 	$('.icheck').iCheck('uncheck');
	// });
// Remove the checked state from "All" if any checkbox is unchecked
// $('.icheck').on('ifUnchecked', function (event) {
// 	$('#check-all').iCheck('uncheck');
// });

// Make "All" checked if all checkboxes are checked
// $('.icheck').on('ifChecked', function (event) {
// 	if ($('.icheck').filter(':checked').length == $('.icheck').length) {
// 		$('#check-all').iCheck('check');
// 	}
// });

	$('#btn-add-pro').on('click',function(){
		$('#add-pro').modal("toggle");
	});
	$('#btn-history').on('click',function(){
		$('#history').modal("show");
	});
	$('#btn-barcode').on('click',function(){
		$('#barcode').modal("show");
	});

});


