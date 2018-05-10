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

})


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
