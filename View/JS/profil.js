
$(document).ready(function(){
	//$('#sineUp_user_name').val(sessionStorage.getItem('signUp_user_name'));
	//$('#sineUp_user_name').val($('#sineUp_user_name').val());
	$('.return_btn').css("display", "none");
	$('.touroku_btn').css("display", "none");
})

$('.know_pass').click(function(){//.close_btn img���N���b�N�����Ƃ�//
    $('.pass_view').fadeIn();//view���t�F�[�h�A�E�g����//
    $('body').removeClass("overflow");
  });


  $('.know_pass').click(function(){//.close_btn img���N���b�N�����Ƃ�//
    $('.login_view').fadeOut();//view���t�F�[�h�A�E�g����//
    $('body').removeClass("overflow");
  });

// 画像選択
///////////////////////////////////////////////////////////////////////////////
$("#choice_btn").on("change",function(e){
	var file = e.target.files[0],
    reader = new FileReader(),
    $preview = $(".new_image");

    // pngファイル以外の場合は何もしない
    if(file.type.indexOf("image") < 0 || file.size > 5500000){
    	alert("画像以外のファイルは利用できません。");
    	$("#choice_btn").val("");
    	return false;
    }

    reader.onload = (function(file) {
    	return function(e) {
    		$preview.empty();
    		$preview.append($('<img>').attr({
    			src: e.target.result,
    			width: "200px",
    			height: "200px",
    			class: "preview",
    			title: file.name,
    			id:"img",
    			name:"upload_file"
    		}));
    	};
    })(file);

    reader.readAsDataURL(file);
});

//トリミング開始ボタン
$('.new_trimming_btn').on('click', function(){
    var imageId = $('.new_image').children('img').attr('id');
	//alert(imageC);
	if(imageId != 'img'){
		alert('No');
		return;
	}

	$('.trimming_view').fadeIn();
	$('body').addClass("overflow");
	$('.trimming_image').append($('<img>').attr({'src':$('#img').attr('src'), 'id':'trimming_img'}));
	var image = $('.trimming_image > img'),replaced;
    $('#trimming_img').cropper({
    	aspectRatio: 4 / 4
    });
});

//トリミング確定ボタン(一番左の画像)
$('.trimming_view_btn').on('click', function(){
	var imageId = $('.trimming_image').children('img').attr('id');
	if(imageId != 'trimming_img'){
		//alert('1以外');
		return;
	}

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

	$('.new_image').append($('<canvas></canvas>').attr({"id":"canvasimg1"}));
	this.canvas = document.getElementById('canvasimg1').getContext('2d');
	var canvas = document.getElementById('canvasimg1');
	canvas.width = 200;
	canvas.height = 200;
	this.canvas.drawImage(imageinfo, image.x, image.y, image.width, image.height, 0, 0, 200, 200);

	var dataURI = canvas.toDataURL();
	$('#trimming_view_img').remove();
	$('#trimming_img').remove();
	$('.trimming_image').empty();
	$('.new_image').append($('<img>').attr({'src':dataURI, 'title':$('#img').attr('title'), 'name':'trimming_file', 'id':'trimming_view_img' , 'width':200,'height':200}));
	$('#canvasimg1').remove();
	document.getElementById('img').style.display = "none";

	$('.trimming_view').fadeOut();
});

