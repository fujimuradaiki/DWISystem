<?php
require_once ('connectdb.php');
require_once ('users.php');

header('Content-type: application/json');
if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
        $test_model = "user";
        $test_action = "test";
      //$classname = new $_POST['model'];
      //$classname->controller($_POST['action']);
        $classname = new $test_model;
        $classname->controller($test_action);

}else{
    echo "サーバーに接続できませんでした";

}
?>