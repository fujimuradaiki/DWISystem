<?php
require_once ('connectdb.php');
require_once ('users.php');
require_once ('images.php');

header('Content-type: application/json');
if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
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
    //画像データが送信されているか？
     if(isset($_FILES) && $_FILES['testimg']['name'] != ""){

         $dataArray= explode(",", $data);
        // echo json_encode($dataArray);
        //$classname->controller($_POST['action'],$dataArray);
         $classname->controller($_POST['action'],$dataArray,$_FILES['testimg']);
     }else{
       //  $classname->controller($_POST['action'],$_POST['data']);


     }
}else{
    echo "controller.php:::エラー";
}
?>