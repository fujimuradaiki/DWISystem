
$(document).on("click",".delete_btn2",function(){
	console.log("hit");
//	//ajax通信で登録されている内容をテキストボックスに表示する
//	var userId = sessionStorage.getItem('userId');
//	var userName = sessionStorage.getItem('userName');
//	console.log(userId,userName);
//
//	var param = [];
//	param[0] = userId;
//	param[1] = userName;
//
//	 var data = {'model':'users','action':'delete','data':param};
//	 console.log(data);
//	//ajax通信
//	$.ajax({
//		url:"../../Api/controller.php",
//		dataType:'json',
//		type:"POST",
//		data:data
//	//ajax通信成功時
//	}).done(function(data){
//
//	//ajax通信失敗時
//	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
//		alert("error");
//	});
});