$(document).ready(function(){
  
//  �n���o�[�K�[�{�^��
//  ==�n���o�[�K�[���j���[���N���b�N����ƒ��g���J��==
  $('.btn-hamburger').on('click', function(){
  $('.sp-nav').slideToggle(400);  
  $(this).toggleClass('active');
  $("body").toggleClass('fixed');
  
  });
 
  $('.login_user_icon').on('click', function(){
  $('.login_nav').slideToggle(400);
  });


});