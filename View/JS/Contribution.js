
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
		var userName = sessionStorage.getItem('userName');  // アカウント名
		var privateUserName = sessionStorage.getItem('privateUserName');
		console.log(userId,userName);
		if(userId == null || sessionStorage.getItem('privateUserName') == null){
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

		sessionStorage.removeItem('img1');
		sessionStorage.removeItem('img2');
		sessionStorage.removeItem('img3');
});

/////////////////////////////////////////////////////////////////////////
/////////////////////投稿画像の取得///////////////////////////
////////////////////////////////////////////////////////////////////////
$("#choice_btn1").on("change",function(e){
		var file = e.target.files[0],
	    reader = new FileReader(),
	    $preview = $(".toukou_images1");
	    // pngファイル以外の場合は何もしない
	    if(file.type.indexOf("image") < 0 || file.size > 5500000){
	    	alert("画像以外のファイル または5MBを超えるファイルは利用できません");
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
	    			name:'upload_file',
	    		}));
	    	};
	    })(file);

	    reader.readAsDataURL(file);
	    sessionStorage.setItem('img1','true');
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
$('#trimming_btn1').on('click', function(){
    var imageId = $('.toukou_images1').children('img').attr('id');
	//alert(imageId);
	if(imageId != 'img1'){
		//alert('No');
		return;
	}

	$('.trimming_view').fadeIn();
	$('body').addClass("overflow");
	$('.trimming_image').append($('<img>').attr({'src':$('#img1').attr('src'), 'id':'trimming_img1'}));
	var image = $('.trimming_image > img'),replaced;
    $('#trimming_img1').cropper({
    	aspectRatio: 4 / 4
    });
});

// トリミング確定ボタン(一番左の画像)
$('.trimming_view_btn').on('click', function(){
	var imageId = $('.trimming_image').children('img').attr('id');
	if(imageId != 'trimming_img1'){
		//alert('1以外');
		return;
	}

	var imageinfo = new Image();
	imageinfo.src = $('#trimming_img1').attr('src');
	var data = $('#trimming_img1').cropper('getData');

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

	$('.toukou_images1').append($('<canvas></canvas>').attr({"id":"canvasimg1"}));
	this.canvas = document.getElementById('canvasimg1').getContext('2d');
	var canvas = document.getElementById('canvasimg1');
	canvas.width = 200;
	canvas.height = 200;
	this.canvas.drawImage(imageinfo, image.x, image.y, image.width, image.height, 0, 0, 200, 200);

	var dataURI = canvas.toDataURL();
	$('#trimming_view_img1').remove();
	$('#trimming_img1').remove();
	$('.trimming_image').empty();
	$('.toukou_images1').append($('<img>').attr({'src':dataURI, 'title':$('#img1').attr('title'), 'name':'trimming_file', 'id':'trimming_view_img1' , 'width':200,'height':200}));
	$('#canvasimg1').remove();
	document.getElementById('img1').style.display = "none";

	$('.trimming_view').fadeOut();
});

$("#choice_btn2").on("change",function(e){
		var file = e.target.files[0],
	    reader = new FileReader(),
	    $preview = $(".toukou_images2");
	    // pngファイル以外の場合は何もしない
	    if(file.type.indexOf("image") < 0 || file.size > 5500000){
	    	alert("画像以外のファイル または5MBを超えるファイルは利用できません");
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
	    			name:'upload_file',
	    		}));
	    	};
	    })(file);

	    reader.readAsDataURL(file);
	    sessionStorage.setItem('img2','true');
});

//トリミング開始ボタン(中央の画像)
$('#trimming_btn2').on('click', function(){
    var imageId = $('.toukou_images2').children('img').attr('id');
	if(imageId != 'img2')
		return;

	$('.trimming_view').fadeIn();
	$('body').addClass("overflow");
	$('.trimming_image').append($('<img>').attr({'src':$('#img2').attr('src'), 'id':'trimming_img2'}));
	var image = $('.toukou_images > img'),replaced;
    $('#trimming_img2').cropper({
    	aspectRatio: 4 / 4
    });
});

