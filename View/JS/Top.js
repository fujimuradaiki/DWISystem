/*
*************************************

*名前 : Top.js

*概要 : TopページのJavaScriptファイル

*作成日 : 2018/05/09

*作成者 : 藤村 大輝

*最終更新日 : 2018/05/23

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

	/*パスワードを忘れたとき*/
  $('.know_pass').click(function(){//.close_btn img���N���b�N�����Ƃ�//
    $('.pass_view').fadeIn();//view���t�F�[�h�A�E�g����//
    $('body').removeClass("overflow");
  });

  $('.know_pass').click(function(){//.close_btn img���N���b�N�����Ƃ�//
    $('.login_view').fadeOut();//view���t�F�[�h�A�E�g����//
    $('body').removeClass("overflow");
  });

  $('.close_btn2').click(function(){//.close_btn img���N���b�N�����Ƃ�//
    $('.pass_view').fadeOut();//view���t�F�[�h�A�E�g����//
    $('body').removeClass("overflow");
  });

  $('.pass_close_btn img').click(function(){//.close_btn img���N���b�N�����Ƃ�//
    $('.pass_view').fadeOut();//view���t�F�[�h�A�E�g����//
    $('body').removeClass("overflow");
  });

  //レビューボックス//
  $('#review_btn').on('click', function(){
  $('.review_box').toggleClass("review_right0");
  });
  //制作者コメントボックス//
  $('#creator_btn').on('click', function(){
  $('.creator_box').toggleClass("creator_right0");
  });

  //レビューボックス//
  $('#review_btn_top').on('click', function(){
  $('.review_box').fadeIn(0);
  $('body').removeClass("overflow");
  });
  //制作者コメントボックス//
  $('#creator_btn_top').on('click', function(){
  $('.creator_box').fadeIn(0);
  $('body').removeClass("overflow");
  });

  $('.box_close_btn').on("click",function(){
    $('.review_box,.creator_box').fadeOut(0);//view���t�F�[�h�A�E�g����//
    $('body').removeClass("overflow");
  });




	var s = "横幅 = " + window.parent.screen.width + " / 高さ = " + window.parent.screen.height;
	//alert(s)
	$('.NEW_btn').css("background-color","rgb(46, 204, 250)");
	//画像表示実行
	runSearch();

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
	//$('.lightbox_view').fadeOut();//view���t�F�[�h�A�E�g����//
	$('body').removeClass("overflow");

});


/*
///////////////////////////////////

*関数 ソートボタン(新しい順)押下時

*概要 ソートボタンの色変更

//////////////////////////////////
*/
$('.NEW_btn').on("click",function(){
	if($(this).css("background-color") == "rgb(63, 58, 206)"){
		$(this).css("background-color","rgb(46, 204, 250)");
		$('.OLD_btn').css("background-color","rgb(63, 58, 206)");
		$('.POPULARTY_btn').css("background-color","rgb(63, 58, 206)");

		runSearch();
	}
});


/*
///////////////////////////////////

*関数 ソートボタン(古い順)押下時

*概要 ソートボタンの色変更

//////////////////////////////////
*/
$('.OLD_btn').on("click",function(){
	if($(this).css("background-color") == "rgb(63, 58, 206)"){
		$(this).css("background-color","rgb(46, 204, 250)");
		$('.NEW_btn').css("background-color","rgb(63, 58, 206)");
		$('.POPULARTY_btn').css("background-color","rgb(63, 58, 206)");
		runSearch();
	}
});


/*
///////////////////////////////////

*関数 ソートボタン(人気順)押下時

*概要 ソートボタンの色変更

//////////////////////////////////
*/
$('.POPULARTY_btn').on("click",function(){
	if($(this).css("background-color") == "rgb(63, 58, 206)"){
		$(this).css("background-color","rgb(46, 204, 250)");
		$('.NEW_btn').css("background-color","rgb(63, 58, 206)");
		$('.OLD_btn').css("background-color","rgb(63, 58, 206)");

		runSearch();
	}
});


