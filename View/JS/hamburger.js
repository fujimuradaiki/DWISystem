$(document).ready(function(){
  
//  ハンバーガーボタン
//  ==ハンバーガーメニューをクリックすると中身が開く==
  $('.btn-hamburger').on('click', function(){
  $('.sp-nav').slideToggle(400);  
  $(this).toggleClass('active');
  $("body").toggleClass('fixed');
  });
 
  $('.main').on('click', function(){
  $('.child').slideToggle(400);
  });

  $('.main_01').on('click', function(){
  $('.child_01').slideToggle(400);
  });






//
//
//$('.btn-hamburger').on('click', function(){
//  $('.sp-nav').slideToggle(400);  
//  $(this).toggleClass('active');
//  $("body").toggleClass('fixed');
//  });
});