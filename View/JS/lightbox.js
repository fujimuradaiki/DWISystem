$(document).ready(function() {

$('.login_btn').click(function(){
  $('.login_view').fadeIn();
  $('body').addClass("overflow");
});

$('.login_btn2').click(function(){
  $('.login_view').fadeIn();
  $('body').addClass("overflow");
});

$('.new_btn').click(function(){
  $('.new_view').fadeIn();
  $('body').addClass("overflow");
});

$('.confirmation_btn').click(function(){
  $('.new_confirmation_view').fadeIn();
  $('body').addClass("overflow");
});

$('.return_btn').click(function(){
  $('.new_view').fadeIn();
  $('body').addClass("overflow");
});

$('.touroku_btn').click(function(){
  $('.new_touroku_view').fadeIn();
  $('body').addClass("overflow");
});

  $('.images #1').click(function(){
  $('.lightbox_view1').fadeIn();
  $('body').addClass("overflow");
});

$('#2.images').click(function(){
  $('.lightbox_view2').fadeIn();
  $('body').addClass("overflow");
});

$('#3.images').click(function(){
  $('.lightbox_view3').fadeIn();
  $('body').addClass("overflow");
});

$('#4.images').click(function(){
  $('.lightbox_view4').fadeIn();
  $('body').addClass("overflow");
});

$('#5.images').click(function(){
  $('.lightbox_view5').fadeIn();
  $('body').addClass("overflow");
});

$('#6.images').click(function(){
  $('.lightbox_view6').fadeIn();
  $('body').addClass("overflow");
});




// close�{�^��//

$('.close_btn img').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.lightbox_view1,.lightbox_view2,.lightbox_view3,.lightbox_view4,.lightbox_view5,.lightbox_view6,.login_view,.new_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});

$('.login_close_btn img').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.login_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});

$('.new_close_btn img').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.new_view,.new_confirmation_view,.new_touroku_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});

$('.close_btn2').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.login_view,.new_view,.new_touroku_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});

$('.confirmation_btn').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.new_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});
$('.return_btn').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.new_confirmation_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});

$('.touroku_btn').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.new_confirmation_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});


});
