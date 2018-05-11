/*
*************************************

*名前 : Top.js

*概要 : TopページのJavaScriptファイル

*作成日 : 2018/05/09

*作成者 : 藤村 大輝

*最終更新日 : 2018/05/09

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


	//ajax/////////////////////////////////////////////////////////////////

	var data = {'model':'image','action':'imageList',data:getform()};
	console.log(data);
/*
	$ajax({
		url:"/DWISystem/Api/controller.php",
		dataType:'json',
		type:"POST",
		data:data
	}).done(function(data){
		alert(data);
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert("error");
	});

	/////////////////////////////////////////////////////////////////////*/



	//画像表示テスト
	var $div = $('#ImageOutPutTest');
	var userName = "TestUser";
	var id = 1;

	for(var i = 1;i <= 7;i++){
		$div.append($
			("<img>").attr("src",'/DWISystem_TEST/User/'+ userName +'/'+ i +'.png')
		);

		//5件ごとに改行させるテスト
		if(i % 5 == 0){
			$div.append("<br>");
		}
	}


});

//ボタン//////////////////////////////////////////////////////////////////
$('#testButton').on("click",function(){

	getform();
});




/*
///////////////////////////////////

 *関数名 InputButton on click

 *概要 アップロード画像選択

//////////////////////////////////
*/
$('#file1').on("change",function(e){

	var file = e.target.files[0],
    reader = new FileReader(),
    $preview = $("#ImageInPutTest");
    t = this;

    // 画像ファイル以外の場合は何もしない
    if(file.type.indexOf("image") < 0){
    	alert("画像じゃないべよ");
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
	console.log(param);
	return param;
}


