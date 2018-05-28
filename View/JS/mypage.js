/*
*************************************

*名前 : mypage.js

*概要 : mypageのJavaScriptファイル

*作成日 : 2018/05/24

*作成者 : 藤村 大輝

*最終更新日 : 2018/05/24

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


	/*Debug用・仮でユーザーID、名を指定中//////////////
	sessionStorage.clear();////////////////////////
	sessionStorage.setItem('userId','7');//////////
	sessionStorage.setItem('userName','i');//*
	/////////////////////////////////////////////////*/

	//ログイン中のユーザーIDとユーザー名を取得
	//取得できなかった場合、トップページに遷移
	var userId = sessionStorage.getItem('userId');
	var userName = sessionStorage.getItem('userName');
	console.log(userId,userName);
	if(userId == null || userName == null){
		alert("ログイン状態ではありません。\nトップページに戻ります。")
		window.location.href =  "Top.html";
	}

	//ログインボタンと新規登録ボタンを消し、アイコンを表示
	$('.login_btn').css("display","none");
	$('.new_btn').css("display","none");
	$('.login_user_icon').css("display","block");

	$('.login_user_icon').empty();
	$('.login_user_icon').append(
			$("<img id='headerIcon'class='icon'>")
			.attr("src","../../User/"+ userName +"/icon.png")
	);
	var $headerIcon = $('#headerIcon');
	$headerIcon.css('width',50);
	$headerIcon.css('height',50);
	$headerIcon.css('border-radius','50%');

	$('.mypage_icon').empty();
	$('.mypage_icon').append(
			$("<img id='mypageIcon'class='icon'>")
			.attr("src","../../User/"+ userName +"/icon.png")
	);
	var $mypageIcon = $('#mypageIcon');
	$mypageIcon.css('width',130);
	$mypageIcon.css('height',130);

	var $mypageName = $('.mypage_name');
	$mypageName.empty();
	$mypageName.append(
		("<h1>"+ userName +"</h1>")
	);

	//作品一覧を表示
	runSearch();

});


/*
///////////////////////////////////

*関数 編集画面のプロフィール編集押下時

*概要 現在の情報の表示

//////////////////////////////////
*/
$(document).on("click",".Editing_btn",function(){
	//ajax通信で登録されている内容をテキストボックスに表示する

	 var userId = sessionStorage.getItem('userId');
	 var data = {'model':'users','action':'profile','data':userId};

	 //ajax通信
	$.ajax({
		url:"../../Api/controller.php",
		dataType:'json',
		type:"POST",
		data:data
	//ajax通信成功時
	}).done(function(data){
console.log("userInfo = ");
console.log(data);
		//テキストボックスに送られてきたデータを投げる
		$('#sineIn_user_name').val(data['userName']);
		$('#sineIn_mail').val(data['userMail']);

		$('.Editing_image').empty();
		$('.Editing_image').append(
				$("<img id='editingIcon'class='icon'>")
				.attr("src","../../User/"+ data['userName'] +"/icon.png")
		);

	//ajax通信失敗時
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert("error");
	});
});


/*
///////////////////////////////////

*関数 編集画面の保存ボタン押下時

*概要

//////////////////////////////////
*/
$(document).on("click",".storage_btn",function(){

	var user_id = sessionStorage.getItem('userId');
	var name = $('#sineIn_user_name').val();
	var mail = $('#sineIn_mail').val();
	var pass_old = $('#sineIn_pass_old').val();
	var pass_new = $('#sineIn_pass_new').val();

	var errorFlag = 0;
	var errorMsg = "入力内容に不備があります。\n\n";

	var obj = document.getElementById("editingIcon");
	var bace64 = imageToBase64(obj, 'image/png',obj.naturalWidth,obj.naturalHeight);

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

	//旧パスワードバリデーション
	if(pass_old == ""){
		errorFlag = 1;
		errorMsg = errorMsg + "・旧パスワードが未入力です。\n";
	}

	//新パスワードバリデーション
	if(pass_new == ""){
		errorFlag = 1;
		errorMsg = errorMsg + "・新パスワードが未入力です。\n";
	}else{
		if(!pass_new.match(/^[a-zA-Z0-9]+$/)){
			errorFlag = 1;
			errorMsg = errorMsg + "・パスワードは半額英数字のみです。\n";
		}
	}

	if(errorFlag == 1){
		alert(errorMsg);
	}else{
		//ajax通信で入力されている情報をPHPに渡す

		 var param = [];
		param[0] = user_id;
		param[1] = name;
		param[2] = pass_old;
		param[3] = pass_new;
		param[4] = mail;
		param[5] = bace64;
		param[6] = sessionStorage.getItem('userName');
		 var data = {'model':'users','action':'update','data':param};
		 console.log(data);
		 //ajax通信
			$.ajax({
				url:"../../Api/controller.php",
				dataType:'json',
				type:"POST",
				data:data
			//ajax通信成功時
			}).done(function(data){


				console.log(data);
				$('.Editing_view,.lightbox_view').fadeOut();
				  $('body').removeClass("overflow");

					$('.storage_view').fadeIn();
					$('body').addClass("overflow");

			//ajax通信失敗時
			}).fail(function(XMLHttpRequest, textStatus, errorThrown){
				alert("error : \n" + XMLHttpRequest['responseText']);
			});

	}
});


