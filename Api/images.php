<?php
require_once('connectdb.php');
header('Content-type: application/json');

class images{
    public function controller($postAction,$postData){

        switch ($postAction){
            case "imageList":
                $this->imageList($postData);
                break;
            case "imageInfo":
                $this->imegeInfo($postData);
                break;
            case "insertReview":
                $this->insertReview($postData);
                break;
            case "insertImage":
                $this->insertImage($postData);
                break;
            default:
                echo "images.php ユーザー定義関数に該当しませんでした";
                break;
        }
    }

    //一覧画面の表示処理
    public function imageList($postData){
        //格納配列
        $imagesArray = array();
        //DBへの接続関数
        $pdo = new connectdb();
        //追加のsql文作成
        $addSql ="";
        $addSortSql = "";

        if($postData != ""){
            //文字列 分割 (配列)　ソート 0:対象 1:ソート種類
         $pieces = explode(":", $postData[0]['value']);

            //カテゴリーの検索フィルタ
          //  echo $postData[1]['category1']['value'];
            if($postData[1]['category1']['value'] == 'true'){
                 $addSql .= " category_id = 1";
            }
            if($postData[1]['category2']['value'] == 'true'){
                if($addSql != ""){
                    $addSql .= " OR";
                }
                $addSql .= " category_id = 2";
            }
            if($postData[1]['category3']['value'] == 'true'){
                if($addSql != ""){
                    $addSql .= " OR";
                }
                $addSql .= " category_id = 3";
              }
              //ソート種類
            if($pieces[0] != ""){
                if($pieces[0] != "rank"){
                    $addSortSql .= " ORDER BY image_$pieces[0] $pieces[1]";
                }else{
                    $addSortSql .= " ORDER BY COUNT(*) $pieces[1] , image_insert_at ASC";
                }
            }
        }
        //sqlの発行
        $sql = "SELECT
                image_id,
                image_title,
                category_name,
                user_name,
                user_id
                FROM
                images AS images
                LEFT JOIN
                users AS users
                ON
                image_user_id = user_id
                LEFT JOIN
                comments AS comments
                ON
                image_id = comment_image_id
                LEFT JOIN
                categories AS categories
                ON
                image_category_id = category_id ";
         //検索フィルタSQL作成
        $categorySql .= " WHERE ".$addSql;
         //チェックボックスがすべて押されなかった場合
         if($addSql != ""){
             //検索フィルターSQLの結合
             $sql .= $categorySql;
         }
         //ソートSQLの結合
         $sql .= " GROUP BY  image_id ". $addSortSql;
       //  echo $sql . "\n";
        //SQL実行
         $result = $pdo->dbo->query($sql);

         while($val = $result->fetch(PDO::FETCH_ASSOC)){
              $imagesArray[] = array(
              'Id' => $val['image_id'],
              'Title' => $val['image_title'],
              'UserName' => $val['user_name'],
              'userId'=>$val['user_id'],
              'categoryName' => $val['category_name']
            );
         };
         echo json_encode($imagesArray);
    }


    //詳細情報の表示処理
    //ユーザー情報(全て)　画像情報(タイトル、画像ID、)　カテゴリー　コメント
    //送信されてくる値　1:画像ID 2:userID
    public function imegeInfo($postData){
       // $postData = array(8,1);
        //送るとき配列
        $datas = array();
        //投稿者情報の配列
        $creatorData  = array();
        //コメント情報は配列
        $commentData = array();
        //DBへの接続関数
        $pdo = new connectdb();
        $imageId = $postData[0]; //$postData;
        $creatorId = $postData[1]; //$postData;
         //画像タイトル 画像ID　投稿者名　　検索条件　画像IDと投稿者ID
        $userSql = "SELECT
                    image_id,
                    image_title,
                    user_name,
                    user_id
                    FROM
                    images AS images
                    LEFT JOIN
                    users AS users
                    ON
                    image_user_id = user_id
                    LEFT JOIN
                    categories AS categories
                    ON
                    image_category_id = category_id
                    WHERE
                    image_id = " .$imageId
                    ." AND user_id = " .$creatorId;
        //レビュー　コメント　ランク　予定：コメント者の追加   変数　検索条件　画像IDと投稿者ID
                    $commentSql = "SELECT
                       comment_id,
                       comment_rank,
                       comment,
                       comment_insert_at,
                       user_id,
                       user_name
                       FROM
                       comments AS comments
                       LEFT JOIN
                       users AS users
                       ON
                       comment_user_id = user_id
                       LEFT JOIN
                       images AS images
                       ON
                       comment_image_id = image_id
                       WHERE
                       image_id =".$imageId."  ORDER BY comment_insert_at ASC";

        // echo  $userSql ."\n";
        // echo  $commentSql;
        $result= $pdo->dbo->query($userSql);
        while($val = $result->fetch(PDO::FETCH_ASSOC)){
            $creatorData[] = array(
                'imageId' => $val['image_id'],
                'imageTitle'=>$val['image_title'],
                'creatorName'=> $val['user_name'],
                'creatorId' => $val['user_id']
            );
        }

       $result= $pdo->dbo->query($commentSql);
        //コメント配列
        while ($val = $result->fetch(PDO::FETCH_ASSOC)){
            $userId =$val['user_id'];
            $userName= $val['user_name'];
            $userNullCheck = is_null($userId);
            $userNameNullCheck = is_null($userName);

            if($userNullCheck){
                $userId = 0;
            }
            if($userNameNullCheck){
                $userName = "";
            }


            $commentData[] = array(
               'commentId' => $val['comment_id'],
               'rank' => $val['comment_rank'],
               'comment' => $val['comment'],
               'commentInsertAt'=> $val['comment_insert_at'],
                'userId' => $userId,
                'userName' => $userName
            );
        }
       // echo  json_encode($creatorData)."\n";
       // echo  json_encode($commentData);
       // echo count($userData) ."\n";
       // echo count($commentData) ."\n";

        //連想配列に格納
        $datas[] = array(
            'usersData'=> $creatorData,
            'commentData'=>$commentData
        );

       echo json_encode($datas);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
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
                       user_id,
                       user_name
                       FROM
                       comments AS comments
                       LEFT JOIN
                       users AS users
                       ON
                       comment_user_id = user_id
                       LEFT JOIN
                       images AS images
                       ON
                       comment_image_id = image_id
                       WHERE
                       image_id =".$imageId."  ORDER BY comment_insert_at ASC";
        $stmt=$pdo->dbo->prepare($sql);
        $resultFlg = $stmt->execute();
        if($resultFlg == true){
            //echo "コメントありがとう！";
            $result= $pdo->dbo->query($commentSql);
            while ($val = $result->fetch(PDO::FETCH_ASSOC)){
                $userId =$val['user_id'];
                $userName= $val['user_name'];
                $userNullCheck = is_null($userId);
                $userNameNullCheck = is_null($userName);

                if($userNullCheck){
                    $userId = 0;
                }
                if($userNameNullCheck){
                    $userName = "";
                }




                $commentData[] = array(
                    'commentId' => $val['comment_id'],
                    'rank' => $val['comment_rank'],
                    'comment' => $val['comment'],
                    'commentInsertAt'=> $val['comment_insert_at'],
                    'userId' => $userId,
                    'userName' =>$userName
                     );
                }
        }else{
            echo "コメントが追加できなかったです・・・";
        }
            echo json_encode($commentData);
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////
    public function insertImage($postData){


    }



}

