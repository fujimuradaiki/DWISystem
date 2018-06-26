/*
*************************************

*名前 : mypage.js

*概要 : mypageのJavaScriptファイル

*作成日 : 2018/05/24

*作成者 : 藤村 大輝

*最終更新日 : 2018/05/29

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

	$('.Editing').click(function(){
		$('.Editing_view').fadeIn();
		$('body').addClass("overflow");
	});

	$('.myNEW_btn').css("background-color","rgb(46, 204, 250)");

	/*Debug用・仮でユーザーID、名を指定中//////////////
	sessionStorage.clear();////////////////////////
	sessionStorage.setItem('userId','7');//////////
	sessionStorage.setItem('userName','i');//*
	/////////////////////////////////////////////////*/

	//ログイン中のユーザーIDとユーザー名を取得
	//取得できなかった場合、トップページに遷移
	var userId = sessionStorage.getItem('userId');
	//var userName = sessionStorage.getItem('userName');  // アカウント名

	//console.log(userId,userName);
	if(userId == null || sessionStorage.getItem('privateUserName') == null){
		alert("ログイン状態ではありません。\nトップページに戻ります。")
		window.location.href =  "Top.html";
	}

	//ログインボタンと新規登録ボタンを消し、アイコンを表示
	$('.login_btn').css("display","none");
	$('.new_btn').css("display","none");
	$('.login_user_icon').css("display","block");

	$('.login_user_icon').empty();

	var $headerIcon = $('#headerIcon');
	$headerIcon.css('width',50);
	$headerIcon.css('height',50);
	$headerIcon.css('border-radius','50%');

	$('.mypage_icon').empty();

	var $mypageIcon = $('#mypageIcon');
	$mypageIcon.css('width',130);
	$mypageIcon.css('height',130);

	var $mypageName = $('.mypage_name');
	$mypageName.empty();


	var data = {'model':'users', 'action':'profile', 'data':userId };

	$.ajax({
		url:"../../Api/controller.php",
		dataType:'json',
		type:"POST",
		data:data,
		timeout:1000
	}).done(function(data){
		console.log(data);
		var text = data.introduction;
		if(text == null)
			text = "";

		$('.my_introduction').append($('<pre id="intro">'+text+'</pre>'));
		sessionStorage.setItem('privateUserName',data['user']);    // 非公開名(ユーザ名)※古いものになる
		$('#sineIn_user_name').val(sessionStorage.getItem('privateUserName'));
		$('#sineIn_mail').val(data['userMail']);

		$('.login_user_icon').append(
				$("<img id='headerIcon'class='icon'>")
				.attr({"src":"../../User/"+ data.userName +"/icon.png", "width":"50", "height":"50"})
		);

		$('.mypage_icon').append(
				$("<img id='mypageIcon'class='icon'>")
				.attr({"src":"../../User/"+ data.userName +"/icon.png", "width":"130", "height":"130"})
		);
		$mypageName.append(
				("<h1>"+ data.userName +"</h1>")
			);
		//sessionStorage.setItem('userMail',data['userMail']);       // メールアドレス
		//var text = "";
		//$('my_introduction').append($('<pre id="intro">'+text+'</pre>'));  // 自己紹介
	//ajax通信失敗時
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert("error");
	});


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
	 var userName = sessionStorage.getItem('userName');

	//$('.mypage_icon').empty();
	//$('.mypage_icon').append($('<img>').attr("src","../../User/"+ userName +"/icon.png"));
	$('.mypage_name').empty();
	$('.mypage_name').append($('<input type="text" id="editname" value="'+userName+'">'));
	$('.my_introduction').append($('<textarea id="introbox"></textarea>').val(document.getElementById('intro').innerHTML));
	$('#intro').remove();
});

