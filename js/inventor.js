$(document).ready(function(){
  $('#sample_1 tbody tr td').on('click',function(){
    $("#history").modal("show");
  });
});
var TableDatatablesRowreorder = function () {
  var initTable2 = function () {
    var table = $('#sample_1');
    var oTable = table.dataTable({

            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
              "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
              },
              "emptyTable": "Không có sản phẩm",
              "info": "Hiển thị _START_ đến _END_ trong _TOTAL_ sản phẩm",
              "infoEmpty": "No entries found",
              "infoFiltered": "(filtered1 from _MAX_ total entries)",
              "lengthMenu": "_MENU_ sản phẩm",
              "search": "Tìm:",
              "zeroRecords": "Không tìm thấy sản phẩm"
            },

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},

            buttons: [
            { extend: 'print', className: 'btn default' }
            ],

            // setup colreorder extension: http://datatables.net/extensions/colreorder/
            colReorder: {
              reorderCallback: function () {
                console.log( 'callback' );
              }
            },

            // setup rowreorder extension: http://datatables.net/extensions/rowreorder/
            rowReorder: {

            },

            "order": [
            [0, 'asc']
            ],
            
            "lengthMenu": [
            [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "Tất cả"] // change per page values here
                ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            //"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
          });
  }

  return {

        //main function to initiate the module
        init: function () {

          if (!jQuery().dataTable) {
            return;
          }
          initTable2();
        }

      };

    }();

    jQuery(document).ready(function() {
      TableDatatablesRowreorder.init();
    });