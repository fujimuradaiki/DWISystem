<?php
require_once ('connectdb.php');
require_once ('users.php');
require_once ('images.php');

header('Content-type: application/json');
if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
        // $classname = new $_POST['model'];
        // $classname->controller($_POST['action'],$_POST['data']);

        //if($_FILES['testimg']['name']){
            //echo json_encode($_FILES['testimg']);
            echo json_encode($_POST['data']);

        //}else{
        //    echo json_encode("失敗");
        //}

}else{
    echo "controller.php:::エラー";
}
?>