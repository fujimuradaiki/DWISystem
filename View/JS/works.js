$('.slider-wrapper').slick({
  adaptiveHeight: false,
  // �����Đ����邩 [�����l:false]
  autoplay: true
  // �����Đ��Ő؂�ւ����鎞��(�~���b) [�����l:3000]
});

/*
*************************************

*���O : Top.js

*�T�v : Top�y�[�W��JavaScript�t�@�C��

*�쐬�� : 2018/05/09

*�쐬�� : ���� ��P

*�ŏI�X�V�� : 2018/05/23

*�ŏI�X�V�� : ���� ��P

*************************************
*/



/*
///////////////////////////////////

 *�֐��� ready

 *�T�v �R���X�g���N�^

//////////////////////////////////
*/



$(document).ready(function(){
	$('.NEW_btn').css("background-color","rgb(46, 204, 250)");
	//�摜�\�����s
	runSearch();

	//���O�C�������ǂ������擾
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


});


/*
///////////////////////////////////

*�֐� �\�[�g�{�^��(�V������)������

*�T�v �\�[�g�{�^���̐F�ύX

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

*�֐� �\�[�g�{�^��(�Â���)������

*�T�v �\�[�g�{�^���̐F�ύX

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

*�֐� �\�[�g�{�^��(�l�C��)������

*�T�v �\�[�g�{�^���̐F�ύX

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

*�֐� �t�B���^�`�F�b�N�{�b�N�X(�S��)������

*�T�v �t�B���^�`�F�b�N�{�b�N�X�̏�ԕύX

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

	runSearch();
});


/*
///////////////////////////////////

*�֐� �t�B���^�`�F�b�N�{�b�N�X(�L�����N�^�[)������

*�T�v �t�B���^�`�F�b�N�{�b�N�X�̏�ԕύX

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

*�֐� �t�B���^�`�F�b�N�{�b�N�X(�w�i)������

*�T�v �t�B���^�`�F�b�N�{�b�N�X�̏�ԕύX

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

*�֐� �t�B���^�`�F�b�N�{�b�N�X(�A�C�e��)������

*�T�v �t�B���^�`�F�b�N�{�b�N�X�̏�ԕύX

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

*�֐��� getForm

*�T�v �t�H�[�����擾

*�߂�l �t�H�[�������i�[�����A�z�z��

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
	var $category2 = $("#backGround").prop("checked");				  //�`�F�b�N�̏�Ԃ��擾���ATrue or false������
	var $category3 = $("#item").prop("checked");

	//�擾�����t�H�[������A�z�z��Ɋi�[
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

*�֐��� runSearch

*�T�v �t�H�[������PHP�ɓn����
      PHP����Ԃ��Ă����������Ƃ�
      �摜�\��

//////////////////////////////////
*/
function runSearch(){

	var data = {'model':'images','action':'imageList','data':getForm()};

	/*�f�o�b�O�p�\��//////
	*/console.log(data);/*
	////////////////////*/

	//ajax�ʐM
	$.ajax({
		url:"../../Api/controller.php",
		dataType:'json',
		type:"POST",
		data:data
	//ajax�ʐM������
	}).done(function(data){
		console.log(data);
		var $div = $('.lightbox_waku');

		//�\�����̉摜���폜
		$div.empty();

		for(var i = 0;i < data.length;i++){

			var userName = data[i].UserName;
			var userId = data[i].userId;
			var imageId = data[i].Id;
			var categoryName = data[i].categoryName;
			var title = data[i].Title;
			var insert_at = data[i].Insert_at;

			//�摜�\��
			$div.append(
				("<div class='lightbox'id='"+ imageId + "Div'></div>")
			);
			var $num = $('#'+imageId+'Div');
			$num.append(

					$("<img id='"+imageId+"'class='images'value='"+userId+"'>")
					.attr("src","../../User/"+ userName +"/"+ imageId +".png"),

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


      if (window.matchMedia( "(max-width: 768px)" ).matches) {
      /* �E�B���h�E�T�C�Y�� 768px�ȉ��̏ꍇ�̃R�[�h�������� */
      //  ���̒������擾
      var widthBox = $(".lightbox").width();
      console.log(widthBox);
      $(".lightbox_waku .lightbox").css("height",widthBox);
      
      } else {
      /* �E�B���h�E�T�C�Y�� 768px�ȏ�̏ꍇ�̃R�[�h�������� */
      //�g���~���O
			trimmingImage($("#" + imageId),250);
      }
		}

		//float�����pdiv
		$div.append(
			("<div class='cle'></div>")
		);

	//ajax�ʐM���s��
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert("error");
	});
}

/*
///////////////////////////////////

*�֐��� trimmingImage

*�T�v �n���ꂽ�摜���g���~���O����

*���� img  : �摜��HTML��ł̏ꏊ
	  size : �g���~���O����T�C�Y

//////////////////////////////////
*/
function trimmingImage(img,size){
	//�g���~���O����
	var iw,ih;

	var w = img.width();	//�����擾
	var h = img.height();	//�c���擾

	//�����Əc�����������A�����̕��������ꍇ
	if(w >= h){
		iw = (size / h * w - size) / 2;
		img.height(size);
		img.css("top",0);
		img.css("left","-" + iw + "px");
	}
	//�c���̕��������ꍇ
	else{
		ih = (size / w * h - size) / 2;
		img.width(size);
		img.css("top","-" + ih + "px");
		img.css("left",0);
	}
}


/*
///////////////////////////////////

*�֐� �摜�ڍ׃t�H�[���̕���{�^���������ꂽ��

*�T�v �ēx������������

//////////////////////////////////
*/
$(document).on("click",".close_btn",function(){
	runSearch();
});


/*
///////////////////////////////////

*�֐� insert�t�H�[���̃��O�C���{�^��������

*�T�v �o���f�[�V�������s���A���Ȃ���΃��O�C����Ԃ�

//////////////////////////////////
*/
$(document).on("click",".login_btn3",function(){

	var text = $('.login_text').val();
	var pass = $('.pass_text').val();
	var param = [];
	param[0] = text;
	param[1] = pass;
	var data = {'model':'users','action':'login','data':param};

	//ajax�ʐM
	$.ajax({
		url:"../../Api/controller.php",
		dataType:'json',
		type:"POST",
		data:data
	//ajax�ʐM������
	}).done(function(data){

		if(data != "error"){
	//	alert(data['user_name']+"�Ń��O�C�����܂���");
	$('.login_Comp_view').fadeIn();
	$('body').removeClass("overflow");
		//���[�U�[id�ƃ��[�U�[�����X�g���[�W�ɕۑ�
		sessionStorage.setItem('userId',data['userId']);
		sessionStorage.setItem('userName',data['user_name']);

		//�A�C�R����\��
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
			alert("���O�C���Ɏ��s���܂���");
		}
	//ajax�ʐM���s��
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert(XMLHttpRequest['responseText']);
	});
});


/*
///////////////////////////////////

*�֐� �V�K�o�^�t�H�[���̊m�F�{�^��������

*�T�v �o���f�[�V�������s���A���Ȃ���ΐV�K�o�^

//////////////////////////////////
*/
$(document).on("click",".confirmation_btn",function(){

	var name = $('#sineUp_user_name').val();
	var mail = $('#sineUP_mail').val();
	var pass1 = $('#sineUp_password1').val();
	var pass2 = $('#sineUp_password2').val();

	var errorFlag = 0;
	var errorMsg = "���͓��e�ɕs��������܂��B\n\n";

	//���[�U�[���o���f�[�V����
	if(name == ""){
		errorFlag = 1;
		errorMsg = errorMsg + "�E���[�U�[���������͂ł��B\n";
	}else{
		if(!name.match(/^[��-��[�@�@-���������[��-�a-zA-Z0-9\r\n\t]*$/)){
			errorFlag = 1;
			errorMsg = errorMsg + "�E���[�U�[���ɋL����X�y�[�X�͎g���܂���B\n";
		}
	}

	//���[���A�h���X�o���f�[�V����
	if(mail == ""){
		errorFlag = 1;
		errorMsg = errorMsg + "�E���[���A�h���X�������͂ł��B\n";
	}else{
		if(!mail.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)){
			errorFlag = 1;
			errorMsg = errorMsg + "�E���[���A�h���X�̌`�����Ԉ���Ă��܂��B\n";
		}
	}

	//�p�X���[�h�o���f�[�V����
	if(pass1 == "" || pass2 == ""){
		errorFlag = 1;
		errorMsg = errorMsg + "�E�p�X���[�h�������͂ł��B\n";
	}else{
		if(pass1 == pass2){
			if(!pass1.match(/^[a-zA-Z0-9]+$/)){
				errorFlag = 1;
				errorMsg = errorMsg + "�E�p�X���[�h�͔��z�p�����݂̂ł��B\n";
			}
		}else{
			errorFlag = 1;
			errorMsg = errorMsg + "�E���͂��ꂽ�p�X���[�h�ƃp�X���[�h�Ċm�F����v���܂���B\n";
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
		//ajax�ʐM
		$.ajax({
			url:"../../Api/controller.php",
			dataType:'json',
			type:"POST",
			data:data,
		//ajax�ʐM������
		}).done(function(data){
			console.log(data);
			if(data != false){
			  $('.new_touroku_view').fadeIn();
			  $('body').addClass("overflow");
			// alert("�V�K�o�^���������܂����B");
			$('#sineUp_user_name').val('');
			$('#sineUP_mail').val('');
			$('#sineUp_password1').val('');
			$('#sineUp_password2').val('');
			$("#choice_btn").val('');
			}else{
		    alert("�o�^�������łɎg�p����Ă��܂��B");
			}
		//ajax�ʐM���s��
		}).fail(function(XMLHttpRequest, textStatus, errorThrown){
			alert("error");
		});
});


///////////////////////////////////////////////////////////////////////////////
$("#choice_btn").on("change",function(e){
	var file = e.target.files[0],
    reader = new FileReader(),
    $preview = $(".new_image");

    // png�t�@�C���ȊO�̏ꍇ�͉������Ȃ�
    if(file.type.indexOf("png") < 0 || file.size > 5500000){
    	alert("png�ȊO�̃t�@�C���͗��p�ł��܂���B");
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
    $(window).ready(function(){
  			$('#Zoomer').zoomer();
  	});
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
  //ajax�ʐM
  $.ajax({
	url:"../../Api/controller.php",
	dataType:'json',
	type:"POST",
	data:data
  //ajax�ʐM������
  }).done(function(data){
	console.log(data);

	$imageTitle = data[0]['usersData'][0]['imageTitle'];
	$creatorName = data[0]['usersData'][0]['creatorName'];

	//5�i�K�]���Ɏg�����摜�̏ꏊ�𖾎�
	$.fn.raty.defaults.path = "../Lib/images";

	//�摜�ڍׂ�\��////////////////////
	var $div = $('.lightbox_left_image');
	$div.empty();
	$div.append(
			$("<img class='view_image'>")
			.attr("src","../../User/"+ $creatorName +"/"+ $imageId +".png")
	);
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
	//���[�U�[�A�C�R���\��//////////////////
	$div = $('.user_icon');
	$div.empty();
	$div.append(
			$("<img class='view_icon'>")
			.attr("src","../../User/"+ $creatorName +"/icon.png")
	);
	$('.view_icon').css('width',50);
	$('.view_icon').css('height',50);
	$('.view_icon').css('border-radius','50%');

	//��Җ��\��////////////////////////
	$div = $('.user_name');
	$div.empty();
	$div.append("{{creatorName}}");
	var drowCreatorName = new Vue({
		el : '.user_name',
		data :{
			creatorName : "illustration by "+ $creatorName
		}
	})


	//��i�^�C�g���\��////////////////////////
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
	})

	//���r���[�R�����g�\��/////////////////////
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
				("<p1>"+" "+ data[0]['commentData'][i]['userName'] +"</p1>"),
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



	//���v�\��/////////////////////////////
	$div = $('.review_all');
	$div.empty();
	$div.append(
		("<h1>���v : "+ data[0]['commentData'].length +"��</h1>"),
		("<div id = 'averageReview'></div>")
	);
	$('#averageReview').raty({
		readOnly : true,
		number : 5,
		hints: ['', '', '', '', ''],
		halfShow : true,
		score : (sum / data[0]['commentData'].length)
	});

	//���r���[���镔����\��////////////////////////
	$div = $('.review');
	$div.empty();
	$div.append(
		("<h1>���r���[������</h1>"),
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
		("<h1>�R�����g������</h1>"),
		("<textarea name='comment'id='"+$imageId+"ComentErea' cols='40' rows='8'></textarea>"),
		("<button class='review_btn' id='"+$imageId+"' value='"+$userId+"'>���r���[</button>")
	);



  //ajax�ʐM���s��
  }).fail(function(XMLHttpRequest, textStatus, errorThrown){
	alert("error");
  });


});


//���r���[�{�^��������//////////////////////////////////////////////////////////
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
		alert("���r���[�_���ƃR�����g�����Ă��������B");
	}else if($comment.bytes() > 600){
		alert("���e�ł���R�����g�̃T�C�Y��600byte�܂łł��B\n�����������炵�Ă��������B\n" +
				"����"+$comment.bytes()+"byte�ł��B");
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
		//ajax�ʐM
		$.ajax({
			url:"../../Api/controller.php",
			dataType:'json',
			type:"POST",
			data:data
		//ajax�ʐM������
		}).done(function(data){
		  console.log(data);

		var $div;
		//���r���[�R�����g�\��/////////////////////
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

			//���r���[���v�\��/////////////////////////////
			$div = $('.review_all');
			$div.empty();
			$div.append(
				("<h1>���r���[���v : "+ data.length +"��</h1>"),
				("<div id = 'averageReview'></div>")
			);
			$('#averageReview').raty({
				readOnly : true,
				number : 5,
				hints: ['', '', '', '', ''],
				halfShow : true,
				score : (sum / data.length)
			});

			//���r���[���镔����\��////////////////////////
			$div = $('.review');
			$div.empty();
			$div.append(
				("<h1>���r���[������</h1>"),
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
				("<h1>�R�����g������</h1>"),
				("<textarea name='comment'id='"+$imageId+"ComentErea' cols='40' rows='8'></textarea>"),
				("<button class='review_btn' id='"+$imageId+"' value='"+$createrId+"'>���r���[</button>")
			);

	  //ajax�ʐM���s��
	  }).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert("error");
	  });
	}
});

$(document).on("click",".logout",function(){
	$('.login_user_menu').fadeToggle();
	sessionStorage.removeItem('userId');
	sessionStorage.removeItem('userName');

	//�}�C�y�[�W�Ɖ摜���e�y�[�W�ȊO�̎��͏������� ��������
		$('.login_btn').css("display","inline-block");
		$('.new_btn').css("display","inline-block");
		$('.login_user_icon').css("display","none");
	//�����܂�
});
