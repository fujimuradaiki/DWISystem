$(document).ready(function() {

$('.login_btn').click(function(){
  $('.login_view').fadeIn();
  $('body').addClass("overflow");
});

$('.login_btn2').click(function(){
  $('.login_view').fadeIn();
  $('body').addClass("overflow");
});

$('.login_btn4').click(function(){
  $('.login_view').fadeIn();
  $('body').addClass("overflow");
});

// /*ボタンを押したとき新規登録画面を表示させる*/
// $('.new_btn').click(function(){
//   $('.new_view').fadeIn();
//   $('body').addClass("overflow");
// });
/*ボタンを押したとき新規登録確認画面を表示させる*/
  $('.confirmation_btn').on('click', function(){
  $('.new_confirmation_view').fadeIn();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});

//$('.confirmation_btn').click(function(){
//  $('.new_confirmation_view').fadeIn();
//  $('body').addClass("overflow");
//});

/*新規登録確認からもどるぼたんがおされたときに新規登録へ戻る*/
$('.return_btn').click(function(){
  $('.new_view').fadeIn();
  $('body').addClass("overflow");
  //$('#trimming_view_img').remove();
});
// /*登録ボタンを押したとき登録完了画面を表示させる*/
// $('.touroku_btn').click(function(){
//   $('.new_touroku_view').fadeIn();
//   $('body').addClass("overflow");
// });

// $('.Editing_btn').click(function(){
//   $('.Editing_view').fadeIn();
//   $('body').addClass("overflow");
// });



//$('.toukou_btn').click(function(){
//  $('.toukou_view').fadeIn();
//  $('body').addClass("overflow");
//});


//$('.storage_btn').click(function(){
//  $('.storage_view').fadeIn();
//  $('body').addClass("overflow");
//});

$('.delete_btn2').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.delete_view').fadeIn();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});



$('.trimming_btn').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  //$('.trimming_view').fadeIn();//view���t�F�[�h�A�E�g����//
  //$('body').removeClass("overflow");
});

 // $('.Completion_btn').click(function(){//.close_btn img���N���b�N�����Ƃ�//
 //   $('.delete_Completion_view').fadeIn();//view���t�F�[�h�A�E�g����//
 //   $('body').removeClass("overflow");
 // });

// close�{�^��//



$('.close_btn img').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.lightbox_view,.login_view,.new_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});

$('.login_close_btn img').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.login_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});


$('.new_close_btn img').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.new_view,.new_confirmation_view,.new_touroku_view,.toukou_view,.login_Comp_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});


$('.storage_close_btn img').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.storage_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});


$('.Editing_close_btn img').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.Editing_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});

$('.close_btn2').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.login_view,.new_view,.new_touroku_view,.storage_view,.toukou_view,.login_Comp_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});

$('.confirmation_btn').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.new_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});
$('.return_btn').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.new_confirmation_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});

$('.touroku_btn').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.new_confirmation_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});


$('.close_btn2').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.delete_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});

$('.delete_close_btn').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.delete_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});

$('.delete_btn2').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.Editing_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});

$('.Completion_btn').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.delete_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});

$('.login_btn4').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.new_touroku_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});

$('.trimming_close_btn').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.trimming_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});

$('.trimming_delete_btn').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.trimming_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});




/*$('.storage_btn').click(function(){//.close_btn img���N���b�N�����Ƃ�//
  $('.Editing_view,.lightbox_view').fadeOut();//view���t�F�[�h�A�E�g����//
  $('body').removeClass("overflow");
});*/



});
