
$(document).ready(function(){
	var userId = sessionStorage.getItem('userId');
	var userName = sessionStorage.getItem('userName');
	userId = "1";
	userName = "TestUser";
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
	var data = {'model':'users','action':'userList','data':""};

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