$(".choice_btn").on("change",function(e){
	var file = e.target.files[0],
    reader = new FileReader(),
    $preview = $(".mypage_icon");
    // pngファイル以外の場合は何もしない
    if(file.type.indexOf("image") < 0 || file.size > 5500000){
    	alert("画像以外のファイルは利用できません。");
    	$(".choice_btn").val("");
    	return false;
    }
    reader.onload = (function(file) {
    	return function(e) {
    		$preview.empty();
    		$preview.append($('<img>').attr({
    			src: e.target.result,
    			width: "130px",
    			height: "130px",
    			class: "icon",
    			title: file.name,
    			id: "iconimg",
    			name:"upload_file"
    		}));
    	};
    })(file);

    reader.readAsDataURL(file);
});

//トリミング開始ボタン
$('.trimming_btn').on('click', function(){
    /*var imageId = $('#iconimg').attr('src');
	if(imageC != 'preview'){
		imageId('No');
		return;
	}*/

	//alert("aaa");
	$('.trimming_view').css("display","block").fadeIn();
	$('body').addClass("overflow");
	$('.trimming_image').append($('<img>').attr({'src':$('#iconimg').attr('src'), 'id':'trimming_img'}));
	var image = $('.trimming_image > img'),replaced;
    $('#trimming_img').cropper({
    	aspectRatio: 4 / 4
    });

});

//トリミング確定ボタン(一番左の画像)
$('.trimming_view_btn').on('click', function(){

	var imageinfo = new Image();
	imageinfo.src = $('#trimming_img').attr('src');
	var data = $('#trimming_img').cropper('getData');

	// width・・・トリミングしたときの横幅
	// height・・・トリミングしたときの縦幅
	// x・・・トリミングする際の一番左上のX座標
	// y・・・トリミングする際の一番左上のY座標
	var image = {
		width  : Math.round(data.width),
		height : Math.round(data.height),
		x      : Math.round(data.x),
		y      : Math.round(data.y),
	};

	$('.mypage_icon').append($('<canvas></canvas>').attr({"id":"canvasimg1"}));
	this.canvas = document.getElementById('canvasimg1').getContext('2d');
	var canvas = document.getElementById('canvasimg1');
	canvas.width = 200;
	canvas.height = 200;
	this.canvas.drawImage(imageinfo, image.x, image.y, image.width, image.height, 0, 0, 130, 130);

	var dataURI = canvas.toDataURL();
	$('#trimming_view_img').remove();
	$('#trimming_img').remove();
	$('.trimming_image').empty();
	$('.mypage_icon').append($('<img>').attr({'src':dataURI, 'title':$('#iconimg').attr('title'), 'class':'icon', 'name':'trimming_file', 'id':'trimming_view_img'}));
	$('#canvasimg1').remove();
	var $mypageIcon = $('#iconimg');
	$mypageIcon.css('width',130);
	$mypageIcon.css('height',130);
	//$('#iconimg').remove();
	document.getElementById('iconimg').style.display = "none";

	$('.trimming_view').fadeOut();
});


// 公開領域送信
$(document).on("click",".send",function(){

	 var userId = sessionStorage.getItem('userId');
	 var userName = sessionStorage.getItem('userName');
	 var introduction = document.getElementById('introbox').value;

	 var trimming_view_img = $('#trimming_view_img').attr('src');
		if(trimming_view_img === undefined)
			trimming_view_img = "";

	 var data = [ userId, userName, $('#editname').val(),introduction, trimming_view_img ];

	 var param = new FormData($('[name="send"]').get(0));
	 param.append('model', 'users');
	 param.append('action', 'update');
	 param.append('data', data);

	//ajax通信
	$.ajax({
		url:"../../Api/controller.php",
		dataType:'json',
		type:"POST",
		processData : false,
	    contentType : false,
		data:param,
		timeout:1000
	//ajax通信成功時
	}).done(function(data){
		console.log(JSON.stringify(data));
		//テキストボックスに送られてきたデータを投げる
		/*$('#sineIn_user_name').val(data['userName']);
		$('#sineIn_mail').val(data['userMail']);

		$('.Editing_image').empty();
		$('.Editing_image').append(
				$("<img id='editingIcon'class='icon'>")
				.attr("src","../../User/"+ data['userName'] +"/icon.png")
		);*/

	//ajax通信失敗時
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert("error");
	});

});

