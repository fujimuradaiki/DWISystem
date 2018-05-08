<?php
class user{

    public function controller($postAction){
        if($postAction == "test"){
            echo "test!!";
            exit();
        }else;{
            echo "「users.php」関数がありません";
            exit();
        }

    }

}