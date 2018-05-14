/*
*************************************

*名前 : Top.js

*概要 : TopページのJavaScriptファイル

*作成日 : 2018/05/09

*作成者 : 藤村 大輝

*最終更新日 : 2018/05/11

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

	runSearch();


});

//フォーム情報取得ボタン(コンソール表示)//////////////////////////////////////////////////////////////////
$('#testButton').on("click",function(){
	console.clear();
	runSearch();
	console.log(getform());
});




/*
///////////////////////////////////

 *関数名

 *概要 アップロードファイルの画像判定

//////////////////////////////////
*/
$('#file1').on("change",function(e){

	var file = e.target.files[0],
    reader = new FileReader(),
    $preview = $("#ImageInPutTest");
    t = this;

    // 画像ファイル以外の場合は何もしない
    if(file.type.indexOf("image") < 0){
    	alert("画像を選択してください");
    	return false;
    }

    reader.onload = (function(file) {
    	return function(e) {
    		$preview.empty();
    		$preview.append($('<img>').attr({
    			src: e.target.result,
    			width: "150px",
    			class: "preview",
    			title: file.name
    		}));
    	};
    })(file);

    reader.readAsDataURL(file);


	 var file = $("#file1")[0].files[0];
	 var fileName = file.name;
	 var fileSize = file.size;
	 var fileType = file.type;
	 alert('ファイル名 : ' + fileName + '\nファイルサイズ : ' + fileSize + ' bytes\nファイルタイプ : ' + fileType);

});


/*
///////////////////////////////////

*関数名 getform

*概要 フォーム情報取得

*戻り値 フォーム情報を格納した連想配列

//////////////////////////////////
*/
function getform(){
	var $sortType = $("input[name='sortType']:checked").val();
	var $category1 = $("#c1").prop("checked");
	var $category2 = $("#c2").prop("checked");
	var $category3 = $("#c3").prop("checked");


	var param = {
		0:{name:'sortType',value:$sortType},
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
	var data = {'model':'images','action':'imageList',data:getform()};
	console.log(data);
	$.ajax({
		url:"../../Api/controller.php",
		dataType:'json',
		type:"POST",
		data:data
	}).done(function(data){
		var $div = $('#ImageOutPutTest');

		//表示中の画像を削除
		$div.empty();

		for(var i = 0;i < data.length;i++){

			var userName = data[i].userName;
			var imageId = data[i].id;
			var categoryName = data[i].categoryName;
			var title = data[i].title;
			var insert_at = data[i].insert_at;

			//画像表示
			$div.append($
				("<img>").attr("src","../../User/"+ userName +"/"+ imageId +".png"),
				//("<a href='../../User/TestUser/i.png data-lightbox='gruop''></a>")
				//仮でタイトルとカテゴリ名と投稿日時を表示
				("<p>" + title + " " + categoryName + " " + insert_at +"</p>")
			);



			//5件表示ごとに改行
			//if((i+1) % 5 == 0){
				//$div.append("<br>");
			//}
		}

	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert("error");
	});
}
