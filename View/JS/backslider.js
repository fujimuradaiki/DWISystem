$(document).ready(function(){
  
  if(!navigator.userAgent.match(/(iPhone|iPad|iPod|Android&Mobile)/)){

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
    
    location.href = 'spindex.html';

    
  }
});