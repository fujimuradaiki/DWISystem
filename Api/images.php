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
        $addSql = "";

        //sqlの発行
        $sql = "SELECT
                image.id,
                image.insert_at,
                image.title,
                user.userName,
                category.categoryName
                from
                users user,
                images image,
                categories category
                WHERE
                image.user_id = user.id
                AND
                image.category = category.id";
        //echo $sql;
         $result = $pdo->dbo->query($sql);

         while($val = $result->fetch(PDO::FETCH_ASSOC)){
              $imagesArray[] = array(
              'id' => $val['id'],
              'title' => $val['title'],
              'userName' => $val['userName'],
              'categoryName' => $val['categoryName'],
              'insert_at'=>$val['insert_at']
            );

            // echo $val['id']."\n".$val['title']."\n".$val['userName']."\n".$val['categoryName']."\n".$val['insert_at']."\n";
         };
         echo json_encode($imagesArray);
    }
}