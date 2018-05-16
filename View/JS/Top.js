/*
*************************************

*名前 : Top.js

*概要 : TopページのJavaScriptファイル

*作成日 : 2018/05/09

*作成者 : 藤村 大輝

*最終更新日 : 2018/05/16

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
	$('.NEW_btn').css("background-color","rgb(226, 49, 49)");
	//画像表示実行
	runSearch();


});


/*
///////////////////////////////////

*関数 再検索ボタンクリックで発火

*概要 再度検索を行い、画像表示

//////////////////////////////////
*/
$('#testButton').on("click",function(){
	console.clear();
	runSearch();
	console.log(getForm());
});


/*
///////////////////////////////////

*関数 表示された作品画像をクリック
      したら発火

*概要 画像詳細を仮表示する

//////////////////////////////////
*/
$(document).on("click",".images",function(){

	var src = $(this).attr('src');		//クリックした画像のアドレスを取得
	var $div = $('.lightbox_waku');		//詳細を仮表示する対象となるdiv
	var cols = 30;						//textareaの初期文字数(横)
	var rows = 10;						//testareaの初期文字数(縦)

	//表示中の画像を削除
	//$div.empty();

	$div.append($
			//クリックした画像と同じ画像を表示
			("<img id='preview'>").attr("src",src),
			//テキストエリアを作成し、書き込み不可属性を付与する
			("<textarea cols='"+cols+"'rows='"+rows+"'readonly>この画像は"+this.id+"です</textarea>")
	);
});


/*
///////////////////////////////////

 *関数 ファイルアップロードボタンが
       押された後に発火

 *概要 アップロードファイルの画像バリデート判定

//////////////////////////////////
*/
$('#file1').on("change",function(e){

	var file = e.target.files[0],
    reader = new FileReader(),
    $preview = $("#ImageInPutTest");
    t = this;

    // 画像ファイル以外の場合は何もしない
    // (.jpg .bmp .gif .png等は可)
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

    /*デバッグ用表示(ファイル名、サイズ、タイプを表示)////////////
	 */var file = $("#file1")[0].files[0];
	   var fileName = file.name;
	   var fileSize = file.size;
	   var fileType = file.type;
	   alert('ファイル名 : ' + fileName + '\nファイルサイズ : '
			+ fileSize + ' bytes\nファイルタイプ : ' + fileType);/*
	/////////////////////////////////////////////////////////////*/

});


/*
///////////////////////////////////

*関数 ソートボタン(新しい順)押下時

*概要 ソートボタンの色変更

//////////////////////////////////
*/
$('.NEW_btn').on("click",function(){
	if($(this).css("background-color") == "rgb(63, 58, 206)"){
		$(this).css("background-color","rgb(226, 49, 49)");
		$('.OLD_btn').css("background-color","rgb(63, 58, 206)");
		$('.POPULARTY_btn').css("background-color","rgb(63, 58, 206)");
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
		$(this).css("background-color","rgb(226, 49, 49)");
		$('.NEW_btn').css("background-color","rgb(63, 58, 206)");
		$('.POPULARTY_btn').css("background-color","rgb(63, 58, 206)");
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
		$(this).css("background-color","rgb(226, 49, 49)");
		$('.NEW_btn').css("background-color","rgb(63, 58, 206)");
		$('.OLD_btn').css("background-color","rgb(63, 58, 206)");
	}
});


/*
///////////////////////////////////

*関数 フィルタチェックボックス(全て)押下時

*概要 フィルタチェックボックスの状態変更

//////////////////////////////////
*/
$('#all').on("click",function(){

	if($("#all").prop("checked")){
		$("#chara").prop("checked",true);
		$("#backGround").prop("checked",true);
		$("#item").prop("checked",true);
	}else{
		$("#chara").prop("checked",false);
		$("#backGround").prop("checked",false);
		$("#item").prop("checked",false);
	}
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
	if($('.NEW_btn').css("background-color") == "rgb(226, 49, 49)"){
		sortType = 'insert_at:DESC';
	}else{
		if($('.OLD_btn').css("background-color") == "rgb(226, 49, 49)"){
			sortType = "insert_at:ASC";
		}else{
			if($('.POPULARTY_btn').css("background-color") == "rgb(226, 49, 49)"){
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

		var $div = $('.lightbox_waku');

		//表示中の画像を削除
		//$div.empty();

		for(var i = 0;i < data.length;i++){

			var userName = data[i].UserName;
			var imageId = data[i].Id;
			var categoryName = data[i].categoryName;
			var title = data[i].Title;
			var insert_at = data[i].Insert_at;

			//画像表示
			$div.append($

				 ("<img id='"+imageId+"'class='images'>")
				 	.attr("src","../../User/"+ userName +"/"+ imageId +".png"),
				// //("<a href='../../User/TestUser/i.png data-lightbox='gruop''></a>")

				/*デバッグ用にタイトルとカテゴリ名と投稿日時を表示////////////////
				("<p>" + title + " " + categoryName + " " + insert_at +"</p>")/*
				////////////////////////////////////////////////////////////////*/

			);
			//6件表示ごとに改行
			if((i+1) % 6 == 0){
			   $div.append("<br>");
			}
		}

	//ajax通信失敗時
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert("error");
	});
}
