<?php
require_once ('connectdb.php');
require_once ('users.php');
require_once ('images.php');

header('Content-type: application/json');
if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){

///////////////////////////////////////
    $classname = new $_POST['model'];
    $data = $_POST['data'];

//     //画像データが送信されているか？
     if(isset($_FILES) && $_FILES['testimg']['name'] != ""){
         $data = str_replace('data:image/png;base64,', '', $data);
         $dataArray= explode(",", $data);

         $classname->controller($_POST['action'],$dataArray,$_FILES['testimg']);
     }else {
         if($_POST['action'] == "insert" || $_POST['action'] == "update" && $_POST['model'] == "users" ){

              $data = str_replace('data:image/png;base64,', '', $data);
              $dataArray= explode(",", $data);
              $classname->controller($_POST['action'],$dataArray,$_FILES['testimg']);
         }else{
             $classname->controller($_POST['action'],$data);
         }
     }
}else{
    echo json_encode('err');

}
?>