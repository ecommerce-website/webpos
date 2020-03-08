$(document).ready(function() {
	// $('#salesman_det_div').toggle(function () {
	// 	
	// });
	$('#salesman_det_div').click(function(event) {
		$("#transaction_actions_container_normal").css('display', 'none');
		$('#transaction_actions_container_salesman').css('display', 'block');
	});
	$('#salesman_det_div_select').click(function(event) {
		$('#transaction_actions_container_salesman').css('display', 'none');
		$('#transaction_actions_container_normal').css('display', 'block');
	});

	$('#check').click(function() {
		$('#other_payment_details').load('check.html');
	});

	$('#gift').click(function() {
		$('#other_payment_details').load('gift.html');
	});

	$('#other').click(function() {
		$('#other_payment_details').load('other.html');
	});

	$('#print').click(function () {
		var print = document.getElementById('in');
		var wme = window.open("","","width=900, height = 700");
		wme.document.write(print.outerHTML);
		wme.document.close();
		wme.focus();
		wme.print();
		wme.close();
	});

	// $("input[name='demo3_21']").TouchSpin({
	//     initval: 40
	// }); 

});