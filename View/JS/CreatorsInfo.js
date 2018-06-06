/*
*************************************

*名前 : CreatorsInfo.js

*概要 : CreatorsInfoページのJavaScriptファイル

*作成日 : 2018/05/30

*作成者 : 藤村 大輝

*最終更新日 : 2018/05/30

*最終更新者 : 藤村 大輝

*************************************
*/



/*
///////////////////////////////////

 *関数名 ready

 *概要 コンストラクタ

//////////////////////////////////
*/
$(document).ready(function(){


	//制作者詳細に出すユーザーのID////
	//デバッグ用に仮指定中////////////
	//sessionStorage.setItem('infoId','1');
	//////////////////////////////////

	//ログイン中かどうかを取得
	if(sessionStorage.getItem('userId') == null){
		$('.login_btn').css("display","inline-block");
		$('.new_btn').css("display","inline-block");
		$('.login_user_icon').css("display","none");
	}else{
		$('.login_btn').css("display","none");
		$('.new_btn').css("display","none");
		$('.login_user_icon').css("display","block");

		var userId = sessionStorage.getItem('userId');
		var userName = sessionStorage.getItem('userName');
		console.log(userId,userName);

		$('.login_user_icon').empty();
		$('.login_user_icon').append(
				$("<img id='headerIcon'class='icon'>")
				.attr("src","../../User/"+ userName +"/icon.png")
		);
		var $headerIcon = $('#headerIcon');
		$headerIcon.css('width',50);
		$headerIcon.css('height',50);
		$headerIcon.css('border-radius','50%');

	}

	sessionStorage.removeItem('pageNum');
	sessionStorage.setItem('pageNum',1);

	var infoId = sessionStorage.getItem('infoId');
	var data = {'model':'users','action':'profile','data':infoId};

	//ajax通信
	$.ajax({
		url:"../../Api/controller.php",
		dataType:'json',
		type:"POST",
		data:data
	//ajax通信成功時
	}).done(function(data){

		console.log(data);

		var creatorId = data['userId'];
		var creatorName = data['userName'];

		runSearch(creatorId);

		$div = $('.creators_icon');
		$div.empty();
		$div.append(
				$("<img class='info_icon'>")
				.attr("src","../../User/"+ creatorName +"/icon.png")
		);

		$('.info_icon').css('width',400);
		$('.info_icon').css('height',400);

		$div = $('.name');
		$div.empty();
		$div.append(
				("<h1>" + creatorName +"</h1>")
		);

	//ajax通信失敗時
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert("error");
	});


});
//ログアウト処理//
$(document).on("click",".logout",function(){
	$('.login_user_menu').fadeToggle();
	sessionStorage.removeItem('userId');
	sessionStorage.removeItem('userName');

	//マイページと画像投稿ページの時は書く処理 ここから
		alert("トップページに戻ります。");
		window.location.href =  "Top.html";
	//ここまで

	//マイページと画像投稿ページ以外の時は書く処理 ここから
		$('.login_btn').css("display","inline-block");
		$('.new_btn').css("display","inline-block");
		$('.login_user_icon').css("display","none");
	//ここまで
});

