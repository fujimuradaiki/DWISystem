<?php
require_once('connectdb.php');
header('Content-type: application/json');

class images{
    public function controller($postAction,$postData){
        if($postAction == "imageList"){
            $this->imageList($postData);
            exit;
        }else{
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
//
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
         $result = $pdo->dbo->query($sql);

         while($val = $result->fetch(PDO::FETCH_ASSOC)){
              $imagesArray[] = array(
              'Id' => $val['id'],
              'Title' => $val['title'],
              'UserName' => $val['userName'],
              'categoryName' => $val['categoryName'],
              'Insert_at'=>$val['insert_at']
            );
            // echo $val['id']."\n".$val['title']."\n".$val['userName']."\n".$val['categoryName']."\n".$val['insert_at']."\n";
         };
         echo json_encode($imagesArray);
    }
}