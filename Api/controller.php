<?php
require_once ('connectdb.php');
require_once ('users.php');
require_once ('images.php');

header('Content-type: application/json');
if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
       $classname = new $_POST['model'];

       $inputFiles = false;
       for( $i = 0;$i<count($_FILES["upload_file"]['name']);$i++){
           if($_FILES["upload_file"]['tmp_name'][$i] != ""){
               $inputFiles = true;
               break;
           }
       }

       //画像ファイルが送られていたら
       if($inputFiles){
           $classname->controller($_POST['action'],$_POST['data'],$_FILES["upload_file"]);
       }else{
           $classname->controller($_POST['action'],$_POST['data']);
       };

}else{
    echo "controller.php:::エラー";

//          $test_model = 'images';
//          $test_action = 'insertImage';
//          $test_data = '';
//          $classname = new $test_model;
//          $inputFiles = false;
//          for( $i = 0;$i<count($_FILES["upload_file"]['name']);$i++){
//              if($_FILES["upload_file"]['tmp_name'][$i] != ""){
//                  $inputFiles = true;
//                  break;
//              }
//          }
//          // $classname->controller($test_action,$test_data);
//          if($inputFiles){
//              $classname->controller($test_action,$test_data,$_FILES["upload_file"]);
//          }else{
//              $classname->controller($test_action,$test_data);
//          };


}
?>