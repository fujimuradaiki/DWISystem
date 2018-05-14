<?php

class connectdb{
    //データーベース接続のための変数宣言
    private $DBuser ='root';
    private $DBpass ='tgoda100100';
    private $DBhost ='192.168.63.128';
<<<<<<< HEAD
    private $DBname ='DWISystem_TESTdb';
=======
    private $DBname ='DWISystem_testdb';
>>>>>>> origin/imaizumi

    public  $dbo;

    public function __construct(){
        try{
            //データベースに接続
<<<<<<< HEAD
            $this->dbo = new PDO('mysql:host=192.168.63.128; dbname=DWISystem_TESTdb; charset=utf8mb4',$this->DBuser,$this->DBpass);
=======
            $this->dbo = new PDO('mysql:host=localhost; dbname=DWISystem_testdb; charset=utf8mb4',$this->DBuser,$this->DBpass);
>>>>>>> origin/imaizumi
        }catch(PDOException $e){
            echo $e->getMessage();
            exit;
        };
    }
}
?>