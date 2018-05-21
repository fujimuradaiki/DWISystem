<?php
var_dump($_FILES);

var_dump($_FILES["tmp_name"]);

?>

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>テスト</title>
</head>
<body>
	<form method="post" action="" enctype="multipart/form-data">
		<input type="file" name="upload_file">
		<div>
			<input type="submit" name="btn_submit" value="送信">
		</div>
	</form>
</body>
</html>