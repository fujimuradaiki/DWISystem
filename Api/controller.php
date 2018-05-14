<?php
require_once ('connectdb.php');
require_once ('users.php');
require_once ('images.php');

header('Content-type: application/json');
if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){

        $classname = new $_POST['model'];
        $classname->controller($_POST['action'],$_POST['data']);
}else{
    echo "else!";

      //  $test_model = 'images';
       // $test_action = 'imageList';
       // $test_data = '';
       // $classname = new $test_model;
      //  $classname->controller($test_action,$test_data);

}
?>