/*$(document).on("click", ".confirmation_btn", function(){

	sessionStorage.removeItem('originalImage');
	sessionStorage.removeItem('trimmingImage');

	var originalCanvas = document.createElement("canvas");
	var originalCtx = originalCanvas.getContext("2d");
	var originalImage = new Image();
	originalImage.src = $('#img').attr('src');
	originalCanvas.width = originalImage.naturalWidth;
	originalCanvas.height = originalImage.naturalHeight;
	originalCtx.drawImage(originalImage, 0, 0);

	var trimmingCanvas = document.createElement("canvas");
	var trimmingCtx = trimmingCanvas.getContext("2d");
	var trimmingImage = new Image();
	trimmingImage.src = $('#trimming_view_img').attr('src');
	trimmingCanvas.width = trimmingImage.naturalWidth;
	trimmingCanvas.height = trimmingImage.naturalHeight;
	trimmingCtx.drawImage(trimmingImage, 0, 0);

	if(originalImage.src.indexOf("png") > 0){
		sessionStorage.setItem('originalImage', originalCanvas.toDataURL());
		if($('#trimming_view_img').attr('src') != undefined){
			alert('dd');
			sessionStorage.setItem('trimmingImage', trimmingCanvas.toDataURL());
		}
	}else{
		sessionStorage.setItem('originalImage', originalCanvas.toDataURL("jpeg"));
		sessionStorage.setItem('trimmingImage', trimmingCanvas.toDataURL("jpeg"));
	}
})*/

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
		if(!name.match(/^[ぁ-んー　ァ-ロワヲンー一-龠a-zA-Z0-9\r\n\t]*$/)){
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
		// $('body').addClass("overflow");
		var name = $('#sineUp_user_name').val();
		var mail = $('#sineUP_mail').val();
		var pass1 = $('#sineUp_password1').val();
		var pass2 = $('#sineUp_password2').val();
		$('#user_name').val(name);
		$('#mail').val(mail);
		$('#password1').val(pass1);

		/*sessionStorage.removeItem('originalImage');
		sessionStorage.removeItem('trimmingImage');

		var originalCanvas = document.createElement("canvas");
		var originalCtx = originalCanvas.getContext("2d");
		var originalImage = new Image();
		originalImage.src = $('#img').attr('src');
		originalCanvas.width = originalImage.naturalWidth;
		originalCanvas.height = originalImage.naturalHeight;
		originalCtx.drawImage(originalImage, 0, 0);

		var trimmingCanvas = document.createElement("canvas");
		var trimmingCtx = trimmingCanvas.getContext("2d");
		var trimmingImage = new Image();
		trimmingImage.src = $('#trimming_view_img').attr('src');
		trimmingCanvas.width = trimmingImage.naturalWidth;
		trimmingCanvas.height = trimmingImage.naturalHeight;
		trimmingCtx.drawImage(trimmingImage, 0, 0);

		if(originalImage.src.indexOf("png") > 0){
			sessionStorage.setItem('originalImage', originalCanvas.toDataURL());
			if($('#trimming_view_img').attr('src') != undefined){
				sessionStorage.setItem('trimmingImage', trimmingCanvas.toDataURL());
			}
		}else{
			sessionStorage.setItem('originalImage', originalCanvas.toDataURL("jpeg"));
			sessionStorage.setItem('trimmingImage', trimmingCanvas.toDataURL("jpeg"));
		}

		sessionStorage.setItem('signUp_account_name', $('#sineUp_account_name').val());
		sessionStorage.setItem('signUp_user_name', $('#sineUp_user_name').val());
		sessionStorage.setItem('signUp_mail', $('#sineUP_mail').val());
		sessionStorage.setItem('signUp_password1', $('#sineUp_password1').val());
		sessionStorage.setItem('signUp_password2', $('#sineUp_password2').val());*/

		$('#sineUp_account_name').prop("disabled", true);
		$('#sineUp_user_name').prop("disabled", true);
		$('#sineUP_mail').prop("disabled", true);
		$('#sineUp_password1').prop("disabled", true);
		$('#sineUp_password2').prop("disabled", true);

		$('.new_trimming_btn').css("display", "none");
		$('.confirmation_btn').css("display", "none");
		$('.return_btn').css("display", "inline-block");
		$('.touroku_btn').css("display", "inline-block");

	}
});

$(document).on("click",".return_btn",function(){
	$('.new_trimming_btn').css("display", "block");
	$('.confirmation_btn').css("display", "inline-block");
	$('.return_btn').css("display", "none");
	$('.touroku_btn').css("display", "none");
	$('#sineUp_account_name').prop("disabled", false);
	$('#sineUp_user_name').prop("disabled", false);
	$('#sineUP_mail').prop("disabled", false);
	$('#sineUp_password1').prop("disabled", false);
	$('#sineUp_password2').prop("disabled", false);
});

$(document).on("click",".touroku_btn",function(){
	var name = $('#sineUp_account_name').val();
	var userName = $('#sineUp_user_name').val();
	var mail = $('#sineUP_mail').val();
	var pass1 = $('#sineUp_password1').val();
	var pass2 = $('#sineUp_password2').val();

	var trimming_view_img = $('.trimming_view_img').attr('src');
	if(trimming_view_img === undefined)
		trimming_view_img = "";

	var data = [name, pass1, mail, trimming_view_img, userName ];
	var param = new FormData($('[name="send"]').get(0));
	param.append('model', 'users');
	param.append('action', 'insert');
	param.append('data', data);

		//ajax通信
		$.ajax({
			url:"../../Api/controller.php",
			dataType:'json',
			type:"POST",
			processData : false,
		    contentType : false,
			data:param,
		//ajax通信成功時
		}).done(function(data){
			//alert(JSON.stringify(data));
			//alert('ddd');
			console.log(data);
			if(data != false || data != true){
				alert(data);
			}
			/*if(data != false){
			  $('.new_touroku_view').fadeIn();
			  $('body').addClass("overflow");
			// alert("新規登録が完了しました。");
			$('#sineUp_user_name').val('');
			$('#sineUP_mail').val('');
			$('#sineUp_password1').val('');
			$('#sineUp_password2').val('');
			$("#choice_btn").val('');
			}else{
		    alert("登録名がすでに使用されています。");
			}*/
		//ajax通信失敗時
		}).fail(function(data){
			alert('error');
		});
});