// トリミング確定ボタン(中央の画像)
$('.trimming_view_btn').on('click', function(){
	var imageId = $('.trimming_image').children('img').attr('id');
	if(imageId != 'trimming_img2'){
		//alert('2以外');
		return;
	}

	var imageinfo = new Image();
	imageinfo.src = $('#trimming_img2').attr('src');
	var data = $('#trimming_img2').cropper('getData');

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

	$('.toukou_images2').append($('<canvas></canvas>').attr({"id":"canvasimg2"}));
	this.canvas = document.getElementById('canvasimg2').getContext('2d');
	var canvas = document.getElementById('canvasimg2');
	canvas.width = 200;
	canvas.height = 200;
	this.canvas.drawImage(imageinfo, image.x, image.y, image.width, image.height, 0, 0, 200, 200);

	var dataURI = canvas.toDataURL();
	$('#trimming_view_img2').remove();
	$('#trimming_img2').remove();
	$('.trimming_image').empty();
	$('.toukou_images2').append($('<img>').attr({'src':dataURI, 'title':$('#img2').attr('title'), 'name':'trimming_file', 'id':'trimming_view_img2' , 'width':200,'height':200}));
	$('#canvasimg2').remove();
	document.getElementById('img2').style.display = "none";

	$('.trimming_view').fadeOut();
});

$("#choice_btn3").on("change",function(e){
		var file = e.target.files[0],
	    reader = new FileReader(),
	    $preview = $(".toukou_images3");
	    // pngファイル以外の場合は何もしない
	    if(file.type.indexOf("image") < 0 || file.size > 5500000){
	    	alert("画像以外のファイル または5MBを超えるファイルは利用できません");
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
	    			name:'upload_file',
	    		}));
	    	};
	    })(file);

	    reader.readAsDataURL(file);
	    sessionStorage.setItem('img3','true');
});

//トリミング開始ボタン(右の画像)
$('#trimming_btn3').on('click', function(){
    var imageId = $('.toukou_images3').children('img').attr('id');
	if(imageId != 'img3')
		return;

	$('.trimming_view').fadeIn();
	$('body').addClass("overflow");
	$('.trimming_image').append($('<img>').attr({'src':$('#img3').attr('src'), 'id':'trimming_img3'}));
	var image = $('.toukou_images > img'),replaced;
    $('#trimming_img3').cropper({
    	aspectRatio: 4 / 4
    });
});

// トリミング確定ボタン(右の画像)
$('.trimming_view_btn').on('click', function(){
	var imageId = $('.trimming_image').children('img').attr('id');
	if(imageId != 'trimming_img3'){
		//alert('3以外');
		return;
	}

	var imageinfo = new Image();
	imageinfo.src = $('#trimming_img3').attr('src');
	var data = $('#trimming_img3').cropper('getData');

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

	$('.toukou_images3').append($('<canvas></canvas>').attr({"id":"canvasimg3"}));
	this.canvas = document.getElementById('canvasimg3').getContext('2d');
	var canvas = document.getElementById('canvasimg3');
	canvas.width = 200;
	canvas.height = 200;
	this.canvas.drawImage(imageinfo, image.x, image.y, image.width, image.height, 0, 0, 200, 200);

	var dataURI = canvas.toDataURL();
	$('#trimming_view_img3').remove();
	$('#trimming_img3').remove();
	$('.trimming_image').empty();
	$('.toukou_images3').append($('<img>').attr({'src':dataURI, 'title':$('#img3').attr('title'), 'name':'trimming_file', 'id':'trimming_view_img3' , 'width':200,'height':200}));
	$('#canvasimg3').remove();
	document.getElementById('img3').style.display = "none";

	$('.trimming_view').fadeOut();
});

///////////////////////////////////////////////////////////////////////////////////////