/*
///////////////////////////////////

*関数 フィルタチェックボックス(全て)押下時

*概要 フィルタチェックボックスの状態変更

//////////////////////////////////
*/
$('#all').on("click", function(){

	if($("#all").prop("checked")){
		$("#chara").prop("checked",true);
		$("#backGround").prop("checked",true);
		$("#item").prop("checked",true);
	}else{
		$("#chara").prop("checked",false);
		$("#backGround").prop("checked",false);
		$("#item").prop("checked",false);
	}

	runSearch();
});


/*
///////////////////////////////////

*関数 フィルタチェックボックス(キャラクター)押下時

*概要 フィルタチェックボックスの状態変更

//////////////////////////////////
*/
$('#chara').on("click",function(){
	$("#all").prop("checked",false);
	if($("#chara").prop("checked") &&
	  $("#backGround").prop("checked") &&
	  $("#item").prop("checked")){
		$("#all").prop("checked",true);
	}

	runSearch();
});


/*
///////////////////////////////////

*関数 フィルタチェックボックス(背景)押下時

*概要 フィルタチェックボックスの状態変更

//////////////////////////////////
*/
$('#backGround').on("click",function(){
	$("#all").prop("checked",false);
	if($("#chara").prop("checked") &&
	  $("#backGround").prop("checked") &&
	  $("#item").prop("checked")){
		$("#all").prop("checked",true);
	}

	runSearch();
});


/*
///////////////////////////////////

*関数 フィルタチェックボックス(アイテム)押下時

*概要 フィルタチェックボックスの状態変更

//////////////////////////////////
*/
$('#item').on("click",function(){
	$("#all").prop("checked",false);
	if($("#chara").prop("checked") &&
	  $("#backGround").prop("checked") &&
	  $("#item").prop("checked")){
		$("#all").prop("checked",true);
	}

	runSearch();
});


/*
///////////////////////////////////

*関数名 getForm

*概要 フォーム情報取得

*戻り値 フォーム情報を格納した連想配列

//////////////////////////////////
*/
function getForm(){

	var sortType;
	if($('.NEW_btn').css("background-color") == "rgb(46, 204, 250)"){
		sortType = 'insert_at:DESC';
	}else{
		if($('.OLD_btn').css("background-color") == "rgb(46, 204, 250)"){
			sortType = "insert_at:ASC";
		}else{
			if($('.POPULARTY_btn').css("background-color") == "rgb(46, 204, 250)"){
				sortType = "rank:DESC";
			}
		}
	}

	var $category1 = $("#chara").prop("checked");
	var $category2 = $("#backGround").prop("checked");				  //チェックの状態を取得し、True or falseを入れる
	var $category3 = $("#item").prop("checked");

	//取得したフォーム情報を連想配列に格納
	var param = {
		0:{name:'sortType',value:sortType},
		1:{category1:{name:'charactor',value:$category1},
		   category2:{name:'backGround',value:$category2},
		   category3:{name:'item',value:$category3}

		}
	};

	return param;
}