/*
///////////////////////////////////

*関数 runSearch

*概要 投稿作品を一覧表示

//////////////////////////////////
*/
function runSearch(){

	var userId = sessionStorage.getItem('userId');
	userId = 1;
	var userName = sessionStorage.getItem('userName');
	userName = "TestUser";
	var data = {'model':'images','action':'creatorWorksList','data':userId};

console.log(data);
	//ajax通信
	$.ajax({
		url:"../../Api/controller.php",
		dataType:'json',
		type:"POST",
		data:data
	//ajax通信成功時
	}).done(function(data){

		console.log(data);

		var $div = $('.lightbox_waku');
		//表示中の画像を削除
		$div.empty();

		for(var i = 0;i < data.length;i++){

			var imageId = data[i].imageId;
			var categoryName = data[i].categoryName;
			var title = data[i].imageTitle;

			//画像表示
			$div.append(
				("<div class='lightbox'id='"+ imageId + "Div'></div>")
			);
			var $num = $('#'+imageId+'Div');
			$num.append(

					$("<img id='"+imageId+"'class='images'value='"+categoryName+"'>")
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
				("<div class='lightbox_title'><h1>"+ title +"</h1></div>"),
				("<div class='lightbox_user_waku'id='"+imageId+"Waku'>")
			);

			var $waku = $('#'+imageId+'Waku');
			$waku.append(
				("<div class='lightbox_user_icon'id='"+ imageId +"Icon'></div>"),
				("<div class='lightbox_user_name'><h1>illustration by "+ userName +"</h1></div>")
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
			trimmingImage($("#" + imageId),250);
		}

		//float解除用div
		$div.append(
			("<div class='cle'></div>")
		);

	//ajax通信失敗時
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert("error");
	});
};


/*
///////////////////////////////////

*関数 アイコン編集ボタン押下時

*概要 画像を判定し、pngならプレビューに表示

//////////////////////////////////
*/
$(".choice_btn").on("change",function(e){
	var file = e.target.files[0],
    reader = new FileReader(),
    $preview = $(".Editing_image");

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
    			id : "editingIcon",
    			title: file.name,
    			name:"upload_file"
    		}));
    	};
    })(file);
sessionStorage.setItem('iconImage',e.target.value);
console.log(sessionStorage.getItem('iconImage'));

    reader.readAsDataURL(file);
});

/*
///////////////////////////////////

*関数 画像エンコーダー

*概要 送信する画像をオリジナルサイズでエンコード

//////////////////////////////////
*/
var imageToBase64 = function(imgElement, mimeType,naturalWidth,naturalHeight) {
    var canvas       = document.createElement('canvas'),
        context      = canvas.getContext('2d'),
        base64String = '';

    if (!imgElement || typeof mimeType !== 'string') return '';

    mimeType = mimeType.replace(/\/png$/, '/octet-stream');

    canvas.width  = naturalWidth;
    canvas.height = naturalHeight;

    context.drawImage(imgElement, 0, 0);

    base64String = canvas.toDataURL(mimeType);

    return base64String;
};


////////////////////////////////////////////////////////////////////
$(document).on("click",".lightbox_hover",function(){
  $('.lightbox_view').fadeIn();
  $('body').addClass("overflow");

  var $image = $(this).prev('img');
  var userId = sessionStorage.getItem('userId');
  userId = 1;
  var userName = sessionStorage.getItem('userName');
  userName = "TestUser";
  var $imageId = $image.attr('id');
  var $categoryName = $image.attr('value');
  var $imageWidth = $image.width();
  var $imageHeight = $image.height();

  var $imageTitle;

  var $div;

  var param = {
		  0:$imageId,
		  1:userId
  };
  console.log($categoryName);
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

	//画像詳細を表示////////////////////
	var $div = $('.lightbox_left_image');
	$div.empty();
	$div.append(
			$("<img class='view_image'>")
			.attr("src","../../User/"+ userName +"/"+ $imageId +".png")
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

	$('.title_box').val($imageTitle);

	$('#Genre').val($categoryName);

  //ajax通信失敗時
  }).fail(function(XMLHttpRequest, textStatus, errorThrown){
	alert("error");
  });
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

*関数 画像編集の保存ボタン押下時

*概要 編集された内容を送信する

//////////////////////////////////
*/
$(document).on("click",".storage_btn2",function(){
	alert("hit");

});


