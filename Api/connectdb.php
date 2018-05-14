<?php

class connectDB{
    //データーベース接続のための変数宣言
    private $DBuser ='root';
    private $DBpass ='tgoda100100';
    private $DBhost ='192.168.63.128';
    private $DBname ='DWISystem_TESTdb';

    public  $dbo;

    public function __construct(){
        try{
            //データベースに接続
            $this->dbo = new PDO('mysql:host=192.168.63.128; dbname=DWISystem_TESTdb; charset=utf8mb4',$this->DBuser,$this->DBpass);
        }catch(PDOException $e){
            echo $e->getMessage();
            exit;
        };
    }
}
?>