/*
///////////////////////////////////

*関数名 runSearch

*概要 フォーム情報をPHPに渡して
      PHPから返ってきた情報をもとに
      画像表示

//////////////////////////////////
*/
function runSearch(infoId){

	var pageNum = sessionStorage.getItem('pageNum');

	var searchTitle = $('#searchErea').val();

	var param = {
			0:infoId,
			1:pageNum,
			2:searchTitle
	 	};

	var data = {'model':'users','action':'userInfo','data':param};
	console.log(data);

	var $div = $('.lightbox_waku');

	//表示中の画像を削除
	$div.empty();

	//ajax通信
	$.ajax({
		url:"../../Api/controller.php",
		dataType:'json',
		type:"POST",
		data:data
	//ajax通信成功時
	}).done(function(data){
		var imageData = data[0]['imageData'];
		var userData = data[0]['userData'][0];
		var recordCnt = parseInt(userData.imageTotalCount);
		var maxPage = parseInt(recordCnt);
	    maxPage = Math.ceil(maxPage / 12);

		console.log(imageData,userData,recordCnt,maxPage);

		var userName =  userData.userName;
		var userId = userData.userId;

		for(var i = 0;i < imageData.length;i++){

			var imageId = imageData[i].imageId;
			var imageTitle = imageData[i].imageTitle;


			//画像表示
			$div.append(
				("<div class='lightbox'id='"+ imageId + "Div'></div>")
			);
			var $num = $('#'+imageId+'Div');
			$num.append(

					$("<img id='"+imageId+"'class='images'value='"+userId+"'>")
					.attr("src","../../User/"+ userName +"/"+ imageId +".png"),

					("<div class='lightbox_hover'id='"+imageId+"Hover'></div>")
			);

			var $hover = $('#'+imageId+'Hover');
			$hover.append(
				("<div class='hover_background'></div>"),
				("<div class='lightbox_information'id='"+imageId+"Info'></div>")
			);

			var $info = $('#'+imageId+'Info');
			$info.append(
				("<div class='lightbox_title'><h1>"+ imageTitle +"</h1></div>")
			);

			var $icon = $('#'+imageId+'Icon');
			$icon.append(
					$("<img id='"+imageId+"IconImg'class='icon'>")
					.attr("src","../../User/"+ userName +"/icon.png")
			);
			var $iconImage = $('#'+imageId+'IconImg');
			$iconImage.css('width',30);
			$iconImage.css('height',30);
			$iconImage.css('border-radius','50%');


			//トリミング
			trimmingImage($("#" + imageId),113);
		}

		//float解除用div
		$div.append(
			("<div class='cle'></div>")
		);


		$('p.pageNum').text("Page : " + pageNum);

		if(pageNum == 1){
			$('.before_btn').css("display","none");
		}else{
			$('.before_btn').show();
		}
		if(pageNum == maxPage){
			$('.next_btn').hide();
		}else{
			$('.next_btn').show();
		}


	//ajax通信失敗時
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		// alert("作品なし");
		$('.next_btn').hide();
		$('.before_btn').css("display","none");
		$('.no_works').css("display","block");

	});
}


$(document).on("click",".before_btn",function(){
	var pageNum = sessionStorage.getItem('pageNum');
	sessionStorage.removeItem('pageNum');
	var pageNumInt =  parseInt(pageNum);
	var result = pageNumInt - 1;
	sessionStorage.setItem('pageNum',result);
	var infoId = sessionStorage.getItem('infoId');
	runSearch(infoId);
});


$(document).on("click",".next_btn",function(){
	var pageNum = sessionStorage.getItem('pageNum');
	sessionStorage.removeItem('pageNum');
	var pageNumInt =  parseInt(pageNum);
	var result = pageNumInt + 1;
	sessionStorage.setItem('pageNum',result);
	var infoId = sessionStorage.getItem('infoId');
	runSearch(infoId);
});

$(document).on("click","#searchButton",function(){
	var infoId = sessionStorage.getItem('infoId');
	runSearch(infoId);
});


/*
///////////////////////////////////

*関数名 trimmingImage

*概要 渡された画像をトリミングする

*引数 img  : 画像のHTML上での場所
size : トリミングするサイズ

//////////////////////////////////
*/
function trimmingImage(img,size){
	//トリミング処理
	var iw,ih;

	var w = img.width();	//横幅取得
	var h = img.height();	//縦幅取得

	//横幅と縦幅が同じか、横幅の方が長い場合
	if(w >= h){
		iw = (size / h * w - size) / 2;
		img.height(size);
		img.css("top",0);
		img.css("left","-" + iw + "px");
	}
	//縦幅の方が長い場合
	else{
		ih = (size / w * h - size) / 2;
		img.width(size);
		img.css("top","-" + ih + "px");
		img.css("left",0);
	}
}


/*
///////////////////////////////////

*関数 ログインフォームのログインボタン押下時

*概要 バリデーションを行い、問題なければログイン状態に

//////////////////////////////////
*/
$(document).on("click",".login_btn3",function(){

var text = $('.login_text').val();
var pass = $('.pass_text').val();
var param = [];
param[0] = text;
param[1] = pass;
var data = {'model':'users','action':'login','data':param};

//ajax通信
$.ajax({
url:"../../Api/controller.php",
dataType:'json',
type:"POST",
data:data
//ajax通信成功時
}).done(function(data){
alert(data['user_name']+"でログインしました");

//ユーザーidとユーザー名をストレージに保存
sessionStorage.setItem('userId',data['userId']);
sessionStorage.setItem('userName',data['user_name']);

//アイコンを表示
$('.login_btn').css("display","none");
$('.new_btn').css("display","none");
$('.login_user_icon').css("display","block");

$('.login_user_icon').empty();
$('.login_user_icon').append(
$("<img id='headerIcon'class='icon'>")
.attr("src","../../User/"+ data['user_name'] +"/icon.png")
);
var $headerIcon = $('#headerIcon');
$headerIcon.css('width',50);
$headerIcon.css('height',50);
$headerIcon.css('border-radius','50%');

$('.login_view').fadeOut();
$('body').removeClass("overflow");
//ajax通信失敗時
}).fail(function(XMLHttpRequest, textStatus, errorThrown){
alert(XMLHttpRequest['responseText']);
});
});


