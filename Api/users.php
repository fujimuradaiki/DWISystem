<?php
require_once('connectdb.php');
header('Content-type: application/json');

class users{

    public function controller($postAction,$postData){
        if($postAction == "userList"){
             $this->userList();
            exit();
        }else if($postAction == "insertReview"){
            $this->insertReview($postData);
            exit();

        }else{
            echo "「users.php」関数がありません";
            exit();
        }

    }

    //ユーザーリスト
    public  function userList(){
        $pdo = new connectdb();
        $sql = "select id,userName from users";
        $data = array();
        $result = $pdo->dbo->query($sql);
        while ($val = $result->fetch(PDO::FETCH_ASSOC)){
            $data[] = array(
                "userId" => $val['id'],
                "userName" => $val['userName']
            );
        }
        echo json_encode($data);
    }

    //レビューの登録 0:画像ID　1:
    public function insertReview($postData){
        $pdo = new connectdb();
        $commentData = array();

        $imageId = $postData[0]; //$postData;
        $creatorId = $postData[1]; //$postData;  投稿者ID

        $insert_comment_user_id = $postData[2]; //コメントユーザーID
        $insert_comment_image_id = $imageId;//コメント対象 画像ID
        $insert_comment_rank = $postData[3];    //評価ポイント数
        $insert_comment = $postData[4];//コメント
        $insert_at=  date("Y/m/d H:i:s");//日時

        //DB追加SQL
        $sql = "INSERT
                INTO
                comments(
                comment_user_id,
                comment_image_id,
                comment_rank,
                comment,
                comment_insert_at
                )VALUES("
            .$insert_comment_user_id.","
            .$insert_comment_image_id.","
            .$insert_comment_rank.","
            ."'$insert_comment'".","
            ."'$insert_at'"
            .")";
            //コメント更新用SQL
            $commentSql = "SELECT
                       comment_id,
                       comment_rank,
                       comment,
                       comment_insert_at,
                       comment_user_id,
                       user_id,
                       user_name
                       FROM
                       users user, comments comment,images image
                       WHERE
                       comment_image_id = image_id
                       AND
                       comment_user_id = user_id
                       AND
                       image_id IN(SELECT image_id from images WHERE image_id = ".$imageId.")
                       AND
                       user_id IN(SELECT user_id from users WHERE user_id = " .$creatorId.
                       ")";
         $stmt=$pdo->dbo->prepare($sql);
         $resultFlg = $stmt->execute();
         if($resultFlg == true){
          //echo "コメントありがとう！";
           $result= $pdo->dbo->query($commentSql);
           while ($val = $result->fetch(PDO::FETCH_ASSOC)){
               $commentData[] = array(
                   'commentId' => $val['comment_id'],
                   'rank' => $val['comment_rank'],
                   'comment' => $val['comment'],
                   'commentInsertAt'=> $val['comment_insert_at'],
                   'userId' => $val['user_id'],
                   'userName' => $val['user_name']
               );
           }
        }else{
           echo "コメントが追加できなかったです・・・";
        }
        echo json_encode($commentData);
    }

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