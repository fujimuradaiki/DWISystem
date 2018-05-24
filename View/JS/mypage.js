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

	//ログイン中かどうかを取得
	if(sessionStorage.getItem('userId') == null){
		//ログインボタンと新規登録ボタンを表示し、アイコンを消す
		$('.login_btn').css("display","inline-block");
		$('.new_btn').css("display","inline-block");
		$('.login_user_icon').css("display","none");
	}else{
		//ログインボタンと新規登録ボタンを消し、アイコンを表示
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

});


/*
///////////////////////////////////

*関数 編集画面の保存ボタン押下時

*概要 コンストラクタ

//////////////////////////////////
*/
$(document).on("click",".storage_btn",function(){


	//ajax通信で登録されている内容をテキストボックスに表示する
	/*
	 var param = xxxxx;
	 var data = {'model':'users','action':'xxxxx','data':param};
	 console.log(data);
	 //ajax通信
		$.ajax({
			url:"../../Api/controller.php",
			dataType:'json',
			type:"POST",
			data:data
		//ajax通信成功時
		}).done(function(data){

			//テキストボックスに送られてきたデータを投げる
			alert(data);

		//ajax通信失敗時
		}).fail(function(XMLHttpRequest, textStatus, errorThrown){
			alert("error");
		});
	 */

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
		if(!pass1.match(/^[a-zA-Z0-9]+$/)){
			errorFlag = 1;
			errorMsg = errorMsg + "・パスワードは半額英数字のみです。\n";
		}
	}

	if(errorFlag == 1){
		alert(errorMsg);
	}else{
		alert("バリデート通過");

		//ajax通信で入力されている情報をPHPに渡す
		/*
		 var param = xxxxx;
		 var data = {'model':'users','action':'xxxxx','data':param};
		 console.log(data);
		 //ajax通信
			$.ajax({
				url:"../../Api/controller.php",
				dataType:'json',
				type:"POST",
				data:data
			//ajax通信成功時
			}).done(function(data){


				alert(data);

			//ajax通信失敗時
			}).fail(function(XMLHttpRequest, textStatus, errorThrown){
				alert("error");
			});
		 */
	}
});


