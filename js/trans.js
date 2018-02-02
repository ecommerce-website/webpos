$(document).ready(function(){
  $('#btn-add-trans').on('click',function(){
    $("#add-trans").modal("toggle");
    var t = $('#type1').val();
    var ok = "#"+t;
    console.log(ok);
    $(ok).modal("toggle");
  });
});