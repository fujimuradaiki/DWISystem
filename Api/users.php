<?php
require_once('connectdb.php');
header('Content-type: application/json');

class users{

    public function controller($postAction,$postData,$postFiles = null){

        switch ($postAction){
            case "userList":
                $this->userList($postData);
                break;
            case "userInfo":
                $this->userInfo($postData);
                break;
            case "insert":
                $this->insert($postData,$postFiles);
                break;
            case "login":
                $this->login($postData);
                break;
            case "update":
                $this->update($postData,$postFiles);
                break;
            case "profile":
                $this->profile($postData);
                break;
            case "delete":
                $this->delete($postData);
                break;
            case"mail":
                $this->mail($postData);
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
    //    $sql = "select user_id,user_name from users";
        $sql = "select user_id,user_name FROM images AS images
                LEFT JOIN users AS users ON user_id = image_user_id
                ";
        $data = array();
        if($postData !="" ){
            $sql .= " WHERE user_name LIKE "."'%$postData%'";
        }
        $sql .=" GROUP BY image_user_id";
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
        $record = 12;
        $min = $max - 12;
        $likeSq = "";

        $limitSql =  " LIMIT ".$min.",".$record;
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
        $countSql= "select COUNT(*) from images WHERE image_user_id = ".$user_id;
        $sql .= $likeSq.$limitSql;
       // echo $sql;
        $result = $pdo->dbo->query($sql);
        $totalCount = $pdo->dbo->query($countSql);
        $countVal = $totalCount->fetch(PDO::FETCH_ASSOC);
        $v = $result->fetch(PDO::FETCH_ASSOC);
        $userData[] = array(
            "userId"=>$v['user_id'],
            "userName"=>$v['user_name'],
            "imageTotalCount"=>$countVal["COUNT(*)"]
        );
        //最初のデータを入れる
        $imageData[] = array(
            "imageId"=>$v['image_id'],
            "imageTitle"=>$v['image_title'],

        );
        //残りのデータを入れる
        while($val = $result->fetch(PDO::FETCH_ASSOC)){
            $imageData[] = array(
                "imageId"=>$val['image_id'],
                "imageTitle"=>$val['image_title']
            );
        };

        $datas[] = array(
            'userData'=> $userData,
            'imageData'=>$imageData
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
    public  function insert($postData,$postFiles){

    $pdo = new connectdb();
    $insert_at=  date("Y/m/d H:i:s");//日時
  //  $postData = array("t","t","555@sss.ss");
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
            ."'$postData[0]'".","
            ."'$pass'".","
            ."'$insert_at'".","
            ."'$postData[2]'"
            .")";
//           //echo $sql;
//         //新規登録名でフォルダ名を検索
        if($this->searchDirectory($postData[0])){
            //SQL実行
            $stmt=$pdo->dbo->prepare($sql);
            $resultFlg = $stmt->execute();
            //$resultFlg = true;
            if($resultFlg == true){
                $this->createDirectory($postData[0]);
              //  echo json_encode($postFiles['name']);
                if($postFiles['name'] == null){
                    //echo json_encode("default");
                    $this->defaultIcon($postData[0]);
                }else{
                    //echo json_encode("original");
                    $this->icon($postData[0],$postFiles);

                }
                echo json_encode($postData[0]);
             }
             echo "true";
        }else{
          //  echo json_encode($postData);
            echo "false";
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
           return true;
        }else{
            return false;
        }
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
        $daleteFlg =  system("rm -rf {$directoryPath}");
        //$daleteFlg = true;
        if($daleteFlg){
            return true;
        }
           return false;
    }

    //アイコン画像移動と保存
    public  function  icon($userName,$imageData){
        $directoryName = str_replace("'", "", $userName);
        $type = explode("/", $imageData['type']);
        //拡張子の指定
        $fileName = '../User/'.$directoryName.'/'."icon".'.'.$type[1];
        move_uploaded_file($imageData['tmp_name'], $fileName);

    }

    //アイコン画像移動(base64)をデコードして画像保存
    public  function defaultIcon($userName){
        $icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT8AAAE/CAIAAAC/xFP8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFHGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA1LTI4VDEyOjMwOjE3KzA5OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wNS0yOFQxMjozMTozNiswOTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wNS0yOFQxMjozMTozNiswOTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmMDkyZjFmNS05OTc5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";
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
    public  function update($postData,$postFiles){
        $pdo = new connectdb();
        $update_at =  date("Y/m/d H:i:s");//日時
        //$postData = array(12,'v','w','w','aaaa@aaaa.aa.aa');
        $directoryPath = '../User/';
        $updateUserId = $postData[0];
        $olderName = $postData[6];
        $newName = $postData[1];
        $pass    = $postData[2];
        $newPass = $postData[3];
        $newMail = $postData[4];
        $data = array();
        $updateSpl = "";
        //画像
        if(isset($postData[5])){
            $icon = $postData[5];
        }
        //暗号化
        $pass = md5($pass);
        $newPass = md5($newPass);
        $sql = "select * from users WHERE user_id =".$updateUserId;
        $usersql = "select COUNT(*) from users WHERE user_name LIKE "."'%$newName%'";
        $userList = "select + from users";
        $stmt=$pdo->dbo->prepare($sql);
        $userStmt=$pdo->dbo->prepare($usersql);
        $userListStmt=$pdo->dbo->prepare($userList);

        $stmt->execute();
        $userStmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $userResult = $userStmt->fetch(PDO::FETCH_ASSOC);
        $userListResult = $userListStmt->fetch(PDO::FETCH_ASSOC);
        $updateFlg = false;
        $errorStr = "";
        //DBに同じ名前があっても登録できる
       // echo json_encode($userResult['COUNT(*)']);
        if($pass == $result['password'] ){
            if($olderName == $result['user_name']){
                $updateFlg = true;
                if($result['user_name'] != $newName && $userResult['COUNT(*)'] == 0){
                    $updateSpl .= "user_name ="."'$newName'";
                }else if($result['user_name'] == $newName){

                }else{
                    $errorStr .= "新しい名前は使われています。\n名前を登録できませんでした";
                }
                if($result['password'] != $newPass){
                    $updateFlg = true;
                    if($updateSpl != ""){
                        $updateSpl.=  ",";
                    }
                    $updateSpl .= "password  = "."'$newPass'";
                }
                if($result['user_mail'] != $newMail){
                    $updateFlg = true;
                    if($updateSpl != ""){
                        $updateSpl.=  ",";
                    }
                    $updateSpl .= "user_mail = "."'$newMail'";
                }

                if($updateSpl != ""){
                    $updateSpl.= ",";
                }
                $updateSpl.= "user_update_at = "."'$update_at'";
                $updateSpl .= " WHERE user_id = ".$updateUserId;
                $sql = "UPDATE users SET ".$updateSpl;
                //$updateFlg = true;
                //update実行
                if($updateFlg){
                     $stmt=$pdo->dbo->prepare($sql);
                     $resultFlg = $stmt->execute();
                     rename($directoryPath.$result['user_name'], $directoryPath.$newName );
                   // echo json_encode($directoryPath.$userResult['user_name']. $directoryPath.$newName );
                   // exit();
                    if(isset($postData[5])){
                        unlink("../User/".$newName."/icon.png");
                        $this->icon($newName,$postFiles);
                    }
                    if($resultFlg == true){
                        echo json_encode("true".$errorStr);
                       exit();
                    }else{
                        echo json_encode($sql);
                        exit();
                        // echo json_encode( "編集に失敗しました");
                    }
                }else{
                    echo json_encode( "passエラー"."\n".$oldpass."\n".$result['password']."\n");
                }
            }else{
                echo json_encode( "入力した名前が間違っています");
            }
        }else{
            echo json_encode("パスワードが違います");
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
        $userdata = array();
        if($postData[0] != "" && $postData[1] != ""){
            $userPass = $postData[1];
            $pass = md5( $userPass );

            if(!(strpos($postData[0],'@'))){
                $userName = $postData[0];
                $sql .= "user_name ="."'$userName'";

            }else{
                $mail =$postData[0];
                $sql .= "user_mail =  " . "'$mail'";
            }
        }else{
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
                echo json_encode("error");
                exit();
            }
            echo json_encode($userdata);
    }
///////////////////////////////////////////////////////////////
//////アカウント削除　0:ID 1：対象名
    public  function delete($postData){
        $pdo = new connectdb();
        $userId = $postData[0];
        $userName = $postData[1];
        $pass = md5( $postData[2] );
        $passSql = "SELECT password FROM users WHERE user_id = ".$userId;
        $stmt=$pdo->dbo->prepare($passSql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $sql = "DELETE
                users,images,comments
                FROM
                images AS images
                LEFT JOIN users AS users
                ON
                image_user_id = user_id
                LEFT JOIN comments AS comments
                ON
                comment_image_id = image_id
                WHERE
                image_user_id = ".$postData[0];
        $userDeteleSql = "DELETE FROM users WHERE user_id = ".$postData[0];
        //パスワードあってるか？
         if($result['password'] == $pass){
             $stmt=$pdo->dbo->prepare($sql);
             $userstmt=$pdo->dbo->prepare($userDeteleSql);
             $resultFlg = $stmt->execute();
             $userResultFlg = $userstmt->execute();
             //フォルダが存在したら
            if(!($this->searchDirectory($userName))){
                if($resultFlg && $userResultFlg){
                    if($this->deleteDirectory($userName)){
                        echo json_encode("false");
                        exit();
                    }else{
                        echo json_encode("true");
                        exit();
                    }
                }else{
                    echo json_encode("対象のアカウントがありません");
                }
            }else{
               echo json_encode("対象のフォルダがありません");
            };
        }else{
            echo json_encode("パスワードが間違っています");
         }
    }
/////////////////////////////////////////////////////////////////////////////
    public function mail($postData){
        $result = "";
        if($postData != ""){
            $to = $postData;
            $subject = "デザイナー紹介 アカウント作成のご案内";
            $message = "
                新規登録URL
                http://192.168.63.130/DWISystem_test_imaizumi/View/HTML/Top.html
                上記のURLから新規登録をお願いします。
                ";
            $message = "PHP";
            $headers = "From: from@imaizumihome.com";

            if(mail($to, $subject, $message, $headers)){
                $result = "メールを送信しました";
            }else{
                $result = "メール送信に失敗しました";
            }
        }else{
            $result = "メールアドレスが入力されていません。";
        }
        echo json_encode($result);
    }
}