$(document).ready(function(){
  
//  ハンバーガーボタン
//  ==ハンバーガーメニューをクリックすると中身が開く==
  $('.btn-hamburger').on('click', function(){
  $('.sp-nav').slideToggle(400);
  
  $(this).toggleClass('active');
  
  });
 

});