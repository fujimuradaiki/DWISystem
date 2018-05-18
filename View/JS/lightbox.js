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

<<<<<<< HEAD
  $(document).on("click",".lightbox_hover",function(){
=======
  $(document).on("click",".lightbox",function(){
>>>>>>> 4cf6a954bb9b69195b80417c411586740721d0bb
  $('.lightbox_view').fadeIn();
  $('body').addClass("overflow");
});

// $(document).on("mouseover",".lightbox",function(){
// 	var $image = $(this).children('img');
// 	var $imageId = $image.attr('id');
//
// 	alert($imageId);
// });







// close�{�^��//

$('.close_btn img').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.lightbox_view,.login_view,.new_view').fadeOut();//view���t�F�[�h�A�E�g����//
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
