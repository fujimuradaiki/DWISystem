
$(document).on("click",".Completion_btn",function(){
	// 「OK」時の処理開始 ＋ 確認ダイアログの表示
	if($pass = window.prompt('パスワードを入力してください')){
		//ajax通信で登録されている内容をテキストボックスに表示する
		var userId = sessionStorage.getItem('userId');
		var userName = sessionStorage.getItem('userName');
		console.log(userId,userName);

		var param = [];
		param[0] = userId;
		param[1] = userName;
		param[2] = $pass;
		 var data = {'model':'users','action':'delete','data':param};
		 console.log(data);
		//ajax通信
		$.ajax({
			url:"../../Api/controller.php",
			dataType:'json',
			type:"POST",
			data:data
		//ajax通信成功時
		}).done(function(data){

			if(data == 'true'){
			$('.delete_Completion_view').fadeIn();
			$('body').removeClass("overflow");
			sessionStorage.removeItem('userId');
			sessionStorage.removeItem('userName');

			}else{


			}
		//ajax通信失敗時
		}).fail(function(XMLHttpRequest, textStatus, errorThrown){
			alert("error : " + textStatus);
		});


	}
	else{
		window.alert('キャンセルされました'); // 警告ダイアログを表示
	}

});