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
	*/sessionStorage.clear();/*////////////////////////
	*/sessionStorage.setItem('userId','7');/*//////////
	*/sessionStorage.setItem('userName','i');//*
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

		var obj = document.getElementById("editingIcon");
		var cvs = document.createElement('canvas');
		cvs.width  = obj.width;
		cvs.height = obj.height;
		var ctx = cvs.getContext('2d');
		ctx.drawImage(obj, 0, 0);
		var bace64 = cvs.toDataURL("image/jpeg");




		//ajax通信で入力されている情報をPHPに渡す

		 var param = [];
		param[0] = user_id;
		param[1] = name;
		param[2] = pass_old;
		param[3] = pass_new;
		param[4] = mail;
		param[5] = bace64;

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


///////////////////////////////////////////////////////////////////////////////
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
    			title: file.name,
    			name:"upload_file"
    		}));
    	};
    })(file);
sessionStorage.setItem('iconImage',e.target.value);
console.log(sessionStorage.getItem('iconImage'));

    reader.readAsDataURL(file);
});
