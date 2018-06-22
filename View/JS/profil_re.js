
$(document).ready(function(){
	if(sessionStorage.getItem('trimmingImage') == null){
		alert('dd');
		$('.new_image').append($('<img>')
				       .attr({'src': sessionStorage.getItem('originalImage'), 'width': '200', 'height': 200}));






	}

	$('#sineUp_account_name').val(sessionStorage.getItem('signUp_account_name'));
	$('#sineUp_user_name').val(sessionStorage.getItem('signUp_user_name'));
	$('#sineUP_mail').val(sessionStorage.getItem('signUp_mail'));
	$('#sineUp_password1').val(sessionStorage.getItem('signUp_password1'));
	$('#sineUp_password2').val(sessionStorage.getItem('signUp_password2'));
});

$('.know_pass').click(function(){//.close_btn img���N���b�N�����Ƃ�//
    $('.pass_view').fadeIn();//view���t�F�[�h�A�E�g����//
    $('body').removeClass("overflow");
  });


  $('.know_pass').click(function(){//.close_btn img���N���b�N�����Ƃ�//
    $('.login_view').fadeOut();//view���t�F�[�h�A�E�g����//
    $('body').removeClass("overflow");
  });