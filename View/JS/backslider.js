$(document).ready(function(){
  
  if(!navigator.userAgent.match(/(iPhone|iPad|iPod|Android&Mobile)/)){
//  var ua1 = navigator.userAgent.indexOf('iPhone');
//  var ua2 = navigator.userAgent.indexOf('Mobile');
//  
//  alert('iPhone'+ua1+'Mobile'+ua2);
  
  //if(navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('Mobile') > 0){ 
    // PC slider
   $('.parallax-bg').bgSwitcher({
      images: [
      '../Images/background2.png',
      '../Images/background3.jpg',
      '../Images/02.png',
      '../Images/05.png',
      '../Images/06.png',
      '../Images/051.png'
      ]
    });
       
  } else {
//    alert('DDD');
     // SP slider
    $('.parallax-bg').bgSwitcher({
      images: [
      '../Images/sp0512.png',
      '../Images/sp04.png',
      '../Images/sp03.png',
      '../Images/sp02.png',
      '../Images/sp05.png',
      '../Images/sp06.png',
      '../Images/sp051.png'
      ]
    });
    
    alert($(".parallax-bg").prev("div").css("width"));
    $(".parallax-bg").prev("div").css("width","100%");
  }
});