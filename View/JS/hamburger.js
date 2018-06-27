$(document).ready(function(){


  $('.btn-hamburger').on('click', function(){
  $('.sp-nav').slideToggle(400);
  $(this).toggleClass('active');
  $("body").toggleClass('fixed');
  });


  $('.main_01').on('click', function(){
  $('.child_01').slideToggle(400);
  });

 
  if(sessionStorage.getItem('userId') == null){
	  $('.before').css('display','block');
	  $('.after').css('display','none');
	  $('.user_data').css('display','none');
  }else{
	  $('.before').css('display','none');
	  $('.after').css('display','block');
	  $('.user_data').css('display','block');
  }


});