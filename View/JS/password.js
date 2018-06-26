
$(document).ready(function(){

	var adrsid = location.search;
	adrsid = adrsid.substring(1);
	var idArray = adrsid.split('&',2);

	var data = {'model':'users', 'action':'remakeMail', 'data': idArray};

	$.ajax({
		url:"../../Api/controller.php",
		dataType:'json',
		type:"POST",
		data:data,
		timeout:1000
	//ajax通信成功時
	}).done(function(data){
		//console.log(data);
		if(!isNaN(data)){
			$('[name="userid"]').val(data);
			console.log(data);
		}else{
			alert(data);
			location.href = "../HTML/Top.html";
		}
	//ajax通信失敗時
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert("error");
	});
});


// 確認
$('.confirmation_btn').on('click', function(){
	var pass1 = $('#sineUp_password1').val();
	var pass2 = $('#sineUp_password2').val();
	var errorFlag = 0;
	var errorMsg = "入力内容に不備があります。\n\n";

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
		$('.confirmation_btn').css("visibility", "hidden");
		$('.return_btn').css("visibility", "visible");
		$('.touroku_btn').css("visibility", "visible");
		$('#sineUp_password1').prop("disabled", true);
		$('#sineUp_password2').prop("disabled", true);
	}
});

// 戻るボタン
$(document).on("click",".return_btn",function(){
	$('.confirmation_btn').css("visibility", "visible");
	$('.return_btn').css("visibility", "hidden");
	$('.touroku_btn').css("visibility", "hidden");
	$('#sineUp_password1').prop("disabled", false);
	$('#sineUp_password2').prop("disabled", false);
});

// 登録ボタン
$(document).on("click",".touroku_btn",function(){
	var param = [$('[name="userid"]').val() , $('#sineUp_password1').val()];
	var data = {'model':'users','action':'remakePass','data':param};
	$.ajax({
		url:"../../Api/controller.php",
		dataType:'json',
		type:"POST",
		data:data,
		timeout:1000
	//ajax通信成功時
	}).done(function(data){
		console.log(data);
		/*if(isNaN(data)){
			$('[name="userid"]').val(data);
			console.log(data);
		}else{
			alert(data);
			location.href = "../HTML/Top.html";
		}*/
	//ajax通信失敗時
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert("error");
	});
});