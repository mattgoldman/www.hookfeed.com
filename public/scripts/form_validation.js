$(function () {
  $("input#jjpau-jjpau", "form#subForm, form#subFormTwo").keydown(function() {
    regex = /\S+@\S+\.\S+/;
    valid = regex.test($(this).val());

    if(valid){
      $(this).addClass('valid');
      $(this).removeClass('invalid');
    }else{
      $(this).addClass('invalid');
      $(this).removeClass('valid');
    };
  });
});