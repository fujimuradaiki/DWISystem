<?php

class connectdb{
    //データーベース接続のための変数宣言
    private $DBuser ='root';
    private $DBpass ='tgoda100100';
    private $DBhost ='localhost';
    private $DBname ='DWISystem_testdb';

    public  $dbo;

    public function __construct(){
        try{
            //データベースに接続
            $this->dbo = new PDO('mysql:host=localhost; dbname=DWISystem_testdb; charset=utf8mb4',$this->DBuser,$this->DBpass);

        }catch(PDOException $e){
            echo $e->getMessage();
            exit;
        };
    }
}
