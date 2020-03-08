function printDiv(t) {
	var e = window.open("", "PRINT", "height=500,width=1000");
	var n = $("#" + t).html();
	console.log(t + " " + n);
	e.document.write("<html><head><title> Print </title>"),
	e.document.write('<link rel="stylesheet" type="text/css" href="print.css">'),
	e.document.write('<link href="assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>'),
	e.document.write("</head><body>"),
	e.document.write(n),
	e.document.write("</body></html>"),
	e.document.close(),
	e.focus(),
	$(e).on('load', function() {
		e.print(),
		e.close()
	})
}