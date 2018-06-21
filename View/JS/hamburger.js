$(document).ready(function(){
  
//  ハンバーガーボタン
//  ==ハンバーガーメニューをクリックすると中身が開く==
  $('.btn-hamburger').on('click', function(){
  $('.sp-nav').slideToggle(400);  
  $(this).toggleClass('active');
  $("body").toggleClass('fixed');
  
  });
 
  $('.login_user_icon').on('click', function(){
  $('.login_nav').slideToggle(400);
  });


});