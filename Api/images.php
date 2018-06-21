<?php
require_once('connectdb.php');
header('Content-type: application/json');
date_default_timezone_set('Asia/Tokyo');

class images{
    public function controller($postAction,$postData,$postFiles = null){

        switch ($postAction){
            case "imageList":
                $this->imageList($postData);
                break;
            case "imageInfo":
                $this->imageInfo($postData);
                break;
            case "insertReview":
                $this->insertReview($postData);
                break;
            case "insertImage":
                $this->insertImage($postData,$postFiles);
                break;
            case"delete":
                $this->delete($postData);
                break;
            case"update":
                $this->update($postData);
                break;
            case"creatorWorksList":
                $this->creatorWorksList($postData);
                break;
            case"mypageWorksList":
                $this->mypageWorksList($postData);
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
        //ファイルタイプ配列
        $fileType = array();
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
                    $addSortSql .= " ORDER BY COUNT(comment_id) $pieces[1] , image_insert_at ASC ";
                }
            }else{
                $addSortSql .= " ORDER BY image_id DESC limit 0,50 ";
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

         $exts = ['jpg', 'png','jpeg'];
         $resultExt='';
         while($val = $result->fetch(PDO::FETCH_ASSOC)){
            // 拡張子を判断する
             foreach( $exts as $ext) {
                 $filePath = '../User/'.$val['user_name'].'/'.$val['image_id'].'.'.$ext;
                  if(is_file($filePath)) {
                      $resultExt = $ext;
                      break;
                  }
             }


              $imagesArray[] = array(
              'Id' => $val['image_id'],
              'Title' => $val['image_title'],
              'UserName' => $val['user_name'],
              'userId'=>$val['user_id'],
              'categoryName' => $val['category_name'],
              'fileType'=>$val['image_id'].".".$resultExt
            );
         };

         echo json_encode($imagesArray);
    }