/*
///////////////////////////////////

*関数名 runSearch

*概要 フォーム情報をPHPに渡して
      PHPから返ってきた情報をもとに
      画像表示

//////////////////////////////////
*/
function runSearch(){

	var data = {'model':'images','action':'imageList','data':getForm()};

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
		console.log(data);
		var $div = $('.lightbox_waku');

		//表示中の画像を削除
		$div.empty();

		for(var i = 0;i < data.length;i++){

			var userName = data[i].UserName;
			var userId = data[i].userId;
			var imageId = data[i].Id;
			var categoryName = data[i].categoryName;
			var title = data[i].Title;
			var insert_at = data[i].Insert_at;
			var $dispimge = data[i].fileType;
			//画像表示
			$div.append(
				("<div class='lightbox'id='"+ imageId + "Div'></div>")
			);
			var $num = $('#'+imageId+'Div');
			$num.append(

					$("<img id='"+imageId+"'class='images'value='"+userId+"'>")
					.attr("src","../../User/"+ userName +"/"+ $dispimge),

					("<div class='lightbox_hover'id='"+imageId+"Hover'></div>")
			);

			var $hover = $('#'+imageId+'Hover');
			$hover.append(
				("<div class='hover_background'></div>"),
				("<div class='lightbox_information'id='"+imageId+"Info'></div>")
			);

			var $info = $('#'+imageId+'Info');
			$info.append(
				("<div class='lightbox_title'><h1>"+ title +"</h1></div>"),
				("<div class='lightbox_user_waku'id='"+imageId+"Waku'>")
			);

			var $waku = $('#'+imageId+'Waku');
			$waku.append(
				("<div class='lightbox_user_icon'id='"+ imageId +"Icon'></div>"),
				("<div class='lightbox_user_name'><h1>illustration by "+ userName +"</h1></div>")
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
			trimmingImage($("#" + imageId),250);
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


/*
///////////////////////////////////

*関数 画像詳細フォームの閉じるボタンが押された時

*概要 再度検索をかける

//////////////////////////////////
*/
$(document).on("click",".close_btn",function(){
	runSearch();
	$('.creator_icon').empty();
	$('.creator_name').empty();
	$('.creator_coment').empty();
	$('.work_coment').empty();
});


/*
///////////////////////////////////

*関数 insertフォームのログインボタン押下時

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
	//	alert(data['user_name']+"でログインしました");
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
	}else if(pass1.length < 8 || pass2.length < 8 && pass1.length > 16 || pass2.length > 16){
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

$(document).on("click",".touroku_btn",function(){
	var name = $('#sineUp_user_name').val();
	var mail = $('#sineUP_mail').val();
	var pass1 = $('#sineUp_password1').val();
	var pass2 = $('#sineUp_password2').val();
	var iconData = $("#choice_btn").val();
	$("#new_form_waku").text

		var param = [];
		param[0] = name;
		param[1] = pass1;
		param[2] = mail;
		param[3] = $(".new_image").children('img').attr('src');

		console.log(param[3] );
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
			  $('.new_touroku_view').fadeIn();
			  $('body').addClass("overflow");
			//alert("新規登録が完了しました。");
			$('#sineUp_user_name').val('');
			$('#sineUP_mail').val('');
			$('#sineUp_password1').val('');
			$('#sineUp_password2').val('');
			$("#choice_btn").val('');
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
    if(file.type.indexOf("png") < 0 || file.size > 5500000){
    	alert("png以外のファイルは利用できません。");
    	$("#choice_btn").val("");
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


////////////////////////////////////////////////////////////////////
$(document).on("click",".lightbox_hover",function(){
  $('.lightbox_view').fadeIn();
  $('body').addClass("overflow");


  var $image = $(this).prev('img');
  var $imageId = $image.attr('id');
  var $userId = $image.attr('value');
  var $imageWidth = $image.width();
  var $imageHeight = $image.height();

  var $imageTitle;
  var $creatorName;

  var $div;

  var param = {
		  0:$imageId,
		  1:$userId
  };
  console.log(param);
  var data = {'model':'images','action':'imageInfo','data':param};
  //ajax通信
  $.ajax({
	url:"../../Api/controller.php",
	dataType:'json',
	type:"POST",
	data:data
  //ajax通信成功時
  }).done(function(data){
	console.log(data);

	$imageTitle = data[0]['usersData'][0]['imageTitle'];
	$creatorName = data[0]['usersData'][0]['creatorName'];
	$dispimge = data[0]['usersData'][0]['fileType'];

	//5段階評価に使う星画像の場所を明示
	$.fn.raty.defaults.path = "../Lib/images";

	//画像詳細を表示////////////////////
	var $div = $('.lightbox_image');
	$div.empty();
	$div.append($('<div></div>').attr({'id':'Zoomer', 'class':'zoomer_wrapper'}));
	$('.zoomer_wrapper').append(
			$("<img>")
			.attr("src","../../User/"+ $creatorName +"/"+ $dispimge)
	);
	$(window).ready(function(){
		$('#Zoomer').zoomer();
    });
	/*$div.append($('<img>').$('.view_image').attr("src","../../User/"+ $creatorName +"/"+ $imageId +".png"));*/

	var w,h;
	if($imageWidth >= $imageHeight){
		w = 500;
		h = (500 / $imageWidth) * $imageHeight;
	}else{
		w = (600 / $imageHeight) * $imageWidth;
		h = 600;
	}

	$('.lightbox_left_image').css('background','transparent')
	$('.view_image').css('width',w);
	$('.view_image').css('height',h);
	//ユーザーアイコン表示//////////////////
	$div = $('.user_icon');
	$div.empty();
	$div.append(
			$("<img class='view_icon'>")
			.attr("src","../../User/"+ $creatorName +"/icon.png")
	);
	$('.view_icon').css('width',50);
	$('.view_icon').css('height',50);
	$('.view_icon').css('border-radius','50%');

	//作者名表示////////////////////////
	$div = $('.user_name');
	$div.empty();
	$div.append("{{creatorName}}");
	var drowCreatorName = new Vue({
		el : '.user_name',
		data :{
			creatorName : "illustration by "+ $creatorName
		}
	})


	//作品タイトル表示////////////////////////
	$div = $('.work_title');
	$div.empty();
	$div.append("{{imageTitle}}");
	$div.css("color","white");
	$div.css("fontSize","1.5rem")
	var drowImageTitle = new Vue({
		el : '.work_title',
		data :{
			imageTitle : $imageTitle
		}
	});

	$('.creator_icon').empty();
	$('.creator_name').empty();
	$('.creator_coment').empty();
	$('.work_coment').empty();

	$('.creator_icon').append($('<img>').attr("src","../../User/"+ $creatorName +"/icon.png"));
	$('.creator_name').append($('<h1>'+data[0]['usersData'][0]['creatorName']+'</h1>'));       // アカウント名
	$('.creator_coment').append($('<pre>'+data[0]['usersData'][0]['Introduction']+'</pre>'));  // 自己紹介
	$('.work_coment').append($('<pre>'+data[0]['usersData'][0]['imageSummary']+'</pre>'));

	//レビューコメント表示/////////////////////
	$div = $('.past_coment');
	$div.empty();
	$div.append(
		("<div id='commentPreview' style='overflow: auto; width: 500px; height: 160px'></div>")
	);
	var sum = 0;
	for(var i = 0;i<data[0]['commentData'].length;i++){
		$('#commentPreview').append(
			("<div id ='comment"+ i +"'</div>")
		);
		$('#comment' + i).raty({
			readOnly : true,
			hints: ['', '', '', '', ''],
			number : 5,
			score : data[0]['commentData'][i]['rank']
		});

		if( data[0]['commentData'][i]['userName'] == ""){
			$('#comment' + i).append(
				("<br>"),
				("<img src='../Images/user.png' class='gest'><p1>GestUser</p1>"),
				("<br>"),
				("<p2>"+" "+data[0]['commentData'][i]['comment'] +"</p2>"),
				("<br><br><br>")
			);
			$('.gest').css('width',20);
			$('.gest').css('height',20);
			$('.gest').css('margin-right','5px');
			$('.gest').css('border-radius','50%');

		}else{
			$('#comment' + i).append(
				("<br>"),
				$("<img id='commenter_icon"+i+"'>")
					.attr("src","../../User/"+ data[0]['commentData'][i]['userName'] +"/icon.png"),
				("<p1>"+" "+ data[0]['commentData'][i]['userName'] +"&emsp;&emsp;"+data[0]['commentData'][i]['commentInsertAt']+"</p1>"),
				("<br>"),
				("<p2>"+" "+data[0]['commentData'][i]['comment'] +"</p2>"),
				("<br><br><br>")
			);
			$('#commenter_icon'+i).css('width',20);
			$('#commenter_icon'+i).css('height',20);
			$('#commenter_icon'+i).css('border-radius','50%');
		}
	sum = parseInt(sum) +  parseInt(data[0]['commentData'][i]['rank']);
	}



	//合計表示/////////////////////////////
	$div = $('.review_all');
	$div.empty();
	$div.append(
		("<h1>合計 : "+ data[0]['commentData'].length +"件</h1>"),
		("<div id = 'averageReview'></div>")
	);
	$('#averageReview').raty({
		readOnly : true,
		number : 5,
		hints: ['', '', '', '', ''],
		halfShow : true,
		score : (sum / data[0]['commentData'].length)
	});

	//レビューする部分を表示////////////////////////
	$div = $('.review');
	$div.empty();
	$div.append(
		("<h1>レビューをする</h1>"),
		("<div id = 'reviewErea'></div>"),
		("<input id = 'hint'type='hidden'value = '0' readonly>")
	);
	$('#reviewErea').raty({
		number : 5,
		hints: ['1', '2', '3', '4', '5'],
		targetScore : '#hint'
	});
	$div = $('.review_coment');
	$div.empty();
	$div.append(
		("<h1>コメントをする</h1>"),
		("<textarea name='comment'id='"+$imageId+"ComentErea' cols='40' rows='8'></textarea>"),
		("<button class='review_btn' id='"+$imageId+"' value='"+$userId+"'>レビュー</button>")
	);



  //ajax通信失敗時
  }).fail(function(XMLHttpRequest, textStatus, errorThrown){
	alert("error");
  });


});
$(document).on("click",".lightbox",function(){
  $('.lightbox_view').fadeIn();
  $('body').addClass("overflow");


  var $image = $(this).prev('img');
  var $imageId = $image.attr('id');
  var $userId = $image.attr('value');
  var $imageWidth = $image.width();
  var $imageHeight = $image.height();

  var $imageTitle;
  var $creatorName;

  var $div;

  var param = {
		  0:$imageId,
		  1:$userId
  };
  console.log(param);
  var data = {'model':'images','action':'imageInfo','data':param};
  //ajax通信
  $.ajax({
	url:"../../Api/controller.php",
	dataType:'json',
	type:"POST",
	data:data
  //ajax通信成功時
  }).done(function(data){
	console.log(data);

	$imageTitle = data[0]['usersData'][0]['imageTitle'];
	$creatorName = data[0]['usersData'][0]['creatorName'];
	$dispimge = data[0]['usersData'][0]['fileType'];

	//5段階評価に使う星画像の場所を明示
	$.fn.raty.defaults.path = "../Lib/images";

	//画像詳細を表示////////////////////
	var $div = $('.lightbox_image');
	$div.empty();
	$div.append($('<div></div>').attr({'id':'Zoomer', 'class':'zoomer_wrapper'}));
	$('.zoomer_wrapper').append(
			$("<img>")
			.attr("src","../../User/"+ $creatorName +"/"+ $dispimge)
	);
	$(window).ready(function(){
		$('#Zoomer').zoomer();
    });
	/*$div.append($('<img>').$('.view_image').attr("src","../../User/"+ $creatorName +"/"+ $imageId +".png"));*/

	var w,h;
	if($imageWidth >= $imageHeight){
		w = 500;
		h = (500 / $imageWidth) * $imageHeight;
	}else{
		w = (600 / $imageHeight) * $imageWidth;
		h = 600;
	}

	$('.lightbox_left_image').css('background','transparent')
	$('.view_image').css('width',w);
	$('.view_image').css('height',h);
	//ユーザーアイコン表示//////////////////
	$div = $('.user_icon');
	$div.empty();
	$div.append(
			$("<img class='view_icon'>")
			.attr("src","../../User/"+ $creatorName +"/icon.png")
	);
	$('.view_icon').css('width',50);
	$('.view_icon').css('height',50);
	$('.view_icon').css('border-radius','50%');

	//作者名表示////////////////////////
	$div = $('.user_name');
	$div.empty();
	$div.append("{{creatorName}}");
	var drowCreatorName = new Vue({
		el : '.user_name',
		data :{
			creatorName : "illustration by "+ $creatorName
		}
	})


	//作品タイトル表示////////////////////////
	$div = $('.work_title');
	$div.empty();
	$div.append("{{imageTitle}}");
	$div.css("color","white");
	$div.css("fontSize","1.5rem")
	var drowImageTitle = new Vue({
		el : '.work_title',
		data :{
			imageTitle : $imageTitle
		}
	});

	$('.creator_icon').empty();
	$('.creator_name').empty();
	$('.creator_coment').empty();
	$('.work_coment').empty();

	$('.creator_icon').append($('<img>').attr("src","../../User/"+ $creatorName +"/icon.png"));
	$('.creator_name').append($('<h1>'+data[0]['usersData'][0]['creatorName']+'</h1>'));       // アカウント名
	$('.creator_coment').append($('<pre>'+data[0]['usersData'][0]['Introduction']+'</pre>'));  // 自己紹介
	$('.work_coment').append($('<pre>'+data[0]['usersData'][0]['imageSummary']+'</pre>'));

	//レビューコメント表示/////////////////////
	$div = $('.past_coment');
	$div.empty();
	$div.append(
		("<div id='commentPreview' style='overflow: auto; width: 500px; height: 160px'></div>")
	);
	var sum = 0;
	for(var i = 0;i<data[0]['commentData'].length;i++){
		$('#commentPreview').append(
			("<div id ='comment"+ i +"'</div>")
		);
		$('#comment' + i).raty({
			readOnly : true,
			hints: ['', '', '', '', ''],
			number : 5,
			score : data[0]['commentData'][i]['rank']
		});

		if( data[0]['commentData'][i]['userName'] == ""){
			$('#comment' + i).append(
				("<br>"),
				("<img src='../Images/user.png' class='gest'><p1>GestUser</p1>"),
				("<br>"),
				("<p2>"+" "+data[0]['commentData'][i]['comment'] +"</p2>"),
				("<br><br><br>")
			);
			$('.gest').css('width',20);
			$('.gest').css('height',20);
			$('.gest').css('margin-right','5px');
			$('.gest').css('border-radius','50%');

		}else{
			$('#comment' + i).append(
				("<br>"),
				$("<img id='commenter_icon"+i+"'>")
					.attr("src","../../User/"+ data[0]['commentData'][i]['userName'] +"/icon.png"),
				("<p1>"+" "+ data[0]['commentData'][i]['userName'] +"&emsp;&emsp;"+data[0]['commentData'][i]['commentInsertAt']+"</p1>"),
				("<br>"),
				("<p2>"+" "+data[0]['commentData'][i]['comment'] +"</p2>"),
				("<br><br><br>")
			);
			$('#commenter_icon'+i).css('width',20);
			$('#commenter_icon'+i).css('height',20);
			$('#commenter_icon'+i).css('border-radius','50%');
		}
	sum = parseInt(sum) +  parseInt(data[0]['commentData'][i]['rank']);
	}



	//合計表示/////////////////////////////
	$div = $('.review_all');
	$div.empty();
	$div.append(
		("<h1>合計 : "+ data[0]['commentData'].length +"件</h1>"),
		("<div id = 'averageReview'></div>")
	);
	$('#averageReview').raty({
		readOnly : true,
		number : 5,
		hints: ['', '', '', '', ''],
		halfShow : true,
		score : (sum / data[0]['commentData'].length)
	});

	//レビューする部分を表示////////////////////////
	$div = $('.review');
	$div.empty();
	$div.append(
		("<h1>レビューをする</h1>"),
		("<div id = 'reviewErea'></div>"),
		("<input id = 'hint'type='hidden'value = '0' readonly>")
	);
	$('#reviewErea').raty({
		number : 5,
		hints: ['1', '2', '3', '4', '5'],
		targetScore : '#hint'
	});
	$div = $('.review_coment');
	$div.empty();
	$div.append(
		("<h1>コメントをする</h1>"),
		("<textarea name='comment'id='"+$imageId+"ComentErea' cols='40' rows='8'></textarea>"),
		("<button class='review_btn' id='"+$imageId+"' value='"+$userId+"'>レビュー</button>")
	);



  //ajax通信失敗時
  }).fail(function(XMLHttpRequest, textStatus, errorThrown){
	alert("error");
  });


});
//レビューボックス//
$('#review_btn').on('click', function(){
$('.review_box').toggleClass("review_right0");
});
//制作者コメントボックス//
$('#creator_btn').on('click', function(){
$('.creator_box').toggleClass("creator_right0");
});


