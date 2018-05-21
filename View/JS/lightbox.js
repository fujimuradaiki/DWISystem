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

	$.fn.raty.defaults.path = "../Lib/images";

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

	//レビューコメント表示/////////////////////
	$div = $('.past_coment');
	$div.empty();
	$div.append(
		("<div id='commentPreview' style='overflow: auto; width: 500px; height: 160px'></div>")
	);
	var sum = 0;
	for(var i = 0;i<data[0]['commentData'].length;i++){
		$('#commentPreview').append(
			("<div id ='comment"+ i +"'</div>")
		);
		$('#comment' + i).raty({
			readOnly : true,
			hints: ['1', '2', '3', '4', '5'],
			number : 5,
			score : data[0]['commentData'][i]['rank']
		});

		if( data[0]['commentData'][i]['userName'] == ""){
			$('#comment' + i).append(
				("<p1> GestUser</p1>"),
				("<p2>"+" "+data[0]['commentData'][i]['comment'] +"</p2>"),
				("<br>")
			);
		}else{
			$('#comment' + i).append(
				(" "),
				$("<img id='commenter_icon"+i+"'>")
					.attr("src","../../User/"+ data[0]['commentData'][i]['userName'] +"/icon.png"),
				("<p1>"+" "+ data[0]['commentData'][i]['userName'] +"</p1>"),
				("<p2>"+" "+data[0]['commentData'][i]['comment'] +"</p2>"),
				("<br>")
			);
			$('#commenter_icon'+i).css('width',15);
			$('#commenter_icon'+i).css('height',15);
			$('#commenter_icon'+i).css('border-radius','50%');
		}
		sum = parseInt(sum) +  parseInt(data[0]['commentData'][i]['rank']);
	}

	//レビュー合計表示/////////////////////////////
	$div = $('.review_all');
	$div.empty();
	$div.append(
		("<h1>レビュー合計 : "+ data[0]['commentData'].length +"件</h1>"),
		("<div id = 'averageReview'></div>")
	);
	$('#averageReview').raty({
		readOnly : true,
		number : 5,
		halfShow : true,
		score : (sum / data[0]['commentData'].length)
	});

	//レビューする部分を表示////////////////////////
	$div = $('.review');
	$div.empty();
	$div.append(
		("<h1>レビューをする</h1>"),
		("<div id = 'reviewErea'></div>"),
		("<input id = 'hint'type='hidden'value = '0' readonly>")
	);
	$('#reviewErea').raty({
		number : 5,
		hints: ['1', '2', '3', '4', '5'],
		targetScore : '#hint'
	});
	$div = $('.review_coment');
	$div.empty();
	$div.append(
		("<h1>コメントをする</h1>"),
		("<textarea name='comment'id='"+$imageId+"ComentErea' cols='40' rows='8'></textarea>"),
		("<button class='review_btn' id='"+$imageId+"' value='"+$userId+"'>レビュー</button>")
	);



  //ajax通信失敗時
  }).fail(function(XMLHttpRequest, textStatus, errorThrown){
	alert("error");
  });


});


//レビューボタン押下時//////////////////////////////////////////////////////////
$(document).on("click",".review_btn",function(){
	var $imageId = $(this).attr('id');
	var $createrId = $(this).attr('value');
	var $commenterId = 1;	//コメントした人物(現在ログイン中のユーザー)のIDを取得せよ
	var $point = $('#hint').attr('value');
	var $comment = $('#'+ $imageId + 'ComentErea').val();

	var param = {
			  0:$imageId,
			  1:$createrId,
			  2:$commenterId,
			  3:$point,
			  4:$comment
	  };
	var data = {'model':'images','action':'insertReview','data':param};
	  //ajax通信
	  $.ajax({
		url:"../../Api/controller.php",
		dataType:'json',
		type:"POST",
		data:data
	  //ajax通信成功時
	  }).done(function(data){
		  console.log(data);

		  var $div;
		//レビューコメント表示/////////////////////
			$div = $('.past_coment');
			$div.empty();
			$div.append(
				("<div id='commentPreview' style='overflow: auto; width: 500px; height: 160px'></div>")
			);
			var sum = 0;
			for(var i = 0;i<data.length;i++){
				$('#commentPreview').append(
					("<div id ='comment"+ i +"'</div>")
				);
				$('#comment' + i).raty({
					readOnly : true,
					hints: ['1', '2', '3', '4', '5'],
					number : 5,
					score : data[i]['rank']
				});

				if( data[i]['userName'] == ""){
					$('#comment' + i).append(
						("<p1> GestUser</p1>"),
						("<p2>"+" "+data[i]['comment'] +"</p2>"),
						("<br>")
					);
				}else{
					$('#comment' + i).append(
						(" "),
						$("<img id='commenter_icon"+i+"'>")
							.attr("src","../../User/"+ data[i]['userName'] +"/icon.png"),
						("<p1>"+" "+ data[i]['userName'] +"</p1>"),
						("<p2>"+" "+data[i]['comment'] +"</p2>"),
						("<br>")
					);
					$('#commenter_icon'+i).css('width',15);
					$('#commenter_icon'+i).css('height',15);
					$('#commenter_icon'+i).css('border-radius','50%');
				}
				sum = parseInt(sum) +  parseInt(data[i]['rank']);
			}

			//レビュー合計表示/////////////////////////////
			$div = $('.review_all');
			$div.empty();
			$div.append(
				("<h1>レビュー合計 : "+ data.length +"件</h1>"),
				("<div id = 'averageReview'></div>")
			);
			$('#averageReview').raty({
				readOnly : true,
				number : 5,
				halfShow : true,
				score : (sum / data.length)
			});

			//レビューする部分を表示////////////////////////
			$div = $('.review');
			$div.empty();
			$div.append(
				("<h1>レビューをする</h1>"),
				("<div id = 'reviewErea'></div>"),
				("<input id = 'hint'type='hidden'value = '0' readonly>")
			);
			$('#reviewErea').raty({
				number : 5,
				hints: ['1', '2', '3', '4', '5'],
				targetScore : '#hint'
			});
			$div = $('.review_coment');
			$div.empty();
			$div.append(
				("<h1>コメントをする</h1>"),
				("<textarea name='comment'id='"+$imageId+"ComentErea' cols='40' rows='8'></textarea>"),
				("<button class='review_btn' id='"+$imageId+"' value='"+$createrId+"'>レビュー</button>")
			);

	  //ajax通信失敗時
	  }).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert("error");
	  });
});



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
