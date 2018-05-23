<?php
$postData = array('userName');
if( isset( $_FILES["upload_file"] ) )
{
    foreach( $_FILES["upload_file"]["error"] as $key => $error ){
        $directoryPath = '../User/'.$postData[0].'/';
        $newName = $key.".png";

        $directoryPath .= $newName;
        if( $error == UPLOAD_ERR_OK ){
            if(move_uploaded_file($_FILES['upload_file']['tmp_name'][$key],$directoryPath)){
                //echo "\n".realpath($directoryPath);
                echo "アップロード成功";
               // var_dump($_FILES['upload_file']['tmp_name'][$key]);
                $directoryPath = "";
            }else{
                //echo "\n".realpath($directoryPath) ."\n";
                echo "失敗！";
                $directoryPath = "";
            }
        }
    }
}



//if(isset($_FILES) && isset($_FILES['upload_file']) &&is_uploaded_file($_FILES['upload_file']['tmp_name']) ){

    // var_dump($_FILES);
    // echo('<pre>');
    // var_dump($_FILES['upload_file']['name']);
    // echo('</pre>');
    // echo $a = pathinfo($_FILES["upload_file"]["name"]) . "\n";
    // echo $a['filename'];
    //echo $_FILES['upload_file']['name'];
    //任意の名前 (select COUNT(*) from images) 最大レコード数を表示　（最大レコード数＋１）
    //$newName = 'aaaaa.png';
    //相対パス (任意の名前に変更する)　userName = $postdata[userName]
    //$directoryPath = '../User/userName/'.$newName;
//任意フォルダへの移動
//     if(move_uploaded_file($_FILES['upload_file']['tmp_name'],$directoryPath)){

//         echo "\n".realpath($directoryPath);
//         echo "アップロード成功";
//     }else{
//         echo "\n".realpath($directoryPath) ."\n";
//         echo "失敗！";

//     }
// }else{
//     echo "fileErr";
 //}

?>

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>テスト</title>
</head>
<body>
	<form method="post" action="test.php" enctype="multipart/form-data">
		<input type="file" name="upload_file[]" /><br />
		<input type="file" name="upload_file[]" /><br />
		<input type="file" name="upload_file[]" />
		<div>
			<input type="submit" name="btn_submit" value="送信">
		</div>
	</form>
</body>
</html>