$(".toukou_btn").on("click",function(){

    var userId = sessionStorage.getItem('userId');
	var userName = sessionStorage.getItem('userName');
	var categoryArray = new Array($('#Genre1').val(), $('#Genre2').val(), $('#Genre3').val());

	var title1 = $('.toukou_title1').val();
	var title2 = $('.toukou_title2').val();
	var title3 = $('.toukou_title3').val();
	var work_info1 = $('.work_info1').val();
	var work_info2 = $('.work_info2').val();
	var work_info3 = $('.work_info3').val();
	title1 = escape_html(title1);
	title2 = escape_html(title2);
	title3 = escape_html(title3);
	work_info1 = escape_html(work_info1);
	work_info2 = escape_html(work_info2);
	work_info3 = escape_html(work_info3);

	var img1 = sessionStorage.getItem('img1');
	var img2 = sessionStorage.getItem('img2');
	var img3 = sessionStorage.getItem('img3');

	var errorFlag = 0;
	var errorMsg = "入力内容に不備があります。\n\n";

	if(img1 != null){
		if(title1 == ""){
			errorFlag = 1;
			errorMsg = errorMsg + "1枚目のタイトルを入力してください。\n";
		}

		if($('#Genre1').val() == 0){
			errorFlag = 1;
			errorMsg = errorMsg + "1枚目のカテゴリーを選択してください。\n";
		}
	}else{
		if(title1 != "" || $('#Genre1').val() != 0){
			errorFlag = 1;
			errorMsg = errorMsg + "1枚目に画像が選択されていません。"
		}
	}

	if(img2 != null){
		if(title2 == ""){
			errorFlag = 1;
			errorMsg = errorMsg + "2枚目のタイトルを入力してください。\n";
		}

		if($('#Genre2').val() == 0){
			errorFlag = 1;
			errorMsg = errorMsg + "2枚目のカテゴリーを選択してください。\n";
		}
	}else{
		if(title2 != "" || $('#Genre2').val() != 0){
			errorFlag = 1;
			errorMsg = errorMsg + "2枚目に画像が選択されていません。"
		}
	}

	if(img3 != null){
		if(title3 == ""){
			errorFlag = 1;
			errorMsg = errorMsg + "3枚目のタイトルを入力してください。\n";
		}

		if($('#Genre3').val() == 0){
			errorFlag = 1;
			errorMsg = errorMsg + "3枚目のカテゴリーを選択してください。\n";
		}
	}else{
		if(title3 != "" || $('#Genre3').val() != 0){
			errorFlag = 1;
			errorMsg = errorMsg + "3枚目に画像が選択されていません。"
		}
	}

	if(img1 == null && img2 == null && img3 == null){
		errorFlag = 1;
		errorMsg = errorMsg + "画像が選択されていません。"
	}


	if(errorFlag == 1){
		alert(errorMsg);
	}else{
		var titleArray = new Array(title1, title2, title3);
		var workinfoArray = new Array(work_info1, work_info2, work_info3);
		var trimming_view_img1 = $('#trimming_view_img1').attr('src');
		var trimming_view_img2 = $('#trimming_view_img2').attr('src');
		var trimming_view_img3 = $('#trimming_view_img3').attr('src');

		//alert(workinfoArray);

		var trimmingArray =[];
		var trimmingIndex = 0;

		for(var count = 0; count < 3;count++){
			if( count == 0 && trimming_view_img1 === undefined){
				trimmingArray[count] = "";
			}else if(count == 0){
				trimmingArray[count] = trimming_view_img1;
			}
			if( count == 1 && trimming_view_img2 === undefined){
				trimmingArray[count] = "";
			}else if(count == 1){
				trimmingArray[count] = trimming_view_img2;
			}
			if( count == 2 && trimming_view_img3 === undefined){
				trimmingArray[count] = "";
			}else if(count == 2){
				trimmingArray[count] = trimmning_view_img3;
			}
		}
		var data  = [ userName, userId, categoryArray, titleArray, trimmingArray, workinfoArray ];

		var param = new FormData($('[name="contribution"]').get(0));
		param.append('model'  , 'images');
		param.append('action' , 'insertImage');
		param.append('data'   ,  data)
		//console.log(JSON.stringify(param));
		//console.log(trimmingArray);

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
	}
});

function escape_html(string){
	if(typeof string !== 'string'){
		return string;
	}
	return string.replace(/[&'`"<>]/g, function(match){
		return {
			'&': '&amp;',
			"'": '&#x27;',
			'`': '&#x60;',
			'"': '&quot;',
			'<': '&lt;',
			'>': '&gt;',
		}[match]
	});
}

$(".delete3_1_btn").on("click",function(e){
	$("#choice_btn1").val("");
	$(".about_text").css("display","block");
	$(".toukou_images1").children('img').remove();
	//項目の初期化
	$('.toukou_title1').val("");
	$('#Genre1').val(0);
	$("#choice_btn1").val("");
	$(".toukou_images1").children('img').remove();
	sessionStorage.removeItem('img1','true');
});
$(".delete3_2_btn").on("click",function(e){
	$("#choice_btn2").val("");
	$(".toukou_images2").children('img').remove();
	//項目の初期化
	$('.toukou_title2').val("");
	$('#Genre2').val(0);
	$("#choice_btn2").val("");
	$(".toukou_images2").children('img').remove();
	sessionStorage.removeItem('img2','true');
});
$(".delete3_3_btn").on("click",function(e){
	$("#choice_btn3").val("");
	$(".toukou_images3").children('img').remove();
	//項目の初期化
	$('.toukou_title3').val("");
	$('#Genre3').val(0);
	$("#choice_btn3").val("");
	$(".toukou_images3").children('img').remove();
	sessionStorage.removeItem('img3','true');
});

///////////////////////////////////////////////////////////////
//ログアウト処理
$(document).on("click",".logout",function(){
	$('.login_user_menu').fadeToggle();
	sessionStorage.removeItem('userId');
	sessionStorage.removeItem('userName');
	sessionStorage.removeItem('privateUserName');

	//マイページと画像投稿ページの時は書く処理 ここから
		alert("トップページに戻ります。");
		window.location.href =  "Top.html";
	//ここまで

});
