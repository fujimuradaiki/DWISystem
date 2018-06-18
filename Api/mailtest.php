<?php

 if(isset($_POST['data'])){
     $to = $_POST['data'];
    $subject = "デザイナー紹介 アカウント作成のご案内";
    $message = "
                新規登録URL
                http://192.168.63.130/DWISystem_test_imaizumi/View/HTML/Top.html
                上記のURLから新規登録をお願いします。
                ";
    $message = "PHP";
    $headers = "From: from@imaizumihome.com";

    if(mail($to, $subject, $message, $headers)){
        echo "メールを送信しました";
    }else{
        echo "メール送信に失敗しました";
    }
 }else{
     echo  "待機中";
 }


?>


<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>テスト</title>
</head>
<body>
	<form method="post" action="mailtest.php" enctype="multipart/form-data">
		<input type="text" name="mail" /><br />
		<div>
			<input type="submit" name="btn_submit" value="送信">
		</div>
	</form>
</body>
</html>