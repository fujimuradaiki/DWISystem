<?php
require_once('connectdb.php');
header('Content-type: application/json');

class users{

    public function controller($postAction,$postData){
        if($postAction == "userList"){
            $this->userList($postData);
            exit();
        }else if($postAction == "userInfo"){
            $this->userInfo($postData);
            exit();
        }else if($postAction == "insert"){
            $this->insert($postData);
            exit();
        }else{
            echo "「users.php」関数がありません";
            exit();
        }

    }
///////////////////////////////////////////////////////////////////////////////////
    //ユーザーリスト
    public  function userList($postData){
        $pdo = new connectdb();
        $sql = "select user_id,user_name from users";
        $data = array();
        if($postData[0] !="" ){
            $sql .= " WHERE user_name LIKE "."'%$postData[0]%'";
        }
       //echo $sql;
        $result = $pdo->dbo->query($sql);
        while ($val = $result->fetch(PDO::FETCH_ASSOC)){
            $data[] = array(
                "userId" => $val['user_id'],
                "userName" => $val['user_name']
            );
        }
        $userNullCheck = is_null($data[0]['userId']);
        if(!($userNullCheck)){
            echo json_encode($data);
        }else{
            echo "該当するレコードがありません";
        }
    }
///////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////
    //user詳細 0:userID   1:ページ番号
    public function userInfo($postData){
        $pdo = new connectdb();
        $datas = array();
        $userData = array();
        $iamgeData = array();

        $user_id = $postData[0];//userID
        $pageNamber = $postData[1];      //ページ番号番号
        $imageSearch = $postData[2];//タイトル名で検索
        $max = $pageNamber * 12;
        $min = $max - 12;
        $likeSq = "";

        $limitSql =  " LIMIT ".$min.",".$max;
        if($postData[2] != ""){
            $likeSq = " AND image_title LIKE " ."'%$imageSearch%'";
        }
        $sql = "SELECT
                user_id,
                user_name,
                image_id,
                image_title
                FROM
                images AS images
                LEFT JOIN
                users AS users
                ON
                image_user_id = user_id
                WHERE
                user_id=".
                $user_id;

        $sql .= $likeSq.$limitSql;
       // echo $sql;
        $result = $pdo->dbo->query($sql);

        while($val = $result->fetch(PDO::FETCH_ASSOC)){
            $userData[] = array(
                "userId"=>$val['user_id'],
                "userName"=>$val['user_name']
            );
            $iamgeData[] = array(
                "imageId"=>$val['image_id'],
                "imageTitle"=>$val['image_title']
            );
        };

        $datas[] = array(
            'userData'=> $userData,
            'iamgeData'=>$iamgeData
        );

        $userNullCheck = is_null($datas[0]['userData'][0]['userId'][0]);
        $imageNullCheck = is_null($datas[0]['iamgeData'][0]['imageId'][0]);

        if(!($userNullCheck && $imageNullCheck)){
            echo json_encode($datas);
        }else{
            echo "該当するレコードがありません";
        }
    }

    //////////////////////////////////////////////////////////////
    //新規作成
    public  function insert($postData){
    $pdo = new connectdb();
    $postData = array("'test3'","'aaaa'","'2011/01/01 12:00:00'","'aaaa@sss.ss'");
    $sql = "insert
            into
            usersCP(
            user_name,
            password,
            user_insert_at,
            user_mail
            )VALUES("
            .$postData[0].","
            .$postData[1].","
            .$postData[2].","
            .$postData[3]
            .")";
   //  echo $sql;
//      $stmt=$pdo->dbo->prepare($sql);
//      $resultFlg = $stmt->execute();
            $resultFlg = false;
     if($resultFlg == true){
        echo "新規登録ありがとうございます。";
     }else{
         $a = md5( $postData[4] );
         $b = crypt($a);
         $d = crypt($a);
         $c = md5( $a );
         echo($a."\n".$c."\n".$b."\n".$d);
       // echo  "新規登録に失敗しました。";
     }
    }
////////////////////////////////////////////////////////////////////////
    //フォルダの作成
    public function createDirectory(){
        $result = "";
        $directoryName = 'test';
        //フォルダパスを作成
        $directoryPath = '../User/test'.$directoryName;
        //フォルダの存在確認
        if(!(file_exists($directoryPath))){
            $result="ディレクトリを作成します\n";
            //ディレクトリ作成処理
            if(mkdir($directoryPath,0777)){
                //作成したディレクトリのパーミッションの変更（一応）
                chmod($directoryPath,0777);
                $result="作成が完了しました";
            }else{
                $result="作成に失敗しました";
            }
        }else{
            $result ="そのディレクトリはすでに存在します";
        }
        echo $result."\n".$directoryPath;

    }
}