// $('#review_btn').on('click', function(){
// $('.review_box').css({"right":"0"});
// });

//レビューボタン押下時//////////////////////////////////////////////////////////
$(document).on("click",".review_btn",function(){
	var $imageId = $(this).attr('id');
	var $createrId = $(this).attr('value');
	var $commenterId = sessionStorage.getItem('userId');
	var $point = $('#hint').attr('value');
	var $comment = $('#'+ $imageId + 'ComentErea').val();

	String.prototype.bytes = function () {
	  return(encodeURIComponent(this).replace(/%../g,"x").length);
	}
	console.log("size = "+$comment.bytes());
	if($commenterId == null){}
	console.log($commenterId);
	if($commenterId == null){
		$commenterId = 0;
	}
	if($point == 0 || $comment.bytes() == 0){
		alert("レビュー点数とコメントをつけてください。");
	}else if($comment.bytes() > 600){
		alert("投稿できるコメントのサイズは600byteまでです。\n文字数を減らしてください。\n" +
				"現在"+$comment.bytes()+"byteです。");
	}else{

		$comment = $comment.replace(/\r?\n/g, '<br />');
		var param = {
			  0:$imageId,
			  1:$createrId,
			  2:$commenterId,
			  3:$point,
			  4:$comment
		};
		var data = {'model':'images','action':'insertReview','data':param};
		//ajax通信
		$.ajax({
			url:"../../Api/controller.php",
			dataType:'json',
			type:"POST",
			data:data
		//ajax通信成功時
		}).done(function(data){
		  console.log(data);

		var $div;
		//レビューコメント表示/////////////////////
			$div = $('.past_coment');
			$div.empty();
			$div.append(
				("<div id='commentPreview' style='overflow: auto; width: 500px; height: 160px'></div>")
			);
			var sum = 0;
			for(var i = 0;i<data.length;i++){
				$('#commentPreview').append(
					("<div id ='comment"+ i +"'</div>")
				);
				$('#comment' + i).raty({
					readOnly : true,
					hints: ['', '', '', '', ''],
					number : 5,
					score : data[i]['rank']
				});

				if( data[i]['userName'] == ""){
					$('#comment' + i).append(
						("<br>"),
						("<img src='../Images/user.png' class='gest'><p1>GestUser</p1>"),
						("<br>"),
						("<p2>"+" "+data[i]['comment'] +"</p2>"),
						("<br><br><br>")
					);
					$('.gest').css('width',20);
					$('.gest').css('height',20);
					$('.gest').css('margin-right','5px');
					$('.gest').css('border-radius','50%');
				}else{
					$('#comment' + i).append(
						("<br>"),
						$("<img id='commenter_icon"+i+"'>")
							.attr("src","../../User/"+ data[i]['userName'] +"/icon.png"),
						("<p1>"+" "+ data[i]['userName'] +"</p1>"),
						("<br>"),
						("<p2>"+" "+data[i]['comment'] +"</p2>"),
						("<br><br><br>")
					);
					$('#commenter_icon'+i).css('width',20);
					$('#commenter_icon'+i).css('height',20);
					$('#commenter_icon'+i).css('border-radius','50%');
				}
				sum = parseInt(sum) +  parseInt(data[i]['rank']);
			}

			//レビュー合計表示/////////////////////////////
			$div = $('.review_all');
			$div.empty();
			$div.append(
				("<h1>レビュー合計 : "+ data.length +"件</h1>"),
				("<div id = 'averageReview'></div>")
			);
			$('#averageReview').raty({
				readOnly : true,
				number : 5,
				hints: ['', '', '', '', ''],
				halfShow : true,
				score : (sum / data.length)
			});

			//レビューする部分を表示////////////////////////
			$div = $('.review');
			$div.empty();
			$div.append(
				("<h1>レビューをする</h1>"),
				("<div id = 'reviewErea'></div>"),
				("<input id = 'hint'type='hidden'value = '0' readonly>")
			);
			$('#reviewErea').raty({
				number : 5,
				hints: ['1', '2', '3', '4', '5'],
				targetScore : '#hint'
			});
			$div = $('.review_coment');
			$div.empty();
			$div.append(
				("<h1>コメントをする</h1>"),
				("<textarea name='comment'id='"+$imageId+"ComentErea' cols='40' rows='8'></textarea>"),
				("<button class='review_btn' id='"+$imageId+"' value='"+$createrId+"'>レビュー</button>")
			);

	  //ajax通信失敗時
	  }).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert("error");
	  });
	}
});

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

$('.mail_btn').on("click",function(){
	var mail = $('.mail_text').val();
	var data = { 'model':'users', 'action':'lostPass', 'data': mail };

	alert(mail);
	$.ajax({
		url:"../../Api/controller.php",
		dataType:'json',
		type:"POST",
		data:data,
		timeout:1000
	}).done(function(data){
		alert('aa');
	}).fail(function(data){
		alert(JSON.stringify(data));
	});
});