/*
///////////////////////////////////

*関数 新規登録フォームの確認ボタン押下時

*概要 バリデーションを行い、問題なければ新規登録

//////////////////////////////////
*/
$(document).on("click",".confirmation_btn",function(){

var name = $('#sineUp_user_name').val();
var mail = $('#sineUP_mail').val();
var pass1 = $('#sineUp_password1').val();
var pass2 = $('#sineUp_password2').val();

var errorFlag = 0;
var errorMsg = "入力内容に不備があります。\n\n";

//ユーザー名バリデーション
if(name == ""){
errorFlag = 1;
errorMsg = errorMsg + "・ユーザー名が未入力です。\n";
}else{
if(!name.match(/^[ァ-ロワヲンー一-龠a-zA-Z0-9\r\n\t]*$/)){
errorFlag = 1;
errorMsg = errorMsg + "・ユーザー名に記号やスペースは使えません。\n";
}
}

//メールアドレスバリデーション
if(mail == ""){
errorFlag = 1;
errorMsg = errorMsg + "・メールアドレスが未入力です。\n";
}else{
if(!mail.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)){
errorFlag = 1;
errorMsg = errorMsg + "・メールアドレスの形式が間違っています。\n";
}
}

//パスワードバリデーション
if(pass1 == "" || pass2 == ""){
errorFlag = 1;
errorMsg = errorMsg + "・パスワードが未入力です。\n";
}else{
if(pass1 == pass2){
if(!pass1.match(/^[a-zA-Z0-9]+$/)){
errorFlag = 1;
errorMsg = errorMsg + "・パスワードは半額英数字のみです。\n";
}
}else{
errorFlag = 1;
errorMsg = errorMsg + "・入力されたパスワードとパスワード再確認が一致しません。\n";
}
}

if(errorFlag == 1){
alert(errorMsg);
}else{
$('.new_confirmation_view').fadeIn();
$('body').addClass("overflow");
var name = $('#sineUp_user_name').val();
var mail = $('#sineUP_mail').val();
var pass1 = $('#sineUp_password1').val();
var pass2 = $('#sineUp_password2').val();
$('#user_name').val(name);
$('#mail').val(mail);
$('#password1').val(pass1);
}
});


$(document).on("click",".touroku_btn",function(){
	var name = $('#sineUp_user_name').val();
	var mail = $('#sineUP_mail').val();
	var pass1 = $('#sineUp_password1').val();
	var pass2 = $('#sineUp_password2').val();
	$("#new_form_waku").text

		var param = [];
		param[0] = name;
		param[1] = pass1;
		param[2] = mail;
		param[3] = $(".new_image").children('img').attr('src');
		var data = {'model':'users','action':'insert','data':param};
		console.log(data);
		//ajax通信
		$.ajax({
			url:"../../Api/controller.php",
			dataType:'json',
			type:"POST",
			data:data,
		//ajax通信成功時
		}).done(function(data){
			console.log(data);
			if(data != false){
			alert("新規登録が完了しました。");
			}else{
		    alert("登録名がすでに使用されています。");
			}
		//ajax通信失敗時
		}).fail(function(XMLHttpRequest, textStatus, errorThrown){
			alert("error");
		});
});