/*$(document).on("click",".Editing_btn",function(){
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
});*/


/*
///////////////////////////////////

*関数 編集画面の保存ボタン押下時

*概要  pass_old = 新しいパスワード
      Pass_new = 確認パスワード

//////////////////////////////////
*/
$(document).on("click",".storage_btn",function(){
	if($pass = window.prompt('パスワードを入力してください')){
		var user_id = sessionStorage.getItem('userId');
		var name = $('#sineIn_user_name').val();      // 新しい非公開名(ユーザ名)
		var mail = $('#sineIn_mail').val();
		var pass_new = $('#sineIn_pass_old').val();   // 1回目パスワード
		var passAgain = $('#sineIn_pass_new').val();  // 2回目パスワード

		var errorFlag = 0;
		var errorMsg = "入力内容に不備があります。\n\n";

		//var obj = document.getElementById("editingIcon");
		//var bace64 = imageToBase64(obj, 'image/png',obj.naturalWidth,obj.naturalHeight);
		//ユーザー名バリデーション
		if(name == "pass_old"){
			errorFlag = 1;
			errorMsg = errorMsg + "・ユーザー名が未入力です。\n";
		}else{
			if(!name.match(/^[ぁ-んー　ァ-ロワヲンー一-龠a-zA-Z0-9\r\n\t]*$/)){
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
		if(pass_new == ""){
			pass_new = $pass;
		}else{
			if(!pass_new.match(/^[a-zA-Z0-9]+$/)){
			 		errorFlag = 1;
			 		errorMsg = errorMsg + "・パスワードは半額英数字のみです。\n";
		}


		if(pass_new != passAgain){
			errorFlag = 1;
			errorMsg = errorMsg + "・確認パスワードが一致しません。\n";
		}
	}

		if(errorFlag == 1){
			alert(errorMsg);
		}else{
			//ajax通信で入力されている情報をPHPに渡す

			var param = [];
			param[0] = user_id;
			param[1] = sessionStorage.getItem('privateUserName');  // 古い非公開名
			param[2] = name;     // 新しい非公開名
			param[3] = mail;     // 古いパスワード
			param[4] = $pass;    // 古いパスワード
			param[5] = pass_new; // 新しいパスワード

			 var data = {'model':'users','action':'userUpdate','data':param};
			 console.log(data);
			 //alert(param);
			 //ajax通信
				$.ajax({
					url:"../../Api/controller.php",
					dataType:'json',
					type:"POST",
					data:data
				//ajax通信成功時
				}).done(function(data){

					//alert(data);
					if(data == "true"){
					$('.Editing_view,.lightbox_view').fadeOut();
					  $('body').removeClass("overflow");

						$('.storage_view').fadeIn();
						$('body').addClass("overflow");
						sessionStorage.removeItem('userId');
						sessionStorage.removeItem('privateUserName');
						sessionStorage.setItem('userId', user_id);
						sessionStorage.setItem('privateUserName', name)
						runSearch();
					}else{
						alert(data);
					}
				//ajax通信失敗時
				}).fail(function(XMLHttpRequest, textStatus, errorThrown){
					//
					alert("error : \n" + XMLHttpRequest['responseText']);
				});
		}
	}else{
			window.alert('キャンセルされました'); // 警告ダイアログを表示
	}
});

/*
///////////////////////////////////

*関数 ソートボタン(新しい順)押下時

*概要 ソートボタンの色変更

//////////////////////////////////
*/
$('.myNEW_btn').on("click",function(){
	if($(this).css("background-color") == "rgb(63, 58, 206)"){
		$(this).css("background-color","rgb(46, 204, 250)");
		$('.myOLD_btn').css("background-color","rgb(63, 58, 206)");
		$('.myPOPULARTY_btn').css("background-color","rgb(63, 58, 206)");

		runSearch();
	}
});

/*
///////////////////////////////////

*関数 ソートボタン(古い順)押下時

*概要 ソートボタンの色変更

//////////////////////////////////
*/
$('.myOLD_btn').on("click",function(){
	if($(this).css("background-color") == "rgb(63, 58, 206)"){
		$(this).css("background-color","rgb(46, 204, 250)");
		 $('.myNEW_btn').css("background-color","rgb(63, 58, 206)");
		 $('.myPOPULARTY_btn').css("background-color","rgb(63, 58, 206)");
		runSearch();
	}
});
/*
///////////////////////////////////

*関数 ソートボタン(人気順)押下時

*概要 ソートボタンの色変更

//////////////////////////////////
*/
$('.myPOPULARTY_btn').on("click",function(){
	if($(this).css("background-color") == "rgb(63, 58, 206)"){
		$(this).css("background-color","rgb(46, 204, 250)");
		$('.myNEW_btn').css("background-color","rgb(63, 58, 206)");
		$('.myOLD_btn').css("background-color","rgb(63, 58, 206)");

		runSearch();
	}
});

/*
///////////////////////////////////

*関数 フィルタチェックボックス(全て)押下時

*概要 フィルタチェックボックスの状態変更

//////////////////////////////////
*/
$('#myall').on("click",function(){

	if($("#myall").prop("checked")){
		$("#mychara").prop("checked",true);
		$("#mybackGround").prop("checked",true);
		$("#myitem").prop("checked",true);
	}else{
		$("#mychara").prop("checked",false);
		$("#mybackGround").prop("checked",false);
		$("#myitem").prop("checked",false);
	}

	runSearch();
});


/*
///////////////////////////////////

*関数 フィルタチェックボックス(キャラクター)押下時

*概要 フィルタチェックボックスの状態変更

//////////////////////////////////
*/
$('#mychara').on("click",function(){
	$("#myall").prop("checked",false);
	if($("#mychara").prop("checked") &&
	  $("#mybackGround").prop("checked") &&
	  $("#myitem").prop("checked")){
		$("#myall").prop("checked",true);
	}

	runSearch();
});


/*
///////////////////////////////////

*関数 フィルタチェックボックス(背景)押下時

*概要 フィルタチェックボックスの状態変更

//////////////////////////////////
*/
$('#mybackGround').on("click",function(){
	$("#myall").prop("checked",false);
	if($("#mychara").prop("checked") &&
	  $("#mybackGround").prop("checked") &&
	  $("#myitem").prop("checked")){
		$("#myall").prop("checked",true);
	}

	runSearch();
});


/*
///////////////////////////////////

*関数 フィルタチェックボックス(アイテム)押下時

*概要 フィルタチェックボックスの状態変更

//////////////////////////////////
*/
$('#myitem').on("click",function(){
	$("#myall").prop("checked",false);
	if($("#mychara").prop("checked") &&
	  $("#mybackGround").prop("checked") &&
	  $("#myitem").prop("checked")){
		$("#myall").prop("checked",true);
	}

	runSearch();
});

/*
///////////////////////////////////

*関数 runSearch

*概要 投稿作品を一覧表示

//////////////////////////////////
*/

function runSearch(){
	var userId = sessionStorage.getItem('userId');
	var userName = sessionStorage.getItem('userName');

	var datas = [];
	datas[0] = getForm();
	datas[1] = userId;

	var data = {'model':'images','action':'mypageWorksList','data':datas};

	/*デバッグ用表示//////
	*/console.log(data);/*
	////////////////////*/

	//ajax通信
	$.ajax({
		url:"../../Api/controller.php",
		dataType:'json',
		type:"POST",
		data:data
	//ajax通信成功時
	}).done(function(data){

		var $div = $('.lightbox_waku');

		//表示中の画像を削除
		$div.empty();

		console.log(data);
		for(var i = 0;i < data.length;i++){

			var userName = data[i].UserName;
			var userId = data[i].userId;
			var imageId = data[i].Id;
			var categoryName = data[i].categoryName;
			var title = data[i].Title;
			var insert_at = data[i].Insert_at;
			var $dispimge = data[i].fileType;


			//画像表示
			$div.append(
				("<div class='lightbox'id='"+ imageId + "Div'></div>")
			);
			var $num = $('#'+imageId+'Div');
			$num.append(

					$("<img id='"+imageId+"'class='images'value='"+userId+"'>")
					.attr("src","../../User/"+ userName +"/"+ $dispimge),

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

 function getForm(){

 	var sortType;
 	if($('.myNEW_btn').css("background-color") == "rgb(46, 204, 250)"){
 		sortType = 'insert_at:DESC';
 	}else{
 		if($('.myOLD_btn').css("background-color") == "rgb(46, 204, 250)"){
 			sortType = "insert_at:ASC";
 		}else{
 			if($('.myPOPULARTY_btn').css("background-color") == "rgb(46, 204, 250)"){
 				sortType = "rank:DESC";
 			}
 		}
 	}

 	var $category1 = $("#mychara").prop("checked");
 	var $category2 = $("#mybackGround").prop("checked");				  //チェックの状態を取得し、True or falseを入れる
 	var $category3 = $("#myitem").prop("checked");

 	//取得したフォーム情報を連想配列に格納
 	var param = {
 		0:{name:'sortType',value:sortType},
 		1:{category1:{name:'charactor',value:$category1},
 		   category2:{name:'backGround',value:$category2},
 		   category3:{name:'item',value:$category3}

 		}
 	};

 	return param;
 }

/*
///////////////////////////////////

*関数 アイコン編集ボタン押下時

*概要 画像を判定し、pngならプレビューに表示

//////////////////////////////////
*/
$("#choice_btn").on("change",function(e){
	var file = e.target.files[0],
    reader = new FileReader(),
    $preview = $(".Editing_image");

    // pngファイル以外の場合は何もしない
    if(file.type.indexOf("png") < 0 || file.size > 5500000){
    	alert("png以外のファイル または5MBを超えるファイルは利用できません");
    	$("#choice_btn3").val("");
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
  var userName = sessionStorage.getItem('userName');
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

  var data = {'model':'images','action':'imageInfo','data':param};
    //ajax通信
  $.ajax({
	url:"../../Api/controller.php",
	dataType:'json',
	type:"POST",
	data:data
  //ajax通信成功時
  }).done(function(data){
	$imageTitle = data[0]['usersData'][0]['imageTitle'];
	$dispimge = data[0]['usersData'][0]['fileType'];
	alert(data[0]['usersData'][0]['fileType']);

	//画像詳細を表示////////////////////
	var $div = $('.lightbox_left_image');
	$div.empty();
	$div.append(
			$("<img class='view_image'id='"+ $imageId +"'>")
			.attr("src","../../User/"+ userName +"/"+ $dispimge)
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

	$('#Genre').val(data[0]['usersData'][0]['categoryName']);
	$('.work_infoarea').val(data[0]['usersData'][0]['imageSummary']);

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
runSearch();
	var $imageId = $('.view_image').attr('id');
	var categoryId;
	var userId = sessionStorage.getItem('userId');
	var $title = $('.title_box').val();
	var userName = sessionStorage.getItem('userName');

	var errorFlag = 0;
	var errorMsg = "";

	switch ($('#Genre').val()){
	case "キャラクター":
		categoryId = "1";break;
	case "背景":
		categoryId = "2";break;
	case "アイテム":
		categoryId = "3";break;
	default:
		errorFlag = 1;
		errorMsg = errorMsg + "・ジャンルを選択してください。\n";
		break;
	}

	if($title == ""){
		errorFlag = 1;
		errorMsg = errorMsg + "・タイトルが未入力です。\n";
	}else{
		if(!name.match(/^[ァ-ロワヲンー一-龠a-zA-Z0-9 　\r\n\t]*$/)){
			errorFlag = 1;
			errorMsg = errorMsg + "・タイトルに記号やスペースは使えません。\n";
		}
	}

	if(errorFlag != 0){

		alert(errorMsg);

	}else{
		var param = {
			0:$imageId,
			1:categoryId,
			2:userId,
			3:$title,
			4:userName
	 	};
		console.log(param);

		var data = {'model':'images','action':'update','data':param};
    	//ajax通信
		$.ajax({
			url:"../../Api/controller.php",
			dataType:'json',
			type:"POST",
			data:data
		//ajax通信成功時
    	}).done(function(data){
    		alert(data);
    		runSearch();


    	//ajax通信失敗時
    	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
    		alert("error");
    	});
	}
	runSearch();

});

$(document).on("click",".close_btn",function(){
	runSearch();
});
///////////////////////////////////////////////////////////////////
///プロフィール削除
$(document).on("click",".Completion_btn",function(){
	// 「OK」時の処理開始 ＋ 確認ダイアログの表示
	if($pass = window.prompt('パスワードを入力してください')){
		//ajax通信で登録されている内容をテキストボックスに表示する

		var userId = sessionStorage.getItem('userId');
		var userName = sessionStorage.getItem('userName');
		console.log(userId,userName);

		var param = [];
		param[0] = userId;
		param[1] = userName;
		param[2] = $pass;
		 var data = {'model':'users','action':'delete','data':param};
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
			if(data == 'true'){
			$('.delete_Completion_view').fadeIn();
			$('body').removeClass("overflow");
			sessionStorage.removeItem('userId');
			sessionStorage.removeItem('privateUserName');
			}else{
				//alert(data);
				alert('アカウントを削除しました。');
				sessionStorage.removeItem('userId');
				sessionStorage.removeItem('privateUserName');
				window.location.href =  "Top.html";
			}

		//ajax通信失敗時
		}).fail(function(XMLHttpRequest, textStatus, errorThrown){
			alert("error : " + textStatus);
		});



	}else{
		window.alert('キャンセルされました'); // 警告ダイアログを表示
	}
});

//ログアウト
$(document).on("click",".logout",function(){
	$('.login_user_menu').fadeToggle();
	sessionStorage.removeItem('userId');
	sessionStorage.removeItem('userName');

	//マイページと画像投稿ページの時は書く処理 ここから
		alert("トップページに戻ります。");
		window.location.href =  "Top.html";
	//ここまで


});
//////////////////////////////////////////////////////////////
//画像削除
$(document).on("click",".delete_btn",function(){
	if(window.confirm( "本当に画像を削除してよろしいですか？" )){
			var imageId = $(".view_image").attr("id");
			var userName = sessionStorage.getItem('userName');
			var userId = sessionStorage.getItem('userId');

			console.log(imageId,userName,userId);

			var param = [];
			param[0] = imageId;
			param[1] = userName;
			param[2] = userId;
			var data = {'model':'images','action':'delete','data':param};
			console.log(data);

		//	//ajax通信
			$.ajax({
				url:"../../Api/controller.php",
				dataType:'json',
				type:"POST",
				data:data
			//ajax通信成功時
			}).done(function(data){
				alert(data);
				runSearch();
				$('.lightbox_view,.login_view,.new_view').fadeOut();
				$('body').removeClass("overflow");
			//ajax通信失敗時
			}).fail(function(XMLHttpRequest, textStatus, errorThrown){
				alert("error : " + textStatus);
			});
	}else{
		alert('削除をキャンセルしました。');
	}
});
