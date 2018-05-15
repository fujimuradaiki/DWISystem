$(document).ready(function() {
  
$('.login_btn').click(function(){
  $('.login_view').fadeIn();
  $('body').addClass("overflow");
});

$('.login_btn2').click(function(){
  $('.login_view').fadeIn();
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




// closeボタン//

$('.close_btn img').click(function(){//.close_btn imgをクリックしたとき//
  $('.lightbox_view1,.lightbox_view2,.lightbox_view3,.lightbox_view4,.lightbox_view5,.lightbox_view6,.login_view').fadeOut();//viewがフェードアウトする//
  $('body').removeClass("overflow");
});

$('.close_btn2').click(function(){//.close_btn imgをクリックしたとき//
  $('.login_view').fadeOut();//viewがフェードアウトする//
  $('body').removeClass("overflow");
});


});
