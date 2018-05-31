
$(document).ready(function(){
	var userId = sessionStorage.getItem('userId');
	var userName = sessionStorage.getItem('userName');

	//ログイン中かどうかを取得
	if(userId == null){
		$('.login_btn').css("display","inline-block");
		$('.new_btn').css("display","inline-block");
		$('.login_user_icon').css("display","none");
	}else{
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
	}
	//画像表示実行
	runSearch();
});

/*
///////////////////////////////////

*関数名 runSearch

*概要 フォーム情報をPHPに渡して
      PHPから返ってきた情報をもとに
      画像表示

//////////////////////////////////
*/
//////////////////////////////////
function runSearch(){

	var searchWord = $('#searchErea').val();

	var data = {'model':'users','action':'userList','data':searchWord};

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

		var $div = $('.creators_box_waku');

		//表示中の画像を削除
		$div.empty();

		for(var i = 0;i < data.length;i++){

			var userName = data[i].userName;
			var userId = data[i].userId;
			console.log(userName,userId);
			//画像表示
			$div.append(
				("<div class='creators_box'id='"+ userId + "Div'></div>")
			);
			var $num = $('#'+userId+'Div');
			$num.append(
					$("<img id='"+userId+"'class='creator_name'value='"+userId+"'>")
					.attr("src","../../User/"+ userName +"/icon.png"),
					("<div class='creators_hover'id='"+userId+"Hover'></div>")
			);
			var $hover = $('#'+userId+'Hover');
			$hover.append(
				("<div class='hover_background'></div>"),
				("<div class='lightbox_information'id='"+userId+"Info'></div>")
			);
			var $info = $('#'+userId+'Info');
			$info.append(
				("<div class='lightbox_userName'><h1>"+ userName +"</h1></div>")
			);

			//トリミング
			trimmingImage($("#" + userId),130);
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


$(document).on("click",".creators_hover",function(){
	var creatorId = $(this).prev();
	sessionStorage.removeItem('infoId');
	sessionStorage.setItem('infoId',creatorId.attr('value'));
	window.location.href =  "CreatorsInfo.html";
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
