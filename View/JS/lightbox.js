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

////////////////////////////////////////////////////////////////////
$(document).on("click",".lightbox_hover",function(){
  $('.lightbox_view').fadeIn();
  $('body').addClass("overflow");

  var $image = $(this).prev('img');
  var $imageId = $image.attr('id');
  var $userId = $image.attr('value');
  var $imageWidth = $image.width();
  var $imageHeight = $image.height();

  var imageTitle;
  var creatorName;

  var $div;

  var param = {
		  0:$imageId,
		  1:$userId
  };
  console.log(param);
  var data = {'model':'images','action':'imageInfo','data':param};
  //ajax通信
  $.ajax({
	url:"../../Api/controller.php",
	dataType:'json',
	type:"POST",
	data:data
  //ajax通信成功時
  }).done(function(data){
	console.log(data);

	imageTitle = data[0]['usersData'][0]['imageTitle'];
	creatorName = data[0]['usersData'][0]['creatorName'];



	//画像詳細を表示////////////////////
	var $div = $('.lightbox_left_image');
	$div.empty();
	$div.append(
			$("<img class='view_image'>")
			.attr("src","../../User/"+ creatorName +"/"+ $imageId +".png")
	);
	var w,h;
	if($imageWidth >= $imageHeight){
		w = 500;
		h = (500 / $imageWidth) * $imageHeight;
	}else{
		w = (600 / $imageHeight) * $imageWidth;
		h = 600;
	}
	$('.view_image').css('width',w);
	$('.view_image').css('height',h);
	//ユーザーアイコン表示//////////////////
	$div = $('.user_icon');
	$div.empty();
	$div.append(
			$("<img class='view_icon'>")
			.attr("src","../../User/"+ creatorName +"/icon.png")
	);
	$('.view_icon').css('width',50);
	$('.view_icon').css('height',50);
	$('.view_icon').css('border-radius','50%');

	//作者名表示////////////////////////
	$div = $('.user_name');
	$div.empty();
	$div.append(
		("<h1>illustration by "+ creatorName +"</h1>")
	);


	//作品タイトル表示////////////////////////
	$div = $('.work_title');
	$div.empty();
	$div.append(
		("<h1>"+ imageTitle +"</h1>")
	);

	//コメント表示
	console.log(data[0]['commentData'].length);


  //ajax通信失敗時
  }).fail(function(XMLHttpRequest, textStatus, errorThrown){
	alert("error");
  });


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
