<?php
require_once('connectdb.php');
header('Content-type: application/json');

class users{

    public function controller($postAction,$postData){

        switch ($postAction){
            case "userList":
                $this->userList($postData);
                break;
            case "userInfo":
                $this->userInfo($postData);
                break;
            case "insert":
                $this->insert($postData);
                break;
            case "login":
                $this->login($postData);
                break;
            case "update":
                $this->update($postData);
                break;
            case "profile":
                $this->profile($postData);
                break;
            case "delete":
                $this->delete($postData);
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
    public  function insert($postData){

    $pdo = new connectdb();
    $insert_at=  date("Y/m/d H:i:s");//日時
  //  $postData = array("t","t","555@sss.ss");
    //passの暗号化
    $pass = md5( $postData[1] );

    if(isset($postData[3])){
    $icon = $postData[3];
    }
    $sql = "insert
            into
            users(
            user_name,
            password,
            user_insert_at,
            user_mail
            )VALUES("
            ."'$postData[0]'".","
            ."'$pass'".","
            ."'$insert_at'".","
            ."'$postData[2]'"
            .")";
          //echo $sql;
        //新規登録名でフォルダ名を検索
        if($this->searchDirectory($postData[0])){
            //SQL実行
            $stmt=$pdo->dbo->prepare($sql);
            $resultFlg = $stmt->execute();
            //$resultFlg = true;
            if($resultFlg == true){
                $this->createDirectory($postData[0]);
                if(isset($postData[3])){
                $this->icon($postData[0],$icon);
                }
                echo "true";
             }
        }else{
          //  echo json_encode($postData);
         echo  "false";
     }
    }
////////////////////////////////////////////////////////////////////////
//フォルダ検索
    public function searchDirectory($userName){
        $result = "";
        $directoryName = str_replace("'", "", $userName);
        //フォルダパスを作成
        $directoryPath = '../User/'.$directoryName;
        //フォルダの存在確認
        if(!(file_exists($directoryPath))){
           // $result="ディレクトリを作成します\n";
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
    //フォルダの削除
    public  function deleteDirectory($userName){
        $directoryName = str_replace("'", "", $userName);
        $directoryPath = '../User/'.$directoryName;
        //echo $directoryPath;
        system("rm -rf {$directoryPath}");
        echo "削除されました";
    }
    //アイコン画像移動(base64)をデコードして画像保存
    public  function icon($userName,$icon){
        $directoryName = str_replace("'", "", $userName);
        $img = $icon;
        $type = str_replace('data:image/', '', $icon);
        $type = substr($type, 0, strpos($type,";"));
        $img = str_replace('data:image/'.$type.';base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $fileData = base64_decode($img);
        //拡張子の指定


        $fileName = '../User/'.$directoryName.'/icon'.'.'.$type;

        file_put_contents($fileName, $fileData);
    }
//////////////////////////////////////////////////////////////////////////////////
    //プロフィール編集
    public  function update($postData){
        $pdo = new connectdb();
        $update_at =  date("Y/m/d H:i:s");//日時
        //$postData = array(12,'v','w','w','aaaa@aaaa.aa.aa');

        $updateUserId = $postData[0];
        $oldName = $postData[6];
        $newName = $postData[1];
        $oldpass = $postData[2];
        $newPass = $postData[3];
        $newMail = $postData[4];
        $data = array();

        if(isset($postData[5])){
        $icon = $postData[5];
        }

            //暗号化
            $oldpass = md5( $oldpass);
            $newPass = md5( $newPass);
            $sql = "select user_name , password from users WHERE user_id =".$updateUserId;
            $stmt=$pdo->dbo->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $directoryPath = '../User/';
            if($result['user_name'] == $oldName){
            //入力されたパスワードがあってるか
            if($result['password'] == $oldpass){
                $sql = "UPDATE users SET "
                       ."user_name ="."'$newName'".","
                       ."password  = "."'$newPass'".","
                       ."user_mail = "."'$newMail'".","
                       ."user_update_at = "."'$update_at'"
                       ."WHERE user_id = ".$updateUserId;
                $stmt=$pdo->dbo->prepare($sql);
                $resultFlg = $stmt->execute();
                rename( $directoryPath.$result['user_name'], $directoryPath.$newName );
                if(isset($postData[5])){
                    unlink("../User/".$newName."/icon.png");
                    $this->icon($newName,$icon);
                }
                if($resultFlg == true){
                    $data = array( "userId"=>$updateUserId ,"userName"=>$newName);
                    echo ($data);
                }else{
                    echo "編集に失敗しました";
                }
            }else{
                echo "passエラー"."\n".$oldpass."\n".$result['password']."\n";

            }
        }else{
            echo "入力した名前が使用されています";
        }
    }
////////////////////////////////////////////////////////////////////////////////////
//プロフィール表示 0 ユーザーID
    public function profile($postData){
        $data = array();
        //$postData = "26";
        $pdo = new connectdb();
        $sql = "select user_id,user_name, user_mail from users WHERE user_id =".$postData;
        //echo $sql;
        $stmt=$pdo->dbo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $userNullCheck = is_null($result['user_mail']);
        $user_mail = $result['user_mail'];
        if($userNullCheck){
            $user_mail = "";
        }
        $data = array(
            "userId"=>$result['user_id'],
            "userName"=>$result['user_name'],
            "userMail"=>$user_mail
        );
        echo json_encode($data);
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
///////////////////////////////////////////////////////////////
//////アカウント削除　0:ID 1：対象名
    public  function delete($postData){
        $pdo = new connectdb();
        //$postData = array(6,"test10");
        $userId = $postData[0];
        $userName = $postData[1];
        $sql = "DELETE FROM users WHERE user_id = ".$postData[0];
        $stmt=$pdo->dbo->prepare($sql);
        $resultFlg = $stmt->execute();
        echo $sql;
        //フォルダが存在したら
        if(!($this->searchDirectory($userName))){
            if($resultFlg){
            $this->deleteDirectory($userName);
            }else{
                echo "対象のアカウントがありません";
            }
        }else{
           echo "対象のフォルダがありません";
        };
    }


}