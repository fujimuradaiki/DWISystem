<?php
require_once ('connectdb.php');
require_once ('users.php');
require_once ('images.php');

header('Content-type: application/json');
if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
   //     echo json_encode("hit");
  //  echo json_encode($_FILES['testimg']);

//        $classname = new $_POST['model'];
//$hitArray = array();

//for($a = 0; $a < 3; $a++){
//        if(isset($_FILES) && $_FILES['testimg']['name'][$a] != ""){
//            $hitArray[$a] = $_FILES['testimg']['name'][$a];
//         echo json_encode($_FILES['testimg']);
//         echo json_encode($_POST['data']);
         //$classname->controller($_POST['action'],$_POST['data'].$_FILES);
//        }else{
//            $hitArray[$a] = "false";
            //$classname->controller($_POST['action'],$_POST['data']);
//        }
//}
//echo json_encode($hitArray);


        //if($_FILES['testimg']['name']){
            //echo json_encode($_FILES['testimg']);
            // echo json_encode($_POST['data']);

        //}else{
        //    echo json_encode("失敗");
        //}

///////////////////////////////////////
    $classname = new $_POST['model'];
    $data = $_POST['data'];

//     //画像データが送信されているか？
     if(isset($_FILES) && $_FILES['testimg']['name'] != ""){
         $data = str_replace('data:image/png;base64,', '', $data);
         $dataArray= explode(",", $data);

         $classname->controller($_POST['action'],$dataArray,$_FILES['testimg']);
     }else {

         if($_POST['action'] == "insert" || $_POST['action'] == "update"){
             $data = str_replace('data:image/png;base64,', '', $data);
             $dataArray= explode(",", $data);
             $classname->controller($_POST['action'],$dataArray,$_FILES['testimg']);
         }else{
             $classname->controller($_POST['action'],$data);
         }
//          if(is_array($data)){
//              $type = str_replace('data:image/', '', $encode);
//              $type = substr($type, 0, strpos($type,";"));
//              $classname->controller($_POST['action'],$data);
//          }else{
//              $dataArray = explode(",", $data);
//              echo json_encode($dataArray[3]);
//          }
     }
}else{
   // echo json_encode('err');
    $classname = new users();
    $classname->lostPass("imaizumi01281@gmail.com");
}
?>