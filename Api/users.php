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
  //  $postData = array('mp','a','aaaa@aaaa.aa.aa','data:image/png;base64,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');
    //$postData = array("'a'","a","'555@sss.ss'");
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
         // echo $sql;
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
            echo json_encode($postData);
         //echo  "false";
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
        //$postData = array(8,'a','i','a','aaaa@aaaa.aa.aa','data:image/png;base64,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');
       // $postData = array(8,'a','a','i','aaaa@aaaa.aa.aa');
        $updateUserId = $postData[0];
        $newName = $postData[1];
        $oldpass = $postData[2];
        $newPass = $postData[3];
        $newMail = $postData[4];
        if(isset($postData[5])){
        $icon = $postData[5];
        }
        //暗号化
        $oldpass = md5( $oldpass);
        $newPass = md5( $newPass);
        $sql = "select password from users WHERE user_id =".$updateUserId;
        $stmt=$pdo->dbo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
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
            if(isset($postData[5])){
            $this->icon($newName,$icon);
            }
            if($resultFlg == true){
                echo "編集が完了しました";
            }else{
                echo "編集に失敗しました";
            }
        }else{
            echo "passエラー"."\n".$oldpass."\n".$result['password']."\n";

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