$(function () {
  $("input#jdwdyi-jdwdyi", "form#subForm, form#subFormTwo").keyup(function() {
    $val = $(this).val();
    regex = /\S+@\S+\.\S+/;
    valid = regex.test($val);

    if($val == ''){
      $(this).removeClass('valid');
      $(this).removeClass('invalid');
    }else if(valid){
      $(this).addClass('valid');
      $(this).removeClass('invalid');
    }else{
      $(this).addClass('invalid');
      $(this).removeClass('valid');
    };
  });
});