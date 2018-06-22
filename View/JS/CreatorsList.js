
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

$('.know_pass').click(function(){//.close_btn img���N���b�N�����Ƃ�//
    $('.pass_view').fadeIn();//view���t�F�[�h�A�E�g����//
    $('body').removeClass("overflow");
  });


  $('.know_pass').click(function(){//.close_btn img���N���b�N�����Ƃ�//
    $('.login_view').fadeOut();//view���t�F�[�h�A�E�g����//
    $('body').removeClass("overflow");
  });

// $(".login_close_btn").click(function () {
//   $(".login_text,.pass_text").remove();
// });

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

//トリミング開始ボタン(一番左の画像)
$('.new_trimming_btn').on('click', function(){
    var imageC = $('.new_image').children('img').attr('class');
	//alert(imageC);
	if(imageC != 'preview'){
		alert('No');
		return;
	}

	$('.trimming_view').fadeIn();
	$('body').addClass("overflow");
	$('.trimming_image').append($('<img>').attr({'src':$('.preview').attr('src'), 'id':'trimming_img'}));
	var image = $('.trimming_image > img'),replaced;
    $('#trimming_img').cropper({
    	aspectRatio: 4 / 4
    });
});

//トリミング確定ボタン(一番左の画像)
$('.trimming_view_btn').on('click', function(){
	/*var imageId = $('.trimming_image').children('img').attr('id');
	if(imageId != 'trimming_img'){
		//alert('1以外');
		return;
	}*/

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

	$('.new_image').append($('<canvas></canvas>').attr({"class":"canvasimg1"}));
	this.canvas = document.getElementsByClassName('canvasimg1')[0].getContext('2d');
	var canvas = document.getElementsByClassName('canvasimg1')[0];
	canvas.width = 200;
	canvas.height = 200;
	this.canvas.drawImage(imageinfo, image.x, image.y, image.width, image.height, 0, 0, 200, 200);

	var dataURI = canvas.toDataURL();
	$('.trimming_view_img').remove();
	$('#trimming_img').remove();
	$('.trimming_image').empty();
	$('.new_image').append($('<img>').attr({'src':dataURI, 'title':$('.preview').attr('title'), 'name':'trimming_file', 'class':'trimming_view_img' , 'width':200,'height':200}));
	$('.canvasimg1').remove();
	//$('#iconimg').remove();
	document.getElementsByClassName('preview')[0].style.display = "none";
	document.getElementsByClassName('preview')[1].style.display = "none";

	$('.trimming_view').fadeOut();
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
		if(data != "error"){
			//alert(data['user_name']+"でログインしました");
			$('.login_Comp_view').fadeIn();
			$('body').removeClass("overflow");
			//ユーザーidとユーザー名をストレージに保存
			sessionStorage.setItem('userId',data['userId']);
			sessionStorage.setItem('privateUserName',data['user_name']);

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
			runSearch();
		}else{
			alert("ログインに失敗しました");
		}
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
    }else if(pass1.length < 8 || pass2.length < 8  && pass1.length > 16 || pass2.length > 16){
    	errorFlag = 1;
    	errorMsg = errorMsg + "・パスワードは8文字以上、16文字以内で設定してください。\n";
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
	//var pass2 = $('#sineUp_password2').val();
	$("#new_form_waku").text

	    var data = [name, pass1, mail];
		var param = new FormData($('#send').get(0));
	    param.append('model'  , 'users');
	    param.append('action' , 'insert');
	    param.append('data'   ,  data);
		/*param[0] = name;
		param[1] = pass1;
		param[2] = mail;
		param[3] = $(".new_image").children('img').attr('src');
		var data = {'model':'users','action':'insert','data':param};*/
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
			if(data != false){
				// alert("新規登録が完了しました。");
				$('.new_touroku_view').fadeIn();
				$('body').addClass("overflow");
				runSearch();
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
    if(file.type.indexOf("image") < 0 || file.size > 5500000){
    	alert("画像以外のファイル または5MBを超えるファイルは利用できません");
    	$("#choice_btn").val("");
    	return false;
    }

    reader.onload = (function(file) {
    	return function(e) {
    		$preview.empty();
    		$preview.append($('<img>').attr({
    			src: e.target.result,
    			width: "200px",
    			height : "200px",
    			class: "preview",
    			title: file.name,
    			name:"upload_file"
    		}));
    	};
    })(file);

    // 画像のトリミング

    reader.readAsDataURL(file);
});

///////////////////////////////////////////////////////////////
//ログアウト処理
$(document).on("click",".logout",function(){
	$('.login_user_menu').fadeToggle();
	sessionStorage.removeItem('userId');
	sessionStorage.removeItem('userName');

	sessionStorage.removeItem('privateUserName');

	//マイページと画像投稿ページ以外の時は書く処理 ここから
	$('.login_btn').css("display","inline-block");
	$('.new_btn').css("display","inline-block");
	$('.login_user_icon').css("display","none");
//ここまで

});

$(document).on("click","#searchButton",function(){
	runSearch();
});

$(document).on("click",".new_close_btn",function(){
	var name = $('#sineUp_user_name').val('');
	var mail = $('#sineUP_mail').val('');
	var pass1 = $('#sineUp_password1').val('');
	var pass2 = $('#sineUp_password2').val('');
	var iconData = $("#choice_btn").val('');
	$('.new_image').children('img').remove();

});

$(document).on("click",".login_close_btn",function(){
	var name = $('.login_text').val('');
	var pass1 = $('.pass_text').val('');

});

$(document).on("click",".close_btn2",function(){
	var name = $('.login_text').val('');
	var pass1 = $('.pass_text').val('');

});
