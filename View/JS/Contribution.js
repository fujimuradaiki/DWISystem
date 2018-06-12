
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

/////////////////////////////////////////////////////////////////////////
/////////////////////投稿画像の取得///////////////////////////
////////////////////////////////////////////////////////////////////////
$("#choice_btn1").on("change",function(e){
		var file = e.target.files[0],
	    reader = new FileReader(),
	    $preview = $(".toukou_images1");
	    // pngファイル以外の場合は何もしない
	    if(file.type.indexOf("png") < 0 || file.size > 5500000){
	    	alert("png以外のファイル または5MBを超えるファイルは利用できません");
	    	$("#choice_btn1").val("");
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
	    			id:"img1",
	    			//name:"upload_file",
	    		}));
	    	};
	    })(file);

	    reader.readAsDataURL(file);
});

/***************************/
/*        ※注意点
画像のサイズがトリミングする枠の
サイズの移動可能域になる。
例)
    縦・・・1000
    横・・・500

枠の開く最大サイズは500,
一番右下へ移動した場合、
画像のサイズと等しい値になる
                           */
/***************************/

// トリミング開始ボタン(一番左の画像)
$('#triming_btn1').on('click', function(){
	var image = $('.toukou_images1 > img'),replaced;
    $('#img1').cropper({
    	aspectRatio: 4 / 4
    });
});

// トリミング確定ボタン(一番左の画像)
$('#enter_btn1').on('click', function(){
	var data = $('#img1').cropper('getData');

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
	alert(JSON.stringify(image));
});

$("#choice_btn2").on("change",function(e){
		var file = e.target.files[0],
	    reader = new FileReader(),
	    $preview = $(".toukou_images2");
	    // pngファイル以外の場合は何もしない
	    if(file.type.indexOf("png") < 0 || file.size > 5500000){
	    	alert("png以外のファイル または5MBを超えるファイルは利用できません");
	    	$("#choice_btn2").val("");
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
	    			id:"img2",
	    			//name:"upload_file"
	    		}));
	    	};
	    })(file);

	    reader.readAsDataURL(file);
});

//トリミング開始ボタン(中央の画像)
$('#triming_btn2').on('click', function(){
	var image = $('.toukou_images2 > img'),replaced;
    $('#img2').cropper({
    	aspectRatio: 4 / 4
    });
});

// トリミング確定ボタン(中央の画像)
$('#enter_btn2').on('click', function(){
	var data = $('#img2').cropper('getData');

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
	alert(JSON.stringify(image));
});

$("#choice_btn3").on("change",function(e){
		var file = e.target.files[0],
	    reader = new FileReader(),
	    $preview = $(".toukou_images3");
	    // pngファイル以外の場合は何もしない
	    if(file.type.indejjghuxOf("png") < 0 || file.size > 5500000){
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
	    			title: file.name,
	    			id:"img3",
	    			//name:"upload_file"
	    		}));
	    	};
	    })(file);

	    reader.readAsDataURL(file);
});

//トリミング開始ボタン(中央の画像)
$('#triming_btn3').on('click', function(){
	var image = $('.toukou_images3 > img'),replaced;
    $('#img3').cropper({
    	aspectRatio: 4 / 4
    });
});

// トリミング確定ボタン(中央の画像)
$('#enter_btn3').on('click', function(){
	var data = $('#img3').cropper('getData');

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
	alert(JSON.stringify(image));
});

///////////////////////////////////////////////////////////////////////////////////////

$(".toukou_btn").on("click",function(){

    var userId = sessionStorage.getItem('userId');
	var userName = sessionStorage.getItem('userName');
	//var imageInfo = $('[name="contribution"]').serializeArray();
	var categoryArray = new Array($('#Genre1').val(), $('#Genre2').val(), $('#Genre3').val());
	var titleArray = new Array($('.toukou_title1').val(), $('.toukou_title2').val(),$('.toukou_title3').val());
	alert(titleArray);
	var data  = [ userName, userId, categoryArray, titleArray ];

	var param = new FormData($('[name="contribution"]').get(0));
	param.append('model'  , 'images');
	param.append('action' , 'insertImage');
	param.append('data'   ,  data)
	//console.log(JSON.stringify(param));
	console.log(param);

	//ajax通信
	$.ajax({
		url         :'../../Api/controller.php',
		dataType    :'json',
		type        :'POST',
		processData : false,
	    contentType : false,
		data        : param,
		timeout     : 1000
	//ajax通信成功時
	}).done(function(data){
		console.log(data);
		$('.toukou_view').fadeIn();
		$('body').addClass("overflow");
		for(var i = 1;i <= 3;i++){
			console.log(i);
			$('.toukou_title'+i).val("");
			$('#Genre'+i).val(0);
			$("#choice_btn"+i).val("");
			$(".toukou_images"+i).children('img').remove();
		}
	//ajax通信失敗時
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert("error");
	});
});

$(".delete3_1_btn").on("click",function(e){
	$("#choice_btn1").val("");
	$(".about_text").css("display","block");
	$(".toukou_images1").children('img').remove();
	//項目の初期化
	$('.toukou_title1').val("");
	$('#Genre1').val(0);
	$("#choice_btn1").val("");
	$(".toukou_images1").children('img').remove();
});
$(".delete3_2_btn").on("click",function(e){
	$("#choice_btn2").val("");
	$(".toukou_images2").children('img').remove();
	//項目の初期化
	$('.toukou_title2').val("");
	$('#Genre2').val(0);
	$("#choice_btn2").val("");
	$(".toukou_images2").children('img').remove();
});
$(".delete3_3_btn").on("click",function(e){
	$("#choice_btn3").val("");
	$(".toukou_images3").children('img').remove();
	//項目の初期化
	$('.toukou_title3').val("");
	$('#Genre3').val(0);
	$("#choice_btn3").val("");
	$(".toukou_images3").children('img').remove();
});

///////////////////////////////////////////////////////////////
//ログアウト処理
$(document).on("click",".logout",function(){
	$('.login_user_menu').fadeToggle();
	sessionStorage.removeItem('userId');
	sessionStorage.removeItem('userName');

	//マイページと画像投稿ページの時は書く処理 ここから
		alert("トップページに戻ります。");
		window.location.href =  "Top.html";
	//ここまで

});
