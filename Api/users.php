<?php
require_once('connectdb.php');
header('Content-type: application/json');

class users{

    public function controller($postAction,$postData,$postImage = null){

        switch ($postAction){
            case "userList":
                $this->userList($postData);
                break;
            case "userInfo":
                $this->userInfo($postData);
                break;
            case "insert":
                $this->insert($postData,$postImage);
                break;
            case "login":
                $this->login($postData);
                break;
            default:
                echo "users.php ユーザー定義関数に該当しませんでした";
                break;
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
    public  function insert($postData,$postImage = null){
    $pdo = new connectdb();
    $insert_at=  date("Y/m/d H:i:s");//日時
    //$postData = array("'test9'","i","'555@sss.ss'");
    //passの暗号化
    $pass = md5( $postData[1] );

    $sql = "insert
            into
            users(
            user_name,
            password,
            user_insert_at,
            user_mail
            )VALUES("
            .$postData[0].","
            ."'$pass'".","
            ."'$insert_at'".","
            .$postData[2]
            .")";
          //echo $sql;
        //新規登録名でフォルダ名を検索
        if($this->searchDirectory($postData[0])){
            //SQL実行
            $stmt=$pdo->dbo->prepare($sql);
            $resultFlg = $stmt->execute();
            $resultFlg = true;
            if($resultFlg == true){
                $this->createDirectory($postData[0]);
                $this->icon($postData[0],$postImage);
                echo "true";
             }
        }else{
         //echo json_encode($postData[1]);
         echo  "false";
     }
    }
////////////////////////////////////////////////////////////////////////

    public function searchDirectory($userName){
        $result = "";
        $directoryName = str_replace("'", "", $userName);
        //フォルダパスを作成
        $directoryPath = '../User/'.$directoryName;
        //フォルダの存在確認
        if(!(file_exists($directoryPath))){
            $result="ディレクトリを作成します\n";
            //ディレクトリ作成処理
           return true;
        }else{
            //$result ="そのディレクトリはすでに存在します";
           // echo $directoryPath;
            return false;
        }
        //echo $result."\n".$directoryPath;

    }
    //フォルダの作成
    public  function createDirectory($userName){
        $directoryName = str_replace("'", "", $userName);
        $directoryPath = '../User/'.$directoryName;
        if(mkdir($directoryPath,0777)){
            //作成したディレクトリのパーミッションの変更（一応）
            chmod($directoryPath,0777);
            //$result="作成が完了しました";
            return true;
        }else{
            //$result="作成に失敗しました";
            return false;
        }
    }
    //アイコン画像移動
    public  function icon($userName,$postImage){
        if( isset($postImage)){
                $userName = str_replace("'", "", $userName);
                //移動先パス
                $directoryPath = '../User/'.$userName.'/';
                $newName = "icon.png";
                //パスに新しい名前結合
                $directoryPath .= $newName;
                if( $error == UPLOAD_ERR_OK ){
                    //新しい名前で画像が移動したか
                    if(move_uploaded_file($postImage['tmp_name'][0],$directoryPath)){
                        return true;
                    }else{
                        echo "アイコンが保存できませんでした";
                    }
                }
        }

    }
//////////////////////////////////////////////////////////////////////////////////
    //ログイン 0:userName 1:password   メールアドレスでのログイン 0:mail 1:psaaword
    public function login($postData){
       // $postData = array("aaaa@sss.ss","'aaaa'");
        $pdo = new connectdb();
        $sql = "SELECT * FROM users WHERE ";
        $pass = "";

        if($postData[0] != "" && $postData[1] != ""){
            $userPass = $postData[1];
            $pass = md5( $userPass );

            if(!(strpos($postData[0],'@'))){
                $userName = $postData[0];
                $sql .= "user_name ="."'$userName'";
                $userdata = array();
            }else{
                $mail =$postData[0];
                $sql .= "user_mail =  " . "'$mail'";
            }
        }else{
            echo "名前またはパスワードに問題があります";
            exit();
        }

        $stmt=$pdo->dbo->prepare($sql);
       // echo $sql;
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if($pass != "" && $pass == $result['password']){
                $userdata = array(
                    "userId"=>$result['user_id'],
                    "user_name"=>$result['user_name']
                );
            }else{
                echo "ログインに失敗しました";
                exit();
            }
            echo json_encode($userdata);
    }
}