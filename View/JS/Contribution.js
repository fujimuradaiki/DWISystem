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

$("#choice_btn2").on("change",function(e){
	var file = e.target.files[0],
    reader = new FileReader(),
    $preview = $(".toukou_images2");
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
$("#choice_btn3").on("change",function(e){
	var file = e.target.files[0],
    reader = new FileReader(),
    $preview = $(".toukou_images3");
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

///////////////////////////////////////////////////////////////////////////////////////

$(".toukou_btn").on("click",function(){
	var userId = sessionStorage.getItem('userId');
	var userName = sessionStorage.getItem('userName');


	//console.log(userId,userName,$(".toukou_images1").children('img').attr('src'));
	var titles = [];
	titles[0] =$('.toukou_title1').val();
	titles[1] =$('.toukou_title2').val();
	titles[2] =$('.toukou_title3').val();
	var categorys = []
	categorys[0] =$('#Genre1').val();
	categorys[1] =$('#Genre2').val();
	categorys[2] =$('#Genre3').val();
	//配列に格納
	var imageInfo = [];
	imageInfo[0] = userName;
	imageInfo[1] = userId;
	imageInfo[2] = categorys;
	imageInfo[3] = titles;
	var images = [];
	images[0] = $(".toukou_images1").children('img').attr('src');
	images[1] = $(".toukou_images2").children('img').attr('src');
	images[2] = $(".toukou_images3").children('img').attr('src');
	var param = [];
	param[0] = imageInfo;
	param[1] = images;
		var data = {'model':'images','action':'insertImage','data':param};
		console.log(data);
		alert(data);
//		//ajax通信
		$.ajax({
			url:"../../Api/controller.php",
			dataType:'json',
			type:"POST",
			data:data,
		//ajax通信成功時
		}).done(function(data){
			console.log(data);
			if(data != false){
			alert("完了しました。");
			}else{
		    alert("失敗");
			}
		//ajax通信失敗時
		}).fail(function(XMLHttpRequest, textStatus, errorThrown){
			alert("error");
		});
});


$(".delete3_1_btn").on("click",function(e){
	console.log("hit");
	$(".toukou_images1").empty();
});