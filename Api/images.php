<?php
require_once('connectdb.php');
header('Content-type: application/json');

class images{
    public function controller($postAction,$postData){
        if($postAction == "imageList"){
            $this->imageList($postData);
            exit;
        }else if($postAction == "imageInfo"){
             $this->imegeInfo($postData);
            exit;
        }
        else{
            echo "postActionにマッチングする関数がありません";
            exit;
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
                 $addSql .= " categoriesId = 1";
            }
            if($postData[1]['category2']['value'] == 'true'){
                if($addSql != ""){
                    $addSql .= " OR";
                }
                $addSql .= " categoriesId = 2";
            }
            if($postData[1]['category3']['value'] == 'true'){
                if($addSql != ""){
                    $addSql .= " OR";
                }
                $addSql .= " categoriesId = 3";
              }
              //ソート種類
            if($pieces[0] != ""){
                $addSortSql .= " ORDER BY $pieces[0] $pieces[1]";
            }
        }
        //sqlの発行
        $sql = "SELECT
                image.id,
                image.insert_at,
                image.title,
                image.category,
                user.userName,
                category.categoryName
                from
                users user,
                images image,
                categories category
                WHERE
                image.user_id = user.id
                AND
                image.category = category.categoriesId
                AND
                image.user_id  = user.id";
         //検索フィルタSQL作成
        $categorySql .= " AND
                          category.categoryName
                          IN
                          (select
                           categoryName
                           FROM
                           categories
                           WHERE "
                           .$addSql.
                           ")";
         //チェックボックスがすべて押されなかった場合
         if($addSql != ""){
             //検索フィルターSQLの結合
             $sql .= $categorySql;
         }
         //ソートSQLの結合
         $sql .= $addSortSql;
        // echo $sql . "\n";
        //SQL実行
         $result = $pdo->dbo->query($sql);

         while($val = $result->fetch(PDO::FETCH_ASSOC)){
              $imagesArray[] = array(
              'Id' => $val['id'],
              'Title' => $val['title'],
              'UserName' => $val['userName'],
              'categoryName' => $val['categoryName'],
              'Insert_at'=>$val['insert_at']
            );
         };
         echo json_encode($imagesArray);
    }


    //詳細情報の表示処理
    //ユーザー情報(全て)　画像情報(タイトル、画像ID、)　カテゴリー　コメント
    //送信されてくる値　1:画像ID 2:userID
    public function imegeInfo($postData){
        //送るとき配列
        $datas = array();
        //投稿者情報の配列
        $creatorData  = array();
        //コメント情報は配列
        $commentData = array();
        //DBへの接続関数
        $pdo = new connectdb();

         $imageId = 1; //$postData;
         $creatorId = 2; //$postData;
         //画像タイトル 画像ID　投稿者名　　検索条件　画像IDと投稿者ID
        $userSql = "SELECT
                    image.id,
                    image.title,
                    user.userName,
                    image.user_id
                    FROM
                    images image, users user
                    WHERE
                    image.user_id = user.id
                    AND
                    user.userName IN(SELECT userName FROM users WHERE id = " .$imageId.")
                    AND
                    image.id = " .$creatorId;
        //レビュー　コメント　ランク　予定：コメント者の追加   変数　検索条件　画像IDと投稿者ID
        $commentSql = "SELECT
                       comment.id,
                       comment.rank,
                       comment.comment,
                       comment.insert_at,
                       comment.comment_user_id,
                       user.userName
                       FROM
                       users user, comments comment,images image
                       WHERE
                       comment.image_id = image.id
                       AND
                       comment.comment_user_id = user.id
                       AND
                       image.id IN(SELECT id from images WHERE id = ".$imageId.")
                       AND
                       user.id IN(SELECT id from users WHERE id = " .$creatorId. ")";

     //    echo  $userSql ."\n";
       //  echo  $commentSql;
        $result= $pdo->dbo->query($userSql);
        while($val = $result->fetch(PDO::FETCH_ASSOC)){
            $creatorData[] = array(
                'imageId' => $val['id'],
                'imageTitle'=>$val['title'],
                'creatorName'=> $val['userName'],
                'creatorId' => $val['user_id']
            );
        }

        $result= $pdo->dbo->query($commentSql);
        //コメント配列
        while ($val = $result->fetch(PDO::FETCH_ASSOC)){
            $commentData[] = array(
               'commentId' => $val['id'],
               'rank' => $val['rank'],
               'comment' => $val['comment'],
               'insert_at'=> $val['insert_at'],
                'userId' => $val['comment_user_id'],
                'userName' => $val['userName']
            );
        }
        echo  json_encode($creatorData)."\n";
        echo  json_encode($commentData);
       // echo count($userData) ."\n";
       // echo count($commentData) ."\n";

        //連想配列に格納
        $datas[] = array(
            'usersData'=> $userData,
            'commentData'=>$commentData
        );

       echo json_encode($datas);
    }
}

