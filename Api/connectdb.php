<?php
$pdo  = new connectdb();
class connectdb{
    //データーベース接続のための変数宣言
//     private $DBuser ='root';
//     private $DBpass ='tgoda100100';
//     private $DBhost ='192.168.63.128';
//     private $DBname ='DWISystem_testdb';

//     private $DBuser ='server0531_user';
//     private $DBpass ='tgoda100100';
//     private $DBhost ='mysql1.php.xdomain.ne.jp';
//     private $DBname ='server0531_dwisystem';


    private $DBuser ='esmilehd_dtest';
    private $DBpass ='v2RS3LgD';
    private $DBhost ='sv6110.xserver.jp';
    private $DBname ='esmilehd_testdesign';

//     private $DBuser ='root';
//     private $DBpass ='Yq8jNrvJ';
//     private $DBhost ='localhost';
//     private $DBname ='DWISystem_testdb';


    public function __construct(){
        try{
            //データベースに接続
            $this->dbo = new PDO('mysql:host=localhost; dbname=DWISystem_testdb; charset=utf8mb4',$this->DBuser,$this->DBpass);
           // $this->dbo = new PDO('mysql:host='.$this->DBhost.';dbname='.$this->DBname.';charset=utf8mb4',$this->DBuser,$this->DBpass);
        }catch(PDOException $e){
            echo $e->getMessage();
            exit;
        };
    }
}
?>