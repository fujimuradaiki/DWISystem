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
});