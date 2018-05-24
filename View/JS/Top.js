/*
*************************************

*名前 : Top.js

*概要 : TopページのJavaScriptファイル

*作成日 : 2018/05/09

*作成者 : 藤村 大輝

*最終更新日 : 2018/05/23

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
	$('.NEW_btn').css("background-color","rgb(226, 49, 49)");
	//画像表示実行
	runSearch();

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

	//sessionStorage.clear();


});


/*
///////////////////////////////////

*関数 ソートボタン(新しい順)押下時

*概要 ソートボタンの色変更

//////////////////////////////////
*/
$('.NEW_btn').on("click",function(){
	if($(this).css("background-color") == "rgb(63, 58, 206)"){
		$(this).css("background-color","rgb(226, 49, 49)");
		$('.OLD_btn').css("background-color","rgb(63, 58, 206)");
		$('.POPULARTY_btn').css("background-color","rgb(63, 58, 206)");

		runSearch();
	}
});


/*
///////////////////////////////////

*関数 ソートボタン(古い順)押下時

*概要 ソートボタンの色変更

//////////////////////////////////
*/
$('.OLD_btn').on("click",function(){
	if($(this).css("background-color") == "rgb(63, 58, 206)"){
		$(this).css("background-color","rgb(226, 49, 49)");
		$('.NEW_btn').css("background-color","rgb(63, 58, 206)");
		$('.POPULARTY_btn').css("background-color","rgb(63, 58, 206)");

		runSearch();
	}
});


/*
///////////////////////////////////

*関数 ソートボタン(人気順)押下時

*概要 ソートボタンの色変更

//////////////////////////////////
*/
$('.POPULARTY_btn').on("click",function(){
	if($(this).css("background-color") == "rgb(63, 58, 206)"){
		$(this).css("background-color","rgb(226, 49, 49)");
		$('.NEW_btn').css("background-color","rgb(63, 58, 206)");
		$('.OLD_btn').css("background-color","rgb(63, 58, 206)");

		runSearch();
	}
});


/*
///////////////////////////////////

*関数 フィルタチェックボックス(全て)押下時

*概要 フィルタチェックボックスの状態変更

//////////////////////////////////
*/
$('#all').on("click",function(){

	if($("#all").prop("checked")){
		$("#chara").prop("checked",true);
		$("#backGround").prop("checked",true);
		$("#item").prop("checked",true);
	}else{
		$("#chara").prop("checked",false);
		$("#backGround").prop("checked",false);
		$("#item").prop("checked",false);
	}

	runSearch();
});


/*
///////////////////////////////////

*関数 フィルタチェックボックス(キャラクター)押下時

*概要 フィルタチェックボックスの状態変更

//////////////////////////////////
*/
$('#chara').on("click",function(){
	$("#all").prop("checked",false);
	if($("#chara").prop("checked") &&
	  $("#backGround").prop("checked") &&
	  $("#item").prop("checked")){
		$("#all").prop("checked",true);
	}

	runSearch();
});


/*
///////////////////////////////////

*関数 フィルタチェックボックス(背景)押下時

*概要 フィルタチェックボックスの状態変更

//////////////////////////////////
*/
$('#backGround').on("click",function(){
	$("#all").prop("checked",false);
	if($("#chara").prop("checked") &&
	  $("#backGround").prop("checked") &&
	  $("#item").prop("checked")){
		$("#all").prop("checked",true);
	}

	runSearch();
});


/*
///////////////////////////////////

*関数 フィルタチェックボックス(アイテム)押下時

*概要 フィルタチェックボックスの状態変更

//////////////////////////////////
*/
$('#item').on("click",function(){
	$("#all").prop("checked",false);
	if($("#chara").prop("checked") &&
	  $("#backGround").prop("checked") &&
	  $("#item").prop("checked")){
		$("#all").prop("checked",true);
	}

	runSearch();
});


/*
///////////////////////////////////

*関数名 getForm

*概要 フォーム情報取得

*戻り値 フォーム情報を格納した連想配列

//////////////////////////////////
*/
function getForm(){

	var sortType;
	if($('.NEW_btn').css("background-color") == "rgb(226, 49, 49)"){
		sortType = 'insert_at:DESC';
	}else{
		if($('.OLD_btn').css("background-color") == "rgb(226, 49, 49)"){
			sortType = "insert_at:ASC";
		}else{
			if($('.POPULARTY_btn').css("background-color") == "rgb(226, 49, 49)"){
				sortType = "rank:DESC";
			}
		}
	}

	var $category1 = $("#chara").prop("checked");
	var $category2 = $("#backGround").prop("checked");				  //チェックの状態を取得し、True or falseを入れる
	var $category3 = $("#item").prop("checked");

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

*関数名 runSearch

*概要 フォーム情報をPHPに渡して
      PHPから返ってきた情報をもとに
      画像表示

//////////////////////////////////
*/
function runSearch(){
	var data = {'model':'images','action':'imageList','data':getForm()};

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

		for(var i = 0;i < data.length;i++){

			var userName = data[i].UserName;
			var userId = data[i].userId;
			var imageId = data[i].Id;
			var categoryName = data[i].categoryName;
			var title = data[i].Title;
			var insert_at = data[i].Insert_at;

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
}

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

*関数 画像詳細フォームの閉じるボタンが押された時

*概要 再度検索をかける

//////////////////////////////////
*/
$(document).on("click",".close_btn",function(){
	runSearch();
});


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

		var param = [];
		param[0] = name;
		param[1] = pass1;
		param[2] = mail;
		//param[3] = $(".new_image").children('img').attr('name'),//sessionStorage.getItem('iconImage');
		param[3] = $(".new_image").children('img').attr('src');
		sessionStorage.clear('iconImage');
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

			alert(data);

		//ajax通信失敗時
		}).fail(function(XMLHttpRequest, textStatus, errorThrown){
			alert("error");
		});
	}
});


///////////////////////////////////////////////////////////////////////////////
$(".choice_btn").on("change",function(e){
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
sessionStorage.setItem('iconImage',e.target.value);
console.log(sessionStorage.getItem('iconImage'));

    reader.readAsDataURL(file);
});


