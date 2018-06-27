$(document).ready(function(){
  // リダイレクト
  if(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)){
    // sp
    window.location.href = "../HTML/spindex.html";
  }

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
});