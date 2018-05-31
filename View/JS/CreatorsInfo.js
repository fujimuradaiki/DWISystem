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
	sessionStorage.setItem('infoId','1');
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

	//sessionStorage.clear();
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



/*
///////////////////////////////////

*関数名 runSearch

*概要 フォーム情報をPHPに渡して
      PHPから返ってきた情報をもとに
      画像表示

//////////////////////////////////
*/
function runSearch(infoId){

	var searchTitle = $('#searchErea').val();

	var param = {
			0:infoId,
			1:/*ページ番号(仮に1を入力中)*/1,
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

		console.log(imageData,userData);

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





	//ajax通信失敗時
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert("検索結果がありません。");

	});
}


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