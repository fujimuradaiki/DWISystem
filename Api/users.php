<?php
require_once('connectdb.php');
header('Content-type: application/json');

class user{
    public function controller($postAction){
        if($postAction == "test"){
            testA();
            exit();
        }else;{
            echo "「users.php」関数がありません";
            exit();
        }
    }
    public  function testA(){
        $pdo = new connectDB();
       // echo "test!!";
    }

}