///////////////////////////////////////////////////////////////////////////////
$("#choice_btn").on("change",function(e){
	var file = e.target.files[0],
    reader = new FileReader(),
    $preview = $(".new_image");

    // pngファイル以外の場合は何もしない
    if(file.type.indexOf("png") < 0){
    	alert("png以外のファイルは利用できません。");
    	return false;
    }

    reader.onload = (function(file) {
    	return function(e) {
    		$preview.empty();
    		$preview.append($('<img>').attr({
    			src: e.target.result,
    			width: "200px",
    			class: "preview",
    			title: file.name,
    			name:"upload_file"
    		}));
    	};
    })(file);

    reader.readAsDataURL(file);
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

  var $imageTitle;
  var $creatorName;

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

	$imageTitle = data[0]['usersData'][0]['imageTitle'];
	$creatorName = data[0]['usersData'][0]['creatorName'];

	//5段階評価に使う星画像の場所を明示
	$.fn.raty.defaults.path = "../Lib/images";

	//画像詳細を表示////////////////////
	var $div = $('.lightbox_left_image');
	$div.empty();
	$div.append(
			$("<img class='view_image'>")
			.attr("src","../../User/"+ $creatorName +"/"+ $imageId +".png")
	);
	var w,h;
	if($imageWidth >= $imageHeight){
		w = 500;
		h = (500 / $imageWidth) * $imageHeight;
	}else{
		w = (600 / $imageHeight) * $imageWidth;
		h = 600;
	}
	$('.lightbox_left_image').css('background','transparent')
	$('.view_image').css('width',w);
	$('.view_image').css('height',h);
	//ユーザーアイコン表示//////////////////
	$div = $('.user_icon');
	$div.empty();
	$div.append(
			$("<img class='view_icon'>")
			.attr("src","../../User/"+ $creatorName +"/icon.png")
	);
	$('.view_icon').css('width',50);
	$('.view_icon').css('height',50);
	$('.view_icon').css('border-radius','50%');

	//作者名表示////////////////////////
	$div = $('.user_name');
	$div.empty();
	$div.append("{{creatorName}}");
	var drowCreatorName = new Vue({
		el : '.user_name',
		data :{
			creatorName : "illustration by "+ $creatorName
		}
	})


	//作品タイトル表示////////////////////////
	$div = $('.work_title');
	$div.empty();
	$div.append("{{imageTitle}}");
	$div.css("color","white");
	$div.css("fontSize","1.5rem")
	var drowImageTitle = new Vue({
		el : '.work_title',
		data :{
			imageTitle : $imageTitle
		}
	})

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
			hints: ['', '', '', '', ''],
			number : 5,
			score : data[0]['commentData'][i]['rank']
		});

		if( data[0]['commentData'][i]['userName'] == ""){
			$('#comment' + i).append(
				("<br>"),
				("<p1>(GestUser)</p1>"),
				("<br>"),
				("<p2>"+" "+data[0]['commentData'][i]['comment'] +"</p2>"),
				("<br><br><br>")
			);
		}else{
			$('#comment' + i).append(
				("<br>"),
				$("<img id='commenter_icon"+i+"'>")
					.attr("src","../../User/"+ data[0]['commentData'][i]['userName'] +"/icon.png"),
				("<p1>"+" "+ data[0]['commentData'][i]['userName'] +"</p1>"),
				("<br>"),
				("<p2>"+" "+data[0]['commentData'][i]['comment'] +"</p2>"),
				("<br><br><br>")
			);
			$('#commenter_icon'+i).css('width',20);
			$('#commenter_icon'+i).css('height',20);
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
		hints: ['', '', '', '', ''],
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
	var $commenterId = sessionStorage.getItem('userId');
	var $point = $('#hint').attr('value');
	var $comment = $('#'+ $imageId + 'ComentErea').val();

	String.prototype.bytes = function () {
	  return(encodeURIComponent(this).replace(/%../g,"x").length);
	}
	console.log("size = "+$comment.bytes());

	if($point == 0){
		alert("レビュー点数をつけてください。");
	}else if($comment.bytes() > 600){
		alert("投稿できるコメントのサイズは600byteまでです。\n文字数を減らしてください。\n" +
				"現在"+$comment.bytes()+"byteです。");
	}else{

		$comment = $comment.replace(/\r?\n/g, '<br />');
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
					hints: ['', '', '', '', ''],
					number : 5,
					score : data[i]['rank']
				});

				if( data[i]['userName'] == ""){
					$('#comment' + i).append(
						("<br>"),
						("<p1>(GestUser)</p1>"),
						("<br>"),
						("<p2>"+" "+data[i]['comment'] +"</p2>"),
						("<br><br><br>")
					);
				}else{
					$('#comment' + i).append(
						("<br>"),
						$("<img id='commenter_icon"+i+"'>")
							.attr("src","../../User/"+ data[i]['userName'] +"/icon.png"),
						("<p1>"+" "+ data[i]['userName'] +"</p1>"),
						("<br>"),
						("<p2>"+" "+data[i]['comment'] +"</p2>"),
						("<br><br><br>")
					);
					$('#commenter_icon'+i).css('width',20);
					$('#commenter_icon'+i).css('height',20);
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
				hints: ['', '', '', '', ''],
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
	}
});