    //詳細情報の表示処理
    //ユーザー情報(全て)　画像情報(タイトル、画像ID、)　カテゴリー　コメント
    //送信されてくる値　1:画像ID 2:userID
    public function imageInfo($postData){
       // $postData = array(8,1);
        //送るとき配列
        $datas = array();
        //投稿者情報の配列
        $creatorData  = array();
        //コメント情報は配列
        $commentData = array();
        //拡張子
        $fileType = array();
        //DBへの接続関数
        $pdo = new connectdb();
        $imageId = $postData[0]; //$postData;
        $creatorId = $postData[1]; //$postData;
         //画像タイトル 画像ID　投稿者名　　検索条件　画像IDと投稿者ID
        $userSql = "SELECT
                    image_id,
                    image_title,
                    user_name,
                    user_id,
                    Introduction,
                    category_name,
                    image_summary
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
                       image_id =".$imageId."  ORDER BY comment_insert_at DESC";

        // echo  $userSql ."\n";
        // echo  $commentSql;
        $result= $pdo->dbo->query($userSql);
        $introductionStr = "";
        $imageSummaryStr ="";

        $exts = ['jpg', 'png','jpeg'];
        $$resultExt='';
        while($val = $result->fetch(PDO::FETCH_ASSOC)){

            if(!(is_null($val['Introduction']))){
                $introductionStr = $val['Introduction'];
            }
            if(!(is_null($val['imae']))){
                $imageSummaryStr =$val['image_summary'];
            }

            // 拡張子を判断する
            foreach( $exts as $ext) {
                $filePath = '../User/'.$val['user_name'].'/'.$val['image_id'].'.'.$ext;
                if(is_file($filePath)) {
                    $resultExt = $ext;
                    break;
                }
            }

            $creatorData[] = array(
                'imageId' => $val['image_id'],
                'imageTitle'=>$val['image_title'],
                'creatorName'=> $val['user_name'],
                'creatorId' => $val['user_id'],
                'categoryName'=>$val['category_name'],
                'Introduction'=>$introductionStr,
                'imageSummary'=>$imageSummaryStr,
                'fileType'=>$val['image_id'].'.'.$resultExt
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

        //DB追加SQL 追加
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
                       image_id =".$imageId."  ORDER BY comment_insert_at DESC";
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
            echo json_encode( "コメントが追加できなかったです。");
            exit();
        }
            echo json_encode($commentData);
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////
    //画像保存
    public function insertImage($postData,$postFiles){
        $pdo = new connectdb();

        $postArray = $postData;
        $endPostArray = array();
        $insert_at = date("Y/m/d H:i:s");
        $categoryArray = array();
        $titleArray = array();
        $trimmingArray = array();
        $trimmingType = array();
//         for($count = 0; $count<count($postData);$count++){
//              if(!(empty($postData[$count]))){
//                $postArray[] = $postData[$count];
//              }
//          }

         //送信画像数
         $images = 0;
         for($count = 0; $count<count($postFiles['name']);$count++){
             if($postFiles['name'][$count] != null){
                 $images++;
                 $trimmingType[] = str_replace('image/', '', $postFiles['type'][$count]);
             }
         }

         $categoryindex = 2;
         $titleindex= 5 ;
         $trimmingindex = 8;
         for($count = 0; $count < 3;$count++){
             $categoryArray[] = $postArray[$categoryindex];
             $titleArray[] =$postArray[$titleindex];
             if($postArray[$trimmingindex] != ""){
                 $trimmingArray[] = $postArray[$trimmingindex];
             }else{
                 $trimmingArray[] = "";
             }
             $categoryindex++;
             $titleindex++;
             $trimmingindex++;
         }
         // echo json_encode($trimmingType[0]);

// //         //ユーザー名（フォルダー検索用）ユーザーID カテゴリーID insert タイトル
         $userName = $postArray[0];
          //echo json_encode($userName);
         $imageUserId = $postArray[1];
//         $insert_at=  date("Y/m/d H:i:s");//日時
         $str = "insertError";
//         /////画像の最大IDに＋１する DBに登録するimages_idも決める
         $strdata = array();
       //  $strdata = "送信画像数".$images;

         //最後の要素に入ってるやつ
         $imageSummary = $postArray(count($postArray));
            //サムネ配列用
            $typeincdex = 0;
            //insertSQL文
            for($i = 0;$i<3;$i++){
                if($postFiles['name'][$i] != null){
              $insertSql = "insert
                      into
                      images(
                      image_user_id,
                      image_category_id,
                      image_insert_at,
                      image_title,
                      image_open,
                      image_summary
                      )VALUES("
                  .$imageUserId.","
                  .$categoryArray[$i].","
                  ."'$insert_at'".","
                  ."'$titleArray[$i]'".","
                  .true.","
                  .'?'
                 .")";

//                   //imageテーブルに画像情報を追加
                   $stmt=$pdo->dbo->prepare($insertSql);
                   //？に値を入れる　セキュリティ(プリペアードステートメント)
                   $resultFlg = $stmt->execute(array($imageSummary));
                   $id = $pdo->dbo->lastInsertId();
                   // $id=300 + $id;

                   if($trimmingArray[$i] != ""){
                      $this->moviImage($userName,$postFiles,$id,$i);
                      //サムネの保存
                      $this->samneMoviImage($userName,$trimmingArray[$i],$id,$trimmingType[$typeincdex]);
                      $typeincdex++;
                   }else if($postFiles['name'][$i] != null){
                      $this->moviImage($userName,$postFiles,$id,$i);
                   }
                   //$id++;
                   $resultFlg = true;
    // //             //追加できたか titleと文字列
                 if($resultFlg == true){
                     $str =$titleArray[$i]."アップロード成功";
                     $strdata[] =$str;
                 }else{
                     $str = $titleArray[$i]."新規追加に失敗";
                     $strdata[] = $str;

                 }
               }
            }
            echo json_encode($postArray);

    }
//////////////////////////////////////////////////////////////////////////////////
//画像保存処理
    public  function moviImage($userName,$imageData,$imageName,$imageindex){
        $directoryName = str_replace("'", "", $userName);
        $type = explode("/", $imageData['type'][$imageindex]);
        //拡張子の指定
        $fileName = '../User/'.$directoryName.'/'.$imageName.'.'.$type[1];
        move_uploaded_file($imageData['tmp_name'][$imageindex], $fileName);


    }

    public  function samneMoviImage($userName,$encode,$imageName,$postType){
        $directoryName = str_replace("'", "", $userName);
        $img = $encode;
        //$type = str_replace('data:image/', '', $encode);
        //$type = substr($type, 0, strpos($type,";"));
        //$img = str_replace('data:image/'.$type.';base64', '', $img);
        //$img = str_replace('data:image/'.$type.';base64,', '', $img)
        //$img = str_replace(' ', '+', $img);
        //echo json_encode($img);
        $fileData = base64_decode($img);
        //拡張子の指定
        $fileName = '../User/'.$directoryName.'/'.'samne_'.$imageName.'.'.$postType;

        //echo $fileName;
        file_put_contents($fileName, $fileData);
    }
////////////////////////////////////////////////////////////////////////////////////
//画像削除
    public function delete($postData){
        $pdo = new connectdb();
        $imageId = $postData[0];
        $userName = $postData[1];
        $userId = $postData[2];
        $imageName = $imageId.".png";
        $sql = "DELETE FROM images WHERE image_id = ".$imageId ." AND image_user_id =".$userId;
        $stmt=$pdo->dbo->prepare($sql);
        $resultFlg = $stmt->execute();
        if($resultFlg){
            if(unlink("../User/".$userName."/".$imageName)){
                    echo json_encode("画像を削除しました。");
                }else{
                    echo json_encode("削除対象がありません。");
                }
        }else{
           echo json_encode("DBに対象のレコードが存在しません。");
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////
//画像更新
    public function update($postData){
        $pdo = new connectdb();
        $imageId = $postData[0];
        $categoryId = $postData[1];
        $userId = $postData[2];
        $title = $postData[3];
        $userName = $postData[4];
        if(isset($postData[5])){
            $base64 = $postData[5];
        }


        $sql = "UPDATE images SET image_user_id = ".$userId.","."
               image_category_id =".$categoryId.','." image_title = "."'$title'"." WHERE image_id = ".$imageId;
        $stmt=$pdo->dbo->prepare($sql);
        $resultFlg = $stmt->execute();
        if($resultFlg){
            $target = array($imageId,$userName);
//             if(isset($postData[5])){
//             $this->delete($target);
//             $this->moviImage($userName,$base64,$imageId);
//             }
        }else{
            echo json_encode("変更に失敗しました。");
        }
        echo json_encode( "変更を保存しました。");
    }
//////////////////////////////////////////////////////////////////////////////////////////////////
//ユーザーの作品 引数userId 　戻り値 連想配列　imageId, imageTitle, categoryName
    public  function creatorWorksList($postData){
        $pdo = new connectdb();
        $user_id = $postData;
        $imagesArray = array();
        $sql = "SELECT
                image_id, image_title, category_name
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
                image_user_id = " .$user_id;
        //echo $sql;
        $result = $pdo->dbo->query($sql);
        while($val = $result->fetch(PDO::FETCH_ASSOC)){
            $imagesArray[] = array(
                'imageId' => $val['image_id'],
                'imageTitle' => $val['image_title'],
                'categoryName' => $val['category_name']
                );
        };
        echo json_encode($imagesArray);

    }

    public function mypageWorksList($postData){
        //格納配列
        $imagesArray = array();
        //DBへの接続関数
        $pdo = new connectdb();
        //追加のsql文作成
        $addSql ="";
        $addSortSql = "";
        $user_id = $postData[1];

        if($postData != ""){
            //文字列 分割 (配列)　ソート 0:対象 1:ソート種類
            $pieces = explode(":", $postData[0][0]['value']);

            //カテゴリーの検索フィルタ
            //  echo $postData[1]['category1']['value'];
            if($postData[0][1]['category1']['value'] == 'true'){
                $addSql .= "( category_id = 1";
            }
            if($postData[0][1]['category2']['value'] == 'true'){
                if($addSql != ""){
                    $addSql .= " OR";
                }else{
                    $addSql .= "(";
                }
                $addSql .= " category_id = 2";
            }
            if($postData[0][1]['category3']['value'] == 'true'){
                if($addSql != ""){
                    $addSql .= " OR";
                }else{
                    $addSql .= "(";
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
                categories AS categories
                ON
                image_category_id = category_id
                WHERE
                image_user_id = " .$user_id;
        //検索フィルタSQL作成

        //チェックボックスがすべて押されなかった場合
        if($addSql != ""){
            $sql .= " AND ".$addSql.")";